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

var arrTrainName = [];
var arrDestination = [];
var arrFirstTrain = [];
var arrFrequency = [];

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

  arrTrainName.push(userTrainName);
  arrDestination.push(userDestination);
  arrFirstTrain.push(userFirstTrain);
  arrFrequency.push(userFrequency);

  database.ref().set({
    savedTrainNames: arrTrainName,
    savedDestinations: arrDestination,
    savedFirstTrains: arrFirstTrain,
    savedFrequencies: arrFrequency
  });

  console.log(arrTrainName, arrDestination, arrFirstTrain, arrFrequency);
});

// When value in database changes, update page display

database.ref().on("value", function(snapshot) {
  console.log(snapshot.val().savedTrainNames);
  // Empty listed train info
  $("#trainname-display").empty();
  $("#destination-display").empty();
  $("#frequency-display").empty();
  // maybe not include this since it will eventually be updated every min?
  $("#nextarrival-display").empty();
  $("#minutes-display").empty();

  // get info from database
  var updatedTrainNames = snapshot.val().savedTrainNames;
  var updatedDestinations = snapshot.val().savedDestinations;
  var updatedFrequencies = snapshot.val().savedFrequencies;
  // Include displays with math
  // CODE GOES HERE


  // Re-display by appending with updated array
  for (var i = 0; i < updatedTrainNames.length; i++){
    //create divs with that display train info (extra, add data-value of updatedTrainNames index # here so you can delete individual rows)
    // append divs to display
    $("#trainname-display").append();
    $("#destination-display").append();
    $("#frequency-display").append();
  }
 
  // maybe not include this since it will eventually be updated every min?
  $("#nextarrival-display").empty();
  $("#minutes-display").empty();
});
