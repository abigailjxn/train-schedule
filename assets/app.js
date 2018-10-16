// Initialize Firebase
var config = {
  apiKey: "AIzaSyBtbAFzXc1SvrsxmpUw4UyERs1uz9r6UAs",
  authDomain: "train-schedule-167d1.firebaseapp.com",
  databaseURL: "https://train-schedule-167d1.firebaseio.com",
  projectId: "train-schedule-167d1",
  storageBucket: "train-schedule-167d1.appspot.com",
  messagingSenderId: "364153720440"
};
firebase.initializeApp(config);

// Connect to database

var database = firebase.database();

// var userTrainName = $("#trainname-input")
//   .val()
//   .trim();
// var userDestination = $("#destination-input")
//   .val()
//   .trim();
// var userFirstTrain = $("#firsttime-input")
//   .val()
//   .trim();
// var userFrequency = $("#frequency-input")
//   .val()
//   .trim();

// Take user input values and update Firebase
$("#submit").on("click", function() {
  event.preventDefault();
  var userTrainName = $("#trainname-input")
    .val()
    .trim();
  var userDestination = $("#destination-input")
    .val()
    .trim();
  var userFirstTrain = $("#firsttime-input")
    .val()
    .trim();
  var userFrequency = $("#frequency-input")
    .val()
    .trim();
  console.log(userTrainName, userDestination, userFirstTrain, userFrequency);

  database.ref().set({
    savedTrainName: userTrainName,
    savedDestination: userDestination,
    savedFirstTrain: userFirstTrain,
    savedFrequency: userFrequency
  });

  console.log(userTrainName, userDestination, userFirstTrain, userFrequency);
});

// When value in database changes, update page display

database.ref().on("value", function(snapshot) {
  console.log(snapshot.val());
});
