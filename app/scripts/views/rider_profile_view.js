(function () {

  App.Views.riderProfileListing = Parse.View.extend({

    tagName: 'ul',
    className: 'riderprofileSingle',

    events: {
      // 'submit #updateRider' : 'updateRider',
      // 'click #delete' : 'deleteRider'
    },

    template: _.template($('#riderprofileTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#riderList').html(this.$el);
      var user_email = App.user.attributes.email;
      console.log(user_email);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.rider.toJSON()));

    }

    // updateRider: function (e) {
    //   e.preventDefault();
    //
    //   // Update our Model Instance
    //   this.options.rider.set({
    //     name: $('#update_name').val(),
    //     home_address: $('#update_home_address').val(),
    //     work_address: $('#update_work_address').val()
    //   });
    //
    //   // Save Instance
    //   this.options.rider.save();
    //
    //
    //   App.router.navigate('', {trigger: true});
    //
    // },
    //
    // deleteRider: function (e) {
    //   e.preventDefault();
    //
    //   // Remove Coffee
    //   this.options.rider.destroy();
    //
    //   // Go home ET
    //   App.router.navigate('', {trigger: true});
    //
    // }

  });

}());
