// Helpers ---------------------------------------------------------------------
Template.countdown_overview.helpers({
  countdowns() {
    let countdowns = Countdowns.find({}, {sort: {when: 1}}).fetch();

    _.each(countdowns, (countdown) => {
      countdown.when = moment(countdown.when).format('D MMMM, YYYY');
    });

    return countdowns;
  }
});

Template.countdown_detail.helpers({
  countdown() {
    let slug = FlowRouter.getParam('slug');

    return Countdowns.findOne({_id: slug});
  },

  timeLeft() {
    return Template.instance().timeLeft.get();
  }
});

// Created ---------------------------------------------------------------------
Template.countdown_detail.created = function() {
  this.timeLeft = new ReactiveVar(getTimeLeft());
  this.handle   = Meteor.setInterval(() => {
    this.timeLeft.set(getTimeLeft());
  }, 1000);
}

// Destroyed -------------------------------------------------------------------
Template.countdown_detail.destroyed = function() {
  Meteor.clearInterval(this.handle);
}

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

    let input = event.target;
    let when  = moment(input.when.value).toDate();
    let what  = input.what.value;

    Meteor.call('countdownSave', when, what, (error, result) => {
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

// Normal functions ------------------------------------------------------------
function getTimeLeft() {
  let slug      = FlowRouter.getParam('slug');
  let countdown = Countdowns.findOne({_id: slug});
  let date      = moment(countdown.when);

  // If countdown has finished
  if (countdown.when < new Date()) {
    return false;
  }

  return moment.preciseDiff(moment(), date) + ' left';
}
