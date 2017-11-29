myApp.controller('InfoController', function(UserService) {
  console.log('InfoController created');
  const vm = this;
  vm.userService = UserService;
});
