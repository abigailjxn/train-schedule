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
var arrNextArrival = [];
var arrMinutesAway = [];

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


    // moment math
  var firstTimeConverted = moment(userFirstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

 // get minutes away
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var remainder = diffTime % userFrequency;
  var minutesAway = userFrequency - remainder;
  console.log("Minutes Away: " + minutesAway);
// get next train time
  var nextTrain = moment().add(minutesAway, "minutes");
  var nextTrainTime = moment(nextTrain).format("HH:mm");
  console.log(nextTrain);
  console.log(nextTrainTime);


  arrTrainName.push(userTrainName);
  arrDestination.push(userDestination);
  arrFirstTrain.push(userFirstTrain);
  arrFrequency.push(userFrequency);
  arrNextArrival.push(nextTrainTime);
  arrMinutesAway.push(minutesAway);

  // set keys and values
  database.ref().set({
    savedTrainNames: arrTrainName,
    savedDestinations: arrDestination,
    savedFirstTrains: arrFirstTrain,
    savedFrequencies: arrFrequency,
    savedNextArrivals: arrNextArrival,
    savedMinutesAway: arrMinutesAway
  });

  console.log(arrTrainName, arrDestination, arrFirstTrain, arrFrequency, arrNextArrival, arrMinutesAway);
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
  // var updatedNextArrivals = 
  // var updatedMinutes = 



  // Re-display by appending with updated array
  for (var i = 0; i < updatedTrainNames.length; i++){
    //create divs with that display train info (extra, add data-value of updatedTrainNames index # here so you can delete individual rows)
    var displayTrainNames = $("<p>").text(updatedTrainNames[i]);
    var displayDestinations = $("<p>").text(updatedDestinations[i]);
    var displayFrequencies = $("<p>").text(updatedFrequencies[i]);
   
   
    // append divs to display
    $("#trainname-display").append(displayTrainNames);
    $("#destination-display").append(displayDestinations);
    $("#frequency-display").append(displayFrequencies);
  }
 
  // maybe not include this since it will eventually be updated every min?
  $("#nextarrival-display").empty();
  $("#minutes-display").empty();
});

// Calculate next arrival and minutes away
function calculation () {
   // Assumptions
   var tFrequency = 3;

   // Time is 3:30 AM
   var firstTime = "03:30";

   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);

   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
   var tRemainder = diffTime % tFrequency;
   console.log(tRemainder);

   // Minute Until Train
   var tMinutesTillTrain = tFrequency - tRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
}

calculation();
