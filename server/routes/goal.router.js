var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var pool = require('../modules/pool.js');

var idOfLoggedOnUser;

router.get('/get/', function(req, res) {
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('this is the reqUserId', req.user.id);
    var idOfLoggedOnUser = req.user.id;
    console.log('idOfLoggedOnUser', idOfLoggedOnUser);
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        console.log('checking scope of idOfLoggedOnUser', idOfLoggedOnUser);
        var queryText = 'SELECT * FROM "user_goals" WHERE "user_id" = ' + idOfLoggedOnUser;
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            console.log(result.rows);
            // Send back the results
            res.send({goals: result.rows});
          }
        }); // end query
      } // end if
    }); // end pool
  } else { //this is the else for reqAuth
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
})


router.post('/add/', function(req, res) {
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('this is the reqUserId', req.user.id);
    var goal = req.body;
    console.log(goal.name);
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db
        var queryText = 'INSERT INTO "user_goals" ("user_id", "goal")' +
        'VALUES ($1, $2);';

        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [req.user.id, goal.name], function(errorMakingQuery, result){
          done();
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        }); // end query
      } // end if
    }); // end pool
  } else { //this is the else for reqAuth
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
}); //end of post function




router.post('/date/', function(req, res) {
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('this is the reqUserId', req.user.id);
    var dateGoal = req.body;
    // console.log('this is dateGoal', dateGoal);
    // errorConnecting is bool, db is what we query against,
    // done is a function that we call when we're done
    pool.connect(function(errorConnectingToDatabase, db, done){
      if(errorConnectingToDatabase) {
        console.log('Error connecting to the database.');
        res.sendStatus(500);
      } else {
        // We connected to the database!!!
        // Now we're going to GET things from the db

        for (var i = 0; i < dateGoal.length; i++) {
          console.log('this is dateGoal at index i', dateGoal[i]);
          var queryText = 'INSERT INTO "days_completed" ("goal_id", "date")' +
          'VALUES ($1, $2);';
        // errorMakingQuery is a bool, result is an object
        db.query(queryText, [dateGoal[i].id, dateGoal[i].todayDate], function(errorMakingQuery, result){
          done();
            } // end for loop
          if(errorMakingQuery) {
            console.log('Attempted to query with', queryText);
            console.log('Error making query');
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        }); // end query
       } // end if
    }); // end pool
  } else { //this is the else for reqAuth
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
}); //end of post function



module.exports = router;
