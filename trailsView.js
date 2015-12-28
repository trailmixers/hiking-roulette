var trailsView = {};

trailsView.renderGroup = function (trailsList) {
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
  $('.page').show();
  $('#trails').show();
  $('.trailList').show();
  $('.about-team').show();
  trailsView.renderGroup(Trail.all);
};
