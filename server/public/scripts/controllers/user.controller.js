myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;


  vm.newGoal = {

  }


  vm.logGoal = function() {
    console.log("new goal", vm.newGoal);
  }

});
