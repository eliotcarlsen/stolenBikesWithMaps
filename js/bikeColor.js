function BikeColor(){
}

BikeColor.prototype.getColor = function(location, displayColorOutput){
  $.get('https://bikeindex.org:443/api/v3/search?location=' + location + '&distance=10&stolenness=proximity').then(function(response){
    var bike_red_array = [];
    var bike_blue_array = [];
    var time = [];
    var red = "Red";
    var blue = "Blue";
    response.bikes.forEach(function(bikes) {
      var dateStolen = bikes.date_stolen*1000;
      if (((Date.now()-365*24*60*60*1000) < dateStolen) && (dateStolen < Date.now())){
        if (bikes.frame_colors.includes(red)){
          bike_red_array.push(bikes.frame_colors);
        } else if (bikes.frame_colors.includes(blue)){
          bike_blue_array.push(bikes.frame_colors);
        }
      }
    });
    var red_bikes = bike_red_array.length;
    var blue_bikes = bike_blue_array.length;
    displayColorOutput(location, red_bikes, blue_bikes);

  }).fail(function(error){
    $('#output').text(error.responseJSON.message);
  });
};

exports.bikeColorModule = BikeColor;
