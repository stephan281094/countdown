FlowRouter.route('/', {
  name: 'home',
  action: (params) => {
    BlazeLayout.render('page_home');
  }
});

FlowRouter.route('/:slug', {
  name: 'countdown',
  action: (params) => {
    BlazeLayout.render('page_countdown');
  }
});
