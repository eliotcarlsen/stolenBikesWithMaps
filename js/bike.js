function Bike(){
}
  var map;
  var addresses = [];
  var bikes_array = [];
  var marker;
Bike.prototype.output = function(location, displayOutput){

  $.get('https://bikeindex.org:443/api/v3/search?location=' + location + '&distance=20&stolenness=proximity').then(function(response){
    var time = [];
    response.bikes.forEach(function(bikes) {
      var dateStolen = bikes.date_stolen*1000;
      if (((Date.now()-365*24*60*60*1000) < dateStolen) && (dateStolen < Date.now())){
        bikes_array.push(bikes.title);
        addresses.push(bikes.stolen_location);
        var newdate = new Date(dateStolen);
        var timeInPST = newdate.toLocaleDateString();
        time.push(timeInPST);
      }
    });
    displayOutput(location, bikes_array);
    $.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + location).then(function(newresponse){
      var lati = newresponse.results[0].geometry.location.lat;
      var long = newresponse.results[0].geometry.location.lng;
      map = new google.maps.Map(document.getElementById('showmap'), {
        center: {lat: lati, lng: long},
        mapTypeId: 'terrain',
        zoom: 10
      });
    });
  }).then(function(){
    var markerArray = [];
    var a = [];
    for(var i = 0; i < addresses.length; i++){
      a.push([addresses[i], bikes_array[i]]);
    }

    console.log(a);
    a.forEach(function(address){
        $.get('http://maps.googleapis.com/maps/api/geocode/json?address=' + address[0]).then(function(response){
          var latitude = response.results[0].geometry.location.lat;
          var longitude = response.results[0].geometry.location.lng;
          console.log(response);
          console.log(latitude);
          console.log(longitude);
            marker = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            draggable: true,
            title: address[1],
            animation: google.maps.Animation.DROP,
            map: map
          });
          //marker.addListener('click', toggleBounce);
          markerArray.push(marker);
          function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
      });
    });
    for (var i=0; i<markerArray.length; i++){
       markerArray[i].setMap(map);
     }
  }).fail(function(error){
    $('#output').text(error.responseJSON.message);
  });
};


exports.bikeModule = Bike;
