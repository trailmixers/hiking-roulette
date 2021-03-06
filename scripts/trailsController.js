var trailsController = {};

trailsController.index = function() {
  Trail.loadAll(trailsView.index);
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
