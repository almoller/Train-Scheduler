
var config = {
    apiKey: "AIzaSyD2vIX58Z1nhStzv_wfpMMc3OSdCrXXDPw",
    authDomain: "train-scheduler-8f243.firebaseapp.com",
    databaseURL: "https://train-scheduler-8f243.firebaseio.com",
    projectId: "train-scheduler-8f243",
    storageBucket: "train-scheduler-8f243.appspot.com",
    messagingSenderId: "483164693206"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstDepartureTime = "";
var frequency = 0;

var time = moment().format("dddd, MMMM Do YYYY, HH:mm");
$("#time").text("as of " + time);

$("#add-train").on("click", function (event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstDepartureTime = moment($("#first-departure-time").val().trim(), "HH:mm").format("HH:mm");
    frequency = $("#frequency").val().trim();

    console.log("1: "+trainName+ " 2: "+destination+ " 3: "+firstDepartureTime+ " 4: "+frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstDepartureTime: firstDepartureTime,
        frequency: frequency,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    time = moment().format("dddd, MMMM Do YYYY, HH:mm");
    $("#time").text("as of " + time);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-departure-time").val("");
    $("#frequency").val("");
});


database.ref().on("child_added", function(snapshot){
    
    var table = $("#trainSchedule");
    
    table.append("<tr>");
    table.append("<td>" + snapshot.val().trainName);
    table.append("<td>" + snapshot.val().destination);
    table.append("<td>" + snapshot.val().frequency);
    // table.append("<td>" + firstDepartureTime);
});
