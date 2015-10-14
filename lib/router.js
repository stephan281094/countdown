FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('layout', {
      content: 'countdown_overview'
    });
  }
});

FlowRouter.route('/countdown/create', {
  name: 'create',
  action() {
    BlazeLayout.render('layout', {
      content: 'countdown_create'
    });
  }
});

FlowRouter.route('/countdown/:slug', {
  name: 'countdown',
  action() {
    BlazeLayout.render('layout', {
      content: 'countdown_detail'
    });
  }
});

FlowRouter.notFound = {
  name: 'notfound',
  action() {
    BlazeLayout.render('layout', {
      content: 'notfound'
    })
  }
};
