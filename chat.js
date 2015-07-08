ChatMessages = new Mongo.Collection('chatMessages');
if (Meteor.isClient) {

  Template.body.helpers({
    chatMessages: function() {
      return ChatMessages.find({}, {
        sort: {
          CreatedAt: -1
        }
      });
    }
  });
  Template.body.events({
    'submit .new-chatMessage': function(event) {
      var message = event.target.Message.value;
      if (message.length > 0) {
        var currentTime;
        //Get time from server
        Meteor.call("getServerTime", function(error, result) {
          this.currentTime = result;
          ChatMessages.insert({
            Author: Meteor.user().username,
            Message: message,
            CreatedAt: this.currentTime
          })
          event.target.Message.value = "";
        });
      }
      return false; //Prevent refresh!
    }
  })

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    getServerTime: function() {
      var _time = (new Date);
      console.log(_time);
      return _time;
    }
  });
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
