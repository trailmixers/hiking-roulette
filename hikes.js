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
  $.getJSON('/trails.json', function (data) {
    data.forEach(function(item) {
      var trail = new Trail(item);
      trail.insertRecord();
      Trail.all.push(trail);
    });
  }).done(callback);
};


Trail.checkTable = function (array) {
  console.log(Trail.all);
  if (array.length === 0) {
    webDB.execute('DELETE FROM trails;');
    trailsController.index();
  } else {
    trailsController.index();
  };
};


$(document).ready(function(){
  webDB.init();
});
