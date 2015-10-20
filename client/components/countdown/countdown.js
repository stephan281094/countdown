// Helpers ---------------------------------------------------------------------
Template.countdown_overview.helpers({
  countdowns() {
    let countdowns = Countdowns.find({
      $or: [
        {isPrivate: {$ne: true}},
        {createdBy: Meteor.userId()}
      ]
    }, {
      sort: {when: 1}
    }).fetch();

    if (countdowns) {
      _.each(countdowns, (countdown) => {
        countdown.when = moment(countdown.when).format('D MMMM, YYYY');
      });

      return countdowns;
    }
  }
});

Template.countdown_detail.helpers({
  countdown() {
    let slug      = FlowRouter.getParam('slug');
    let countdown = Countdowns.findOne({_id: slug});

    if (countdown)
      return countdown;
  }
});

// Rendered --------------------------------------------------------------------
Template.countdown_create.rendered = function() {
  $('#when').pickadate({
    format: 'd mmmm, yyyy'
  });
};

// Events ----------------------------------------------------------------------
Template.countdown_create.events({
  'submit .new-countdown': function(event, template) {
    event.preventDefault();

    let input   = event.target;
    let when    = moment(input.when.value).toDate();
    let what    = input.what.value;
    let private = input.private.checked;

    Meteor.call('countdownSave', when, what, private, (error, result) => {
      FlowRouter.go(`/countdown/${result}`);
      $('.new-countdown input[type=text]').val('');
    })
  }
});

Template.countdown_detail.events({
  'click .delete': function(event, template) {
    event.preventDefault();

    let slug = FlowRouter.getParam('slug');
    Meteor.call('countdownRemove', slug, (error, result) => {
      FlowRouter.go('/');
      // Notifications.success('Successfully deleted the countdown.')
    });
  }
});
