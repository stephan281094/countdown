// Helpers
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

  daysLeft: () => {
    let slug      = FlowRouter.getParam('slug');
    let countdown = Countdowns.findOne({_id: slug});
    let date      = moment(countdown.when, 'D MMMM, YYYY');
    let now       = moment();

    return date.diff(now, 'days') + 1;
  }
});

// Rendered
Template.countdown_create.rendered = () => {
  $('#when').pickadate({
    format: 'd mmmm, yyyy'
  });
};

// Events
Template.countdown_create.events({
  'submit .new-countdown': (event, template) => {
    event.preventDefault();

    let input = event.target;
    var when  = input.when.value;
    var what  = input.what.value;

    let slug = Countdowns.insert({
      when:      when,
      what:      what,
      createdAt: new Date()
    });

    FlowRouter.go(`/${slug}`);

    $('.new-countdown input[type=text]').val('');
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
