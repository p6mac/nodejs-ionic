angular.module('starter.controllers', [])
  .controller('ChatController', ChatController)
  .controller('LoginController', LoginController)
  .controller('AccountController', AccountController)
  .controller('ChatDetailController', ChatDetailController)

  function ChatController($scope,$ionicScrollDelegate,MessageService, AuthService){
    var vm = this;

    vm.message = {
        name : AuthService.getAuthUser().name
    };
    vm.sendMessage = sendMessage;
    // Initialized
    getMessage();

    function getMessage(){
      MessageService.getMessages().then(function(messages){
        $scope.messages = messages.data;
        $ionicScrollDelegate.scrollBottom();
      });
    };
    function sendMessage(){
      MessageService.sendMessage(vm.message).then(function(message){
        $scope.messages.push(vm.message);
        vm.message = {};
        $ionicScrollDelegate.scrollBottom();
      });
    };
  };

  function LoginController($scope, $state,$ionicPopup, localStorageService,LoginService){
    var vm = this,
        token_key = "_.token",
        account_key = "_.account";
    vm.account = null;
    vm.login = login;

    function login(){
      LoginService.authenticate(vm.account).then(function(resp){
        if(resp.data.success === true){
          localStorageService.set(token_key,resp.data.token);
          localStorageService.set(account_key, resp.data.account);
          $state.go('tab.dash');
        }else {
          $ionicPopup.alert({
            title : 'Login Error',
            template : resp.data.message
          });
        }
      })
    };
  }

  function AccountController(localStorageService) {
    var vm = this;
  }

  function ChatDetailController($scope, $stateParams) {
    $scope.detail = $stateParams.chatId;
    console.log($stateParams.chatId);
  }
