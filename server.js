const Pusher = require('pusher-client');
const config = require('./app-config.json');
const JenkinsSubscriber = require('./subscriber/Jenkins');

console.log('establishing connection');
const socket = new Pusher(config.pusher.appKey);

const jenkinsSubscriber = new JenkinsSubscriber(socket);
jenkinsSubscriber.subscribe();