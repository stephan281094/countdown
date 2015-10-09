FlowRouter.route('/', {
  name: 'home',
  action: (params) => {
    renderPage('home', {showBackButton: false});
  }
});

FlowRouter.route('/create', {
  name: 'create',
  action: (params) => {
    renderPage('create', {showBackButton: true});
  }
});

FlowRouter.route('/:slug', {
  name: 'countdown',
  action: (params) => {
    renderPage('countdown', {showBackButton: true});
  }
});

function renderPage(page, sessionTogglers = {}) {
  BlazeLayout.render(`page_${page}`);

  _.each(sessionTogglers, (value, key) => {
    Session.set(key, value);
  })
}
