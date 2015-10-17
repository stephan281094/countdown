Template.partial_timeleft.helpers({
  timeLeft(date, precise = true) {
    if (date < new Date()) {
      return 'Countdown has finished';
    }

    let now = Template.instance().time.get();
    let timeLeft;

    if (precise) {
      timeLeft = moment.preciseDiff(now, moment(date));
    } else {
      timeLeft = moment.duration(moment(date).diff(now)).humanize();
    }

    return timeLeft;
  }
});

Template.partial_timeleft.created = function() {
  this.time   = new ReactiveVar(moment());
  this.handle = Meteor.setInterval(() => {
    this.time.set(moment());
  }, 1000);
}

Template.partial_timeleft.destroyed = function() {
  Meteor.clearInterval(this.handle);
}
