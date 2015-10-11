FlowRouter.route('/', {
  name: 'home',
  action: (params) => {
    Session.set('showBackButton', false);
    BlazeLayout.render('layout', {
      content: 'countdown_overview'
    });
  }
});

FlowRouter.route('/create', {
  name: 'create',
  action: (params) => {
    Session.set('showBackButton', true);
    BlazeLayout.render('layout', {
      content: 'countdown_create'
    });
  }
});

FlowRouter.route('/:slug', {
  name: 'countdown',
  action: (params) => {
    Session.set('showBackButton', true);
    BlazeLayout.render('layout', {
      content: 'countdown_detail'
    });
  }
});
