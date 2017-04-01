class JenkinsSubscriber {
  constructor(options) {
    options = options || {};
    this.socket = options.socket;
    this.onStatusChangeHandler = options.onStatusChange || function(){};
    this.channel = undefined;
  }

  subscribe() {
    console.log('JenkinsChannel subscribing...');
    this.channel = this.socket.subscribe('churro');
    this.channel.bind('status', this.onStatusChange.bind(this));
  }

  onStatusChange(data) {
    console.log("new status!");
    console.dir(data);
    this.onStatusChangeHandler(data);
  }
}

module.exports = JenkinsSubscriber;