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
  $('.form-control').change(function() {
     var string = 'SELECT * FROM trails WHERE '
     var location = ($('.location:selected').val());
     string += 'location = ' + "'" + location + "'";
     var distance = ($('.distance:selected').val());
     string += ' AND distance ' + distance;
     var elevation =($('.elevation:selected').val());
     string += ' AND elevation ' + elevation;
     webDB.execute(string, function(tx) {
      console.log(tx);
    });
  });








});
