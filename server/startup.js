Meteor.startup(function() {
	SyncedCron.start();
	Meteor.call('countdownRemoveFinished');
});
