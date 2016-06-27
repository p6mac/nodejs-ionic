angular.module('starter.services', [])
  .service('MessageService', MessageService)
  .service('LoginService', LoginService)
  .service('AuthService', AuthService)

  function MessageService($http) {
  var services = {
    getMessages : getMessages,
    sendMessage : sendMessage
  };

  return services;

  function getMessages() {
    return $http.get('/api/messages').then(function(messages){
      return messages;
   })
  };
  function sendMessage(message){
    return $http.post('/api/messages', message).then(function(message){
      return message;
    });
  }
};


function LoginService($http){
  var services = {
    authenticate : authenticate
  };
  return services;

  function authenticate(account){
   return $http.post('/api/auth', account).then(function(data){
      return data;
   });
  };
}

function AuthService (localStorageService){
  var services = {
    getAuthUser : getAuthUser
  }

  return services;

  function getAuthUser(){
    return localStorageService.get("_.account");
  }
}
