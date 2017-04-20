var BikeColor = require('./../js/bikeColor.js').bikeColorModule;
var displayColorOutput = function (location, redcolor, bluecolor){

  $('#output').append("there were " + redcolor + " red bikes that were stolen in " + location + " and there were " + bluecolor + " blue bikes that were stolen.");
};

$(document).ready(function(){
  $('form#form').submit(function(event){
    event.preventDefault();
    var location = $('#bikes').val();
    var newBike = new BikeColor();
    newBike.getColor(location, displayColorOutput);
  });
});
