page('/', trailsController.template, trailsController.index);
page('/trails', listController.index);
page('/about', aboutController.index);

page.start();
