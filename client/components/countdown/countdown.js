// Helpers ---------------------------------------------------------------------
Template.countdown_overview.helpers({
  countdowns() {
    let countdowns = Countdowns.find({
      $or: [
        {isPrivate: {$ne: true}},
        {createdBy: Meteor.userId()}
      ]
    }, {
      sort: {when: 1, what: 1}
    }).fetch();

    if (countdowns)
      return countdowns;
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
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  $('#when').pickadate({
    format: 'yyyy-mm-dd',
    min: tomorrow
  });
};

Template.countdown_detail.rendered = function() {
  $('[data-toggle="tooltip"]').tooltip();
}

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
      GlobalNotifications.success({
        content: 'You successfully added a countdown!',
        duration: 3.5
      });
    })
  }
});

Template.countdown_detail.events({
  'click .delete': function(event, template) {
    event.preventDefault();

    let slug = FlowRouter.getParam('slug');
    Meteor.call('countdownRemove', slug, (error, result) => {
      if (error) {
        GlobalNotifications.error({
          content: 'Only the owner can remove this countdown',
          duration: 3.5
        });

        return;
      }

      FlowRouter.go('/');
      GlobalNotifications.success({
        content: 'You successfully deleted a countdown!',
        duration: 3.5
      });
    });
  },

  'click .private': function(event, template) {
    event.preventDefault();

    let slug = FlowRouter.getParam('slug');
    Meteor.call('countdownMakePublic', slug, (error, result) => {
      if (error) return;

      GlobalNotifications.success({
        content: 'You successfully made this countdown public',
        duration: 3.5
      });
    });
  }
});
