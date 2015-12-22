var trailsView = {};

trailsView.renderGroup = function () {
  $('#trails').fadeIn().append(
    trailsList.map(function(a){
      return trailsView.render(a);
    })
  );
};

trailsView.render = function (trail) {
  return trailsView.template(trail);
};

trailsView.index = function () {
  trailsView.renderGroup(Trail.all);
};
