myApp.controller('UserController', function(UserService, $http) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.prompt;
  vm.newGoal = {

  }

  let goalsCompletedToday = [];

  vm.currentGoalsList;

  vm.date = new Date();

  vm.dailyGoalItems = {}

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
    vm.currentGoalsList = response.data.goals;
    console.log('this is existing goal', vm.currentGoalsList);
  })
}

vm.getGoal();


function choosePrompt() {
   vm.prompt = enterGoalPrompt[Math.floor(Math.random()* enterGoalPrompt.length)];
}


vm.markGoalCompletedToggle = function(oneGoal) {
      for (var i = 0; i <   vm.currentGoalsList.length; i++) {
        console.log('this is the currentGoalsList.id at index', vm.currentGoalsList[i].id);
        if (vm.currentGoalsList[i].id === oneGoal.id ) {
          console.log('WE HAVE A MATCH!');
          vm.currentGoalsList[i].goalsCompletedToday = !vm.currentGoalsList[i].goalsCompletedToday;
          console.log(vm.currentGoalsList[i].goalsCompletedToday);
          vm.currentGoalsList[i].todayDate = new Date();
          console.log(vm.currentGoalsList[i].todayDate);
          console.log('this is oneGoal',vm.currentGoalsList[i]);
        }
      }
    }

vm.completedToday = function(oneGoal) {
      console.log('this is the current status of everything in vm.currentGoalsList', vm.currentGoalsList);
      $http.post('goal/date', vm.currentGoalsList).then(function(response) {
        console.log('response', response);
      })
  }





}); //end controller
