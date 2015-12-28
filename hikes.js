function Trail (opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  }, this);
};


Trail.prototype.insertRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO trails (name, location, rating, distance, elevation, description, url) VALUES (?, ?, ?, ?, ?, ?, ?);',
        'data': [this.name, this.location,this.rating, this.distance, this.elevation, this.description, this.url],
      }
    ],
    callback
  );
};

Trail.prototype.deleteRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM trails WHERE id= ?;',
        'data': [trail.id],
      }
    ],
    callback
  );
};

Trail.all = [];

Trail.pushTrails = function (next, callback) {
  $.getJSON('/trails.json', function (data) {
    data.forEach(function(item) {
      var trail = new Trail(item);
      trail.insertRecord();
    });
    next(callback);
  });
};

Trail.loadAll = function(callback) {
  var callback = callback || function() {};
  if(Trail.all.length === 0) {
    webDB.execute('SELECT * FROM trails;',
    function(rows) {
      if (rows.length === 0) {
        Trail.pushTrails(Trail.loadAll, callback);
      } else {
        rows.forEach(function(row) {
          Trail.all.push(new Trail(row));
        });
        callback();
      }
    }
  );
  } else {
    callback();
  }
};

$(document).ready(function(){
  webDB.init();
  var location ='';
  var distance ='';
  var elevation ='';
  var dbQuery = '';
  var rowHTML = '';

  $('.form-control').change(function() {

    dbQuery = 'SELECT * FROM trails WHERE';
    rowHTML = '';
    location = ($('.location:selected').val());
    if(location != ''){ dbQuery += ' location='+ '"' +location + '"'; }

    distance = ($('.distance:selected').val());
    if(distance != '' && location != ''){ dbQuery += ' AND distance ' + distance; }
    else if(distance != ''){ dbQuery += ' distance ' + distance; }

    elevation =($('.elevation:selected').val());
    if(elevation != '' && distance != '' && location != ''){ dbQuery += ' AND elevation ' + elevation; }
    else if(elevation != ''){ dbQuery += ' elevation ' + elevation; }

  });// form-control

  $('#findhike').on('click', function(){
    if(location == '' && distance == '' && elevation == ''){ dbQuery = 'SELECT * FROM trails';}

    webDB.execute(dbQuery, function(tx) {
      //this is where we can add our random
      var ran  = Math.floor(Math.random() * tx.length);
      if(tx.length == 0)
      {
        $('.modal-body').html('No records were found, please try another filter');
      }
      else {
        console.log(ran);
        var ranNum = tx[ran+1] ? tx[ran+1].name : tx[ran-1].name;
        var ranNumUrl = tx[ran+1] ? tx[ran+1].url : tx[ran-1].url;

        console.log(ranNum);

        $('.modal-body').clear;
        $('.modal-body').html('<article><h2>We found your hike!</h2><h3><a href='+ tx[ran].url +' target="_blank">' + tx[ran].name + '</a></h3><h4>' + tx[ran].location + '</h4><h5>' + tx[ran].distance + ' miles, roundtrip; ' + tx[ran].elevation + ' ft gain</h5><h5>' + tx[ran].rating + ' stars</h5><p>' + tx[ran].description + '</p><br/><br/><h4>Not happy with your hike? Here\'s another suggestion</h4>' + '<a href="' + ranNumUrl + '">'+ ranNum + '</a><br><h4>Or Try again. Also checkout our <a href="/trails" target="_blank">trail list page</a></h4></article>');
      };

      console.log(tx);
    });
  });

});

// ----------- New Hike Form -----------//
var newTrailArray = [];

function NewTrail() {
  this.name = $('#newName').val();
  this.location = $('#newLocation').val();
  this.rating = $('#newRating').val();
  this.distance = $('#newDistance').val();
  this.elevation = $('#newElevation').val();
  this.description = $('#newDescription').val();
  this.url = $('#newURL').val();
  newTrailArray.push(this);
}

NewTrail.prototype.insertRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO trails (name, location, rating, distance, elevation, description, url) VALUES (?, ?, ?, ?, ?, ?, ?);',
        'data': [this.name, this.location,this.rating, this.distance, this.elevation, this.description, this.url],
      }
    ],
    callback
  );
};

var newTrailObject;

var createNewTrail = function() {
  newTrailObject = new NewTrail(newTrailArray);
};

$('#newHikeForm').on('submit', function(){
  event.preventDefault();
  createNewTrail();
  newTrailObject.insertRecord(function(){});
});
