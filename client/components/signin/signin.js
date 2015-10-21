Template.signin.events({
  'submit .signin': function(event, template) {
    event.preventDefault();

    let input    = event.target;
    let username = input.username.value;
    let password = input.password.value;

    // If user doesn't exist yet
    if (Match.test(Meteor.users.findOne({username: username}), undefined)) {
      Accounts.createUser({
        username: username,
        password: password
      }, (error) => {
        GlobalNotifications.error({
          content: 'An error occurred while trying to create a new user'
        });
      });
    }

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        GlobalNotifications.error({
          content: 'An error occurred while trying to log in'
        });
        return;
      }

      GlobalNotifications.hideAll();
      GlobalNotifications.success({
        content: 'You successfully logged in as ' + username,
        duration: 3.5
      });
      FlowRouter.go('/');
    });
  }
});
