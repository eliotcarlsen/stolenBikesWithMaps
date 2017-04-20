var Bike = require('./../js/bike.js').bikeModule;

var displayOutput = function (location, outputData){
  $('#output').append("Here are the bikes that were stolen in " + location + outputData + "<br>");
};



$(document).ready(function(){
  $('form#form').submit(function(event){
    event.preventDefault();
    var location = $('#bikes').val();
    var newBike = new Bike();
    newBike.output(location, displayOutput);
  });
});
