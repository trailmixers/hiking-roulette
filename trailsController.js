var trailsController = {};

trailsController.index = function() {
  Trail.populateTable(trailsView.index);
  $('.page').show();
  $('#trails').show();
  $('.trailList').show();
  $('.about-team').show();
};

trailsController.template = function(ctx, next) {
  if(trailsView.template) {
    next();
  } else {
    $.get('/listTemplate.html', function(data, msg, xhr) {
      trailsView.template = Handlebars.compile(data);
      next();
    }).done;
  }
};
