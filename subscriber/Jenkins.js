class JenkinsSubscriber {
  constructor(socket) {
    this.socket = socket;
    this.channel = undefined;
  }

  subscribe() {
    console.log('JenkinsChannel subscribing...');
    this.channel = this.socket.subscribe('churro');
    this.channel.bind('status', this.onStatusChange);
  }

  onStatusChange(data) {
    console.log("new status!");
    console.dir(data);
  }
}

module.exports = JenkinsSubscriber;