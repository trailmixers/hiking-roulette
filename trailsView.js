var trailsView = {};

trailsView.renderGroup = function () {
  $('#trails').fadeIn().append(
    trailsList.map(function(a){
      return trailsView.render(a);
    })
  );
};
