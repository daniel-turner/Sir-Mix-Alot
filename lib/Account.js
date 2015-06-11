module.exports = Account;

var Model = require('./Model.js');
var User = require('./User.js');

function Account() {

  var AccountSchema = {

    user: User,
    accountNumber: Number,
    address: String,
    balance: Number
  };

  Model.call(this,AccountSchema);

  Model.extend(Account);

};