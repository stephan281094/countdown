FlowRouter.route('/', {
  name: 'home',
  action(params) {
    BlazeLayout.render('layout', {
      content: 'countdown_overview'
    });
  }
});

FlowRouter.route('/create', {
  name: 'create',
  action(params) {
    BlazeLayout.render('layout', {
      content: 'countdown_create'
    });
  }
});

FlowRouter.route('/:slug', {
  name: 'countdown',
  action(params) {
    BlazeLayout.render('layout', {
      content: 'countdown_detail'
    });
  }
});
