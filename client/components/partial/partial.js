Session.setDefault('showBackButton', false);

Template.partial_header.helpers({
  showBackButton: () => {
    return Session.get('showBackButton');
  }
});
