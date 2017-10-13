myApp.controller('UserController', function(UserService, $http) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;


  vm.newGoal = {

  }


  vm.addGoal = function() {
    console.log("new goal", vm.newGoal);
    $http.post('/goal/add', vm.newGoal).then(function(response) {
      console.log('this is the response', response);
    })
  } //end addGoal function




vm.getGoal = function() {
  console.log('get goal function called');
  $http.get('goal/get').then(function(response) {
    console.log('this is the stuff in the database at the moment', response);
  })
}

vm.getGoal();


}); //end controller
