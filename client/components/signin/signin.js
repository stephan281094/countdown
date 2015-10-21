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
        console.log(error);
      });
    }

    Meteor.loginWithPassword(username, password, (error) => {
      if (!error) console.log('User successfully logged in');
      FlowRouter.go('/');
    });
  }
});
