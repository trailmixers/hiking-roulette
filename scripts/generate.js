hike.generate = function() {
 ('button').on('click' , function(){
   $('.form-control').change(function() {
    var location = ($('.location:selected').val());
    var distance = ($('.distance:selected').val());
    var elevation =($('.elevation:selected').val());

    if(location) {
   webDB.execute(
     [
       {
         'sql': 'SELECT * FROM trails WHERE location = ? AND distance = ? AND elevation = ?',
         'data': [location, distance, elevation],
       }
     ],
   );
  } else {
  webDB.execute(
    [
      {
        'sql': 'SELECT * FROM trails WHERE location = ? AND distance = ? AND elevation = ?',
        'data': [location, distance, elevation],
      }
    ],
  );
 }
};



















   var results = results
   var array =[]
   array.push(results)
 })
}
