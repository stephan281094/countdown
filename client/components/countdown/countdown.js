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
        let date      = moment(countdown.date, 'D MMMM, YYYY');
        let now       = moment();

        return date.diff(now, 'days') + 1;
    }
});

// Rendered
Template.countdown_add.rendered = () => {
    $('#date').pickadate({
        format: 'd mmmm, yyyy'
    });
};

// Events
Template.countdown_add.events({
    'submit .new-countdown': (event, template) => {
        event.preventDefault();

        let input     = event.target;
        var date      = input.date.value;
        var happening = input.happening.value;

        let slug = Countdowns.insert({
            date:      date,
            happening: happening,
            createdAt: new Date()
        });

        FlowRouter.go(`/${slug}`);

        $('.new-countdown input[type=text]').val('');
    }
});
