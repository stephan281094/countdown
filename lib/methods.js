// Methods
Meteor.methods({
  countdownSave(when, what, private) {
    let _id = Countdowns.insert({
      when:      when,
      what:      what,
      isPrivate: private,
      createdAt: new Date()
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
  }
});
