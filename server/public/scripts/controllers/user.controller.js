myApp.controller('UserController', function(UserService, $http) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.prompt;
  vm.newGoal = {

  }

  vm.goalsCompletedToday = {

  };
  vm.existingGoal;

  vm.date = new Date();

  var enterGoalPrompt = ["Write a Goal You'd Like to Accomplish", "What Goal Would You Like to Track?", "What Would You Like to Work On?",
  "Enter One of Your Aspirations To Get Started", "What Would You Like to Achieve?", "Add One of Your Goals to Track Your Progress"];
  choosePrompt();

  vm.addGoal = function() {
    console.log("new goal", vm.newGoal);
    $http.post('/goal/add', vm.newGoal).then(function(response) {
      console.log('this is the response', response);
    })
  } //end addGoal function




vm.getGoal = function() {
  console.log('get goal function called');
  $http.get('goal/get').then(function(response) {
    console.log('this is the stuff in the database at the moment', response.data.goals);
    vm.existingGoal = response.data.goals;
    console.log('this is existing goal', vm.existingGoal);
  })
}

vm.getGoal();


function choosePrompt() {
   vm.prompt = enterGoalPrompt[Math.floor(Math.random()* enterGoalPrompt.length)];
}

vm.completedToday = function() {
  console.log('CompletedTodaycalled');
  $http.post('goal/date', vm.goalsCompletedToday).then(function(response) {
    console.log('response', response);
  })
}

vm.goalCompletedToggle = function(oneGoal) {
  console.log('now passing back the whole object', oneGoal);
  oneGoal.goalsCompletedToday = !oneGoal.goalsCompletedToday;
  console.log(oneGoal.goalsCompletedToday);
}


}); //end controller
