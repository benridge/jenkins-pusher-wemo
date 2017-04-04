const Pusher = require('pusher-client');
const config = require('./app-config.json');
const JenkinsSubscriber = require('./subscriber/Jenkins');
const WemoHandler = require('./handler/Wemo');

const leaveOnTime = 30000; //ms

console.log('establishing connection');
const socket = new Pusher(config.pusher.appKey);

const wemoHandler = new WemoHandler();

const onJenkinsChange = (data) => {
  wemoHandler.turnOn();
  setTimeout(wemoHandler.turnOff.bind(wemoHandler), leaveOnTime);
}

const jenkinsSubscriber = new JenkinsSubscriber({
  socket: socket, 
  onStatusChange: onJenkinsChange
});
jenkinsSubscriber.subscribe();


