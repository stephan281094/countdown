// Methods
Meteor.methods({
  countdownSave: (when, what) => {
    let _id = Countdowns.insert({
      when:      when,
      what:      what,
      createdAt: new Date()
    });

    if (Match.test(_id, undefined)) {
      throw new Meteor.Error(500, 'Could not save countdown');
    }

    return _id;
  }
});
