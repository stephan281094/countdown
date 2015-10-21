FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('layout', {
      content: 'countdown_overview'
    });
  }
});

FlowRouter.route('/signin', {
  name: 'signin',
  action() {
    BlazeLayout.render('layout', {
      content: 'signin'
    })
  }
})

FlowRouter.route('/signout', {
  name: 'signout',
  action() {
    Accounts.logout((error) => {
      if (error) {
        GlobalNotifications.error({
          content: 'An error occurred while trying to log out'
        });
        return;
      }

      GlobalNotifications.success({
        content: 'You successfully logged out',
        duration: 3.5
      });
      FlowRouter.go('/');
    });
  }
})

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
