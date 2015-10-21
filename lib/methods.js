// Methods
Meteor.methods({
  countdownSave(when, what, private) {
    let createdBy = Meteor.userId();

    let _id = Countdowns.insert({
      when:      when,
      what:      what,
      isPrivate: private,
      createdAt: new Date(),
      createdBy: createdBy
    });

    if (Match.test(_id, undefined)) {
      throw new Meteor.Error(500, 'Could not save countdown');
    }

    return _id;
  },

  countdownRemove(_id) {
    Countdowns.remove({_id: _id});
  },

  countdownRemoveFinished() {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() + 1);

    Countdowns.remove({
      when: {$lt: yesterday} // Allow countdown to exist one day after finish
    });
  },

  countdownMakePublic(_id) {
    let countdown = Countdowns.findOne({_id: _id});
    if (!countdown) {
      throw new Meteor.Error(`Could not find countdown with _id "${_id}"`);
    }

    if (!Meteor.userId() || countdown.createdBy !== Meteor.userId()) {
      throw new Meteor.Error(
        'User is not logged in or is not owner of countdown'
      );
    }

    Countdowns.update(_id, {$set: {isPrivate: false}});
  }
});
