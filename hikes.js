function Hike (opts) {
  Object.keys(opts).forEach(function(e, index, keys) {
    this[e] = opts[e];
  }, this);
  //add content here?
};

Hike.prototype.insertRecord = function(callback) {
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

Hike.prototype.deleteRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM trails WHERE id= ?;',
        'data': [article.id],
      }
    ],
    callback
  );
};

Hike.all = [];

Hike.requestAll = function(next, callback) {
  $.getJSON('trails.json', function (data) {
    data.forEach(function(item) {
      var hike = new Hike(item);
      hike.insertRecord();
    });
    next(callback);
  });
};

Hike.loadAll = function(callback) {
  var callback = callback || function() {};

  if (Hike.all.length === 0) {
    webDB.execute('SELECT * FROM trails ORDER BY location DESC;',
      function(rows) {
        if (rows.length === 0) {
          Hike.requestAll(Hike.loadAll, callback);
        } else {
          rows.forEach(function(row) {
            Hike.all.push(new Hike(row));
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
});
