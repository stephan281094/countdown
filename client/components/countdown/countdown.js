// Helpers ---------------------------------------------------------------------
Template.countdown_overview.helpers({
  countdowns: () => {
    return Countdowns.find({}).fetch();
  }
});

Template.countdown_detail.helpers({
  countdown: () => {
    let slug = FlowRouter.getParam('slug');

    return Countdowns.findOne({_id: slug});
  },

  timeLeft: () => {
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
Template.countdown_create.rendered = () => {
  $('#when').pickadate({
    format: 'd mmmm, yyyy'
  });
};

// Events ----------------------------------------------------------------------
Template.countdown_create.events({
  'submit .new-countdown': (event, template) => {
    event.preventDefault();

    let input = event.target;
    let when  = input.when.value;
    let what  = input.what.value;

    Meteor.call('countdownSave', when, what, (error, result) => {
      FlowRouter.go(`/${result}`);
      $('.new-countdown input[type=text]').val('');
    })
  }
});

Template.countdown_detail.events({
  'click .delete': (event, template) => {
    event.preventDefault();

    let slug = FlowRouter.getParam('slug');
    Countdowns.remove({_id: slug});

    FlowRouter.go('/');
  }
});

// Normal functions ------------------------------------------------------------
function getTimeLeft() {
  let slug      = FlowRouter.getParam('slug');
  let countdown = Countdowns.findOne({_id: slug});
  let date      = moment(countdown.when, 'D MMMM, YYYY');

  return moment.preciseDiff(moment(), date);
}
