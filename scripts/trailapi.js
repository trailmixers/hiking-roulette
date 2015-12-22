var requestURL = 'https://trailapi-trailapi.p.mashape.com/?'
requestURL += 'lat=47.5&';
requestURL += 'lon=-122.3&';
requestURL += 'radius=20&';
requestURL += 'limit=100&'; //we can take this out
requestURL += 'q[activities_activity_type_name_eq]=hiking';

$.ajax({
  url: requestURL,
  headers: {
    'X-Mashape-Key': 'ubtFWuqkz2mshv0Y3gO2sAiBeZGbp1Ra7nGjsnkpF7Kn1b1UkR',
    'Accept': 'text/plain'
  },
  success: function(data) {
    console.log('success');
    var places = data.places;
    places.forEach(function(place) {
      console.log(place);
      var result = $('<li></li>').text(place.name + ': ' + place.city + ', ' + place.state);
      $('#output-list').append(result);
    });
  }
});
