var mongoose = require('mongoose');

 var Account = mongoose.model('accounts', mongoose.Schema({
   username : String,
   password : String,
   profile : {
   	name : String,
   	age : Number,
   	gender : String,
   	cp_number : Number
   },
   createdAt : { type: Date, default: Date.now }
 }));

  module.exports = Account;
