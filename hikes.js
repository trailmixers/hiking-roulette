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

// Trail.requestAll = function(next, callback) {
//   $.getJSON('/trails.json', function (data) {
//     data.forEach(function(item) {
//       var trail = new Trail(item);
//       trail.insertRecord();
//     }).done();
//     next(callback);
//   });
// };
//
// Trail.loadAll = function(callback) {
//   var callback = callback || function() {};
//
//   if (Trail.all.length === 0) {
//     webDB.execute('SELECT * FROM trails;',
//       function(rows) {
//         if (rows.length === 0) {
//           console.log("if")
//           Trail.requestAll(Trail.loadAll, callback);
//         } else {
//           console.log("else");
//           rows.forEach(function(row) {
//             Trail.all.push(new Trail(row));
//           });
//           callback();
//         }
//       }
//     );
//   } else {
//     callback();
//   }
// };

$(document).ready(function(){
  webDB.init();
  // Trail.checkTable(Trail.all);
});
