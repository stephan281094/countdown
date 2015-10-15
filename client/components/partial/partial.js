Template.partial_timeleft.helpers({
	timeLeft(date) {
		if (date < new Date()) {
	    return 'Countdown has finished';
	  }

		let now = Template.instance().time.get();
		return moment.preciseDiff(now, moment(date)) + ' left';
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
