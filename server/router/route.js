var express = require('express');
var Account = require('../models/account');
var Chat = require('../models/chats');
var jwt = require('jsonwebtoken');
var config = require('config');
var router = express.Router();
var app = express();
// var AccountCommand = require('../commands/AccountCommands');

app.set('superSecret', config.token.secret);

router.get('/users', function(req,res){
    Account.find(function(err,accounts){
      if (err) {
        res.json({ sucess : false, message : err})
      } else if (accounts.length <= 0) {
        res.json({ success : false, message : 'No Users'})
      } else {
        res.json(accounts);
      }
    })
    // AccountCommand.getAccounts(res);
});

router.get('/users/:id', function(req,res){
  Account.find( { _id : req.params.id }, function(err, user){
    if (err) {
      res.json({ success : false, message : 'Error Searching User' })
    } else if(user.length <= 0) {
      res.json({ success : false , message : 'No User Found'});
    } else {
      res.json(user);
    }
  })

});

router.post('/users', function(req,res){
  Account.find({ username : req.body.username }, function(err,account){
    if (err) {
      res.json({ success : false, message : err })
    } else if (account.length <= 0) {
      var user = new Account({
          username : req.body.username,
          password : req.body.password,
          profile :  { 
            name : req.body.name,
            age : req.body.age,
            gender : req.body.gender,
            cp_number : req.body.cp_number
          }
      });
      user.save(function(err,account){
        if (err) {
          res.json({ success : false, message : err});
        } else {
          res.json(account);
          }
        })
    } else {
        res.json({ success : false, message : 'Username is already exist' });
        }
    });
});

router.delete('/users/:name', function(req, res){
  Account.findOneAndRemove( { name : req.params.name }, function(err){
    if (err) {
      res.json({ success : false, message : 'Error Deleting User' })
    } else {
      res.json({ sucess : true, message : 'success'});
    }
  })
});

router.post('/auth', function(req,res){
  Account.find({ username : req.body.username }, function(err, account){
    if (err) {
      res.json({ success : false, message : 'Opps!. Something Went Wrong.' });
    } else if (account.length <= 0){
      res.json({ success : false, message : 'Authentication Failed. User Not Found.'});
    } else if (account[0].password != req.body.password) {
    	console.log(account);
			res.json({ success : false, message : 'Authentication Failed. Wrong Password.' });
    } else {
			var token = jwt.sign(account[0], app.get('superSecret'),{
				expiresIn : 240
			});

			res.json ({
				success : true,
				message : 'Authentication Success.',
        account : account[0],
				token : token
			});
	  }
	});
});

router.get('/messages/:id', function(req,res){
  Chat.find({ account_id : req.params.id },function(err, chat){
    if (err) {
      res.json({ success : false, message : 'Opps!. Something went wrong'});
    } else if (chat.length <= 0){
      res.json({ success : false, message : 'No Messages' });
    } else {
      res.json(chat);
    }
  });
});

router.post('/messages', function(req,res){
    Chat.find({ recipient_name : req.body.name }, function(err, resp){
      console.log(resp)
      if (err) {
        res.json({ success : false, message : 'Opps!. Something went wrong'});
      } else  if (resp.length <= 0) {
        var addChat = new Chat({
          account_id : req.body.account_id,
          recipient_name : req.body.name,
          recipient_number : req.body.cp_number,
          conversation : [{
            author : req.body.author,
            content : req.body.content
          }]
        });
        addChat.save(function(err, resp) {
          // body...
          if (err) {
            res.json({ success : false, message : 'Opps!. Something went wrong'});
          } else
            res.json(resp);  
        })
      } else { 
        // do update message
        Chat.update({ _id : resp._id}, { $push : {
          "conversation" : {
            author : req.body.author,
            
          }
        }}); 
      }
    });
  });

module.exports = router;
