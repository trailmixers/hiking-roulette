function Trail (opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  }, this);
  //add content here?
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

Trail.populateTable = function (callback) {
  webDB.execute('DELETE FROM trails;');
  $.getJSON('/trails.json', function (data) {
    data.forEach(function(item) {
      var trail = new Trail(item);
      trail.insertRecord();
      Trail.all.push(trail);
    });
  }).done(callback);
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

      if(tx.length == 0)
      {
        rowHTML += 'No records were found, please try another filter';
      }
      else {
        for(var i=0; i<tx.length;i++){
          if(i==0){ rowHTML += '<div class="row highlight">'; }
          else {rowHTML += '<div class="row">';}
          rowHTML += '<div class="col-md-12">';
          rowHTML += '<h2><a target="_blank" href="'+ tx[i].url +'">'+ tx[i].name +'</a></h2>';
          rowHTML += '<p>' + tx[i].description + '</p>';
          rowHTML += '</div></div>';
        }
      }
      $('.modal-body').html(rowHTML);
      console.log(tx);
    });
  });

});

// ----------- New Hike Form -----------//
newTrailArray = [];

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
  newTrailObject.insertRecord(function(){});
});
