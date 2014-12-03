(function () {

  App.Views.SingleRider = Parse.View.extend({

    tagName: 'ul',
    className: 'riderSingle',

    events: {
      'submit #updateRider' : 'updateRider',
      'click #delete' : 'deleteRider'
    },

    template: _.template($('#singleTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();



      // Get our Element On Our Page
      $('#riderList').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.rider.toJSON()));

    },

    updateRider: function (e) {
      e.preventDefault();



      // Update our Model Instance
      this.options.rider.set({
        name: $('#update_name').val(),
        email: $('#update_email').val(),
        info: $('#update_info').val(),
        home_address: $('#update_home_address').val(),
        work_address: $('#update_work_address').val()
      });


    var addy_home =  $('#update_home_address').val();
    var addy_work =  $('#update_work_address').val();

    var x = this.options.rider;
    window.getCoordinates(addy_home, function(coordinates_home){

    // Set our home coordinates
    x.set('home_latlong', coordinates_home);

      //Get our work coordinates
      window.getCoordinates(addy_work, function(coordinates_work){

        //set work coordinates
      x.set('work_latlong', coordinates_work);

        //save object
        x.save();
        App.router.navigate('', {trigger: true});
      });


    });

      // Save Instance
      //this.options.rider.save();


    //  App.router.navigate('', {trigger: true});

    },

    deleteRider: function (e) {
      e.preventDefault();

      // Remove Coffee
      this.options.rider.destroy();

      // Go home ET
      App.router.navigate('', {trigger: true});

    }

  });

}());
