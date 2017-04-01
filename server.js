const Pusher = require('pusher-client');
const config = require('./app-config.json');
const JenkinsSubscriber = require('./subscriber/Jenkins');
const WemoHandler = require('./handler/Wemo');

console.log('establishing connection');
const socket = new Pusher(config.pusher.appKey);

const wemoHandler = new WemoHandler();

const onJenkinsChange = (data) => {
  wemoHandler.toggle();
}

const jenkinsSubscriber = new JenkinsSubscriber({
  socket: socket, 
  onStatusChange: onJenkinsChange
});
jenkinsSubscriber.subscribe();


