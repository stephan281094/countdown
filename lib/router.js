FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    BlazeLayout.render('layout', {
      content: 'countdown_overview'
    });
  }
});

FlowRouter.route('/create', {
  name: 'create',
  action: function(params) {
    BlazeLayout.render('layout', {
      content: 'countdown_create'
    });
  }
});

FlowRouter.route('/:slug', {
  name: 'countdown',
  action: function(params) {
    BlazeLayout.render('layout', {
      content: 'countdown_detail'
    });
  }
});
