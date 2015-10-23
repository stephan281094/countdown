Meteor.startup(() => {
  SyncedCron.start();
  Meteor.call('countdownRemoveFinished');
});
