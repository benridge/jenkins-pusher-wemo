const Wemo = require('wemo-client');
const config = require('../app-config.json');
const wemoConfig = config.wemo;
const maxConnectionAttempts = 50;
const secondsBetweenAttempts = 1;

class WemoHandler {
  constructor() {
    this.wemo = new Wemo();
    this.connectionAttempts = 0;
    if (wemoConfig.outlet) {
      this.wemo.load(wemoConfig.outlet.url, this.onConnect.bind(this));
    } else {
      this.discoverInterval = setInterval(this.discoverWemo, secondsBetweenAttempts*1000, wemo);
    }
    
  }

  stopTryingToConnect() {
    if (this.discoverInterval) {
      clearInterval(this.discoverInterval);
    }
  }

  discoverWemo(wemo) {
    console.log("discover Wemo attempt ", this.connectionAttempts);
    if (this.connectionAttempts++ > maxConnectionAttempts) {
      console.error("Max Wemo attempts reached.");
      clearInterval(this.discoverInterval);
    }
    this.wemo.discover(this.onConnect.bind(this));
  }

  onConnect(deviceInfo) {
    console.log('Wemo Device Found: %j', deviceInfo);

    this.stopTryingToConnect();

    this.client = this.wemo.client(deviceInfo);

    this.client.on('error', (err) => {
      console.log('Error: %s', err.code);
    });

    // Handle BinaryState events
    this.client.on('binaryState', (value) => {
      console.log('Binary State changed to: %s', value);
    });
  }

  toggle() {
    this.client.getBinaryState((error, state) => {
      console.log('Binary state toggling from: ', state);
      this.client.setBinaryState(state === "0" ? "1": "0");
    });
  }
}

module.exports = WemoHandler;
