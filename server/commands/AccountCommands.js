var Account = require('../models/account');

var AccountCommand = {
	getAccounts : function (res) {
		return Account.find(function(err, accounts){
			if (err) {
        res.json({ sucess : false, message : err})
      } else if (accounts.length <= 0) {
        res.json({ success : false, message : 'No Users'})
      } else {
        res.json(accounts);
      }
		});
	}
}

module.exports = AccountCommand;

