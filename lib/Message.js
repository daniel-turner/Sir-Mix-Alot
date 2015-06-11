module.exports = Message;

var Model = require('./Model.js');
var User = require('./User.js');

function Message() {

  var MessageSchema = {

    from: User,
    to: User,
    message: String,
    sent: Date
  };

  Model.call(this,MessageSchema);

  Model.extend(Message);

};