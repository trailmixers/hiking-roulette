var trailsView = {};

trailsView.renderGroup = function (trailsList) {
  console.log('Render Group');
  $('#trails').fadeIn().append(
    trailsList.map(function(a){
      return trailsView.render(a);
    })
  );
};

trailsView.render = function (trail) {
  console.log('Render');
  return trailsView.template(trail);
};

// trailsView.index = function () {
//   trailsView.renderGroup(Trail.all);
// };

trailsView.index = function () {
  trailsView.renderGroup(Trail.all);
  console.log(Trail.all);
  // Trail.all.forEach(function(trail) {
  //   $('#trailList').append(trail);
  //
  // });
};
