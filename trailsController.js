var trailsController = {};

trailsController.index = function() {
  Trail.populateTable(trailsView.index);
<<<<<<< HEAD
=======
  // trailsView.index();
>>>>>>> 665bb82311ce80a0febb535bc5143044eb40ec13
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
