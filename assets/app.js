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

  // push to arrays
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
    savedMinutesAway: arrMinutesAway,
  });

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
  $("#minutesaway-display").empty();

  // get info from database
  var updatedTrainNames = snapshot.val().savedTrainNames;
  var updatedDestinations = snapshot.val().savedDestinations;
  var updatedFrequencies = snapshot.val().savedFrequencies;
  // Include displays with math
  var updatedNextArrivals = snapshot.val().savedNextArrivals;
  var updatedMinutes = snapshot.val().savedMinutesAway;

  // Re-display by appending with updated array
  for (var i = 0; i < updatedTrainNames.length; i++) {
    //create divs with that display train info (extra, add data-value of updatedTrainNames index # here so you can delete individual rows)
    var displayTrainNames = $("<p>").text(updatedTrainNames[i]);
    var displayDestinations = $("<p>").text(updatedDestinations[i]);
    var displayFrequencies = $("<p>").text(updatedFrequencies[i]);
    var displayNextArrivals = $("<p>").text(updatedNextArrivals[i]);
    var displayMinutes = $("<p>").text(updatedMinutes[i]);

    // append divs to display
    $("#trainname-display").append(displayTrainNames);
    $("#destination-display").append(displayDestinations);
    $("#frequency-display").append(displayFrequencies);
    $("#nextarrival-display").append(displayNextArrivals);
    $("#minutesaway-display").append(displayMinutes);
  }
});

function reset() {
  database.ref().set({
    savedTrainNames: "",
    savedDestinations: "",
    savedFirstTrains: "",
    savedFrequencies: "",
    savedNextArrivals: null,
    savedMinutesAway: null,
  });
};

$("#reset").click(function(){
  reset();
})
