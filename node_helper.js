'use strict';
const NodeHelper = require('node_helper');

const PythonShell = require('python-shell');
var pythonStarted = false

module.exports = NodeHelper.create({
  
  python_start: function () {
    const self = this;
    const pyshell = new PythonShell('modules/' + this.name + '/server.py', { mode: 'json'});

    pyshell.on('message', function (message) {
      
      if (message.hasOwnProperty('status')){
      console.log("[" + self.name + "] " + message.status);
      }
      if (message.hasOwnProperty('login')){
	console.log(message);
	var user = message.login.user > 0 ? message.login.user : 0;
	console.log("[" + self.name + "] " + "User " + self.config.users[user] + " with confidence " + message.login.confidence + " logged in.");
	self.sendSocketNotification('user', {action: "login", user: user, confidence: message.login.confidence});
      }	
      if (message.hasOwnProperty('logout')){
	var user = message.logout.user > 0 ? message.logout.user : 0;
        console.log("[" + self.name + "] " + "User " + self.config.users[user] + " logged out.");
        self.sendSocketNotification('user', {action: "logout", user: user});
        }
    });

    pyshell.end(function (err) {
      if (err) throw err;
      console.log("[" + self.name + "] " + 'finished running...');
    });
  },
  
  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if(notification === 'CONFIG') {
      this.config = payload
      if(!pythonStarted) {
        pythonStarted = true;
        this.python_start();
        };
    };
  }
  
});
