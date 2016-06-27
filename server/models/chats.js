var mongoose = require('mongoose');

var Chat = mongoose.model('chats', mongoose.Schema({
	account_id : String,
	participants : [{

	}],
	conversation : [ {
		author : String,
		content : String
	}],
	createdAt : { type : Date, default : Date.now },
  }));

 module.exports = Chat;
