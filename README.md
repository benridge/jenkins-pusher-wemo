# jenkins-pusher-wemo
Node.js app that accepts pusher notifications about Jenkins build status and updates wemo outlet accordingly.

## Workflow ##
Jenkins -> Zapier -> Pusher -> here

## ToDo ##
* handler/Wemo.js
  * Figure out why discovery only happens once, ever! So weird. What if I unplug then plug back in?
  * Bug in discovery, doesn't stop after max connection attempts. Write test for this.
  * Code cleanup
    * Can I move methods out of class to make them private?
  * Behavioral tests
  * command line ability to force outlet on/off
  * save off device to app-config once found.
  * don't commit device info to github (put in separate file, gitignore it).
* Try to do it:
  * without classes
  * wrap callbacks in asyncs
* Bonus points
  * Replace Zapier with separate server that accepts jenkins notification and triggers pusher message.
  

## Setup
### Jenkins
* install [Job Notifications plugin](https://plugins.jenkins.io/notification)

### Zapier
* Create Zapier account if you don't already have one
* Follow instructions to setup [Zapier zapbook](https://zapier.com/zapbook/jenkins/pusher/)

### Pusher
* Create [Pusher](https://pusher.com/) account if you don't already have one

### Jenkins-pusher-wemo
* Edit config file 
* TODO: more details

