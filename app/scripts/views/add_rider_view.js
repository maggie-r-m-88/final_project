(function () {

  App.Views.AddRider = Parse.View.extend({

    events: {
      'submit #addRider' : 'addRider'
    },

    initialize: function () {
      this.render();

      $('#riderList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());
    },

    addRider: function (e) {
      e.preventDefault();

      var c = new App.Models.Rider({
        name: $('#rider_name').val(),
        home_address: $('#rider_home').val(),
        work_address: $('#rider_work').val()
      });


      var addy_home =  $('#rider_home').val();
      var addy_work =  $('#rider_work').val();

      // Get our home coordinates
      window.getCoordinates(addy_home,
        function(coordinates_home) {

          // Set our home coordinates
          c.set('home_latlong', coordinates_home);

          // Get our work coordinates
          window.getCoordinates(addy_work,
            function(coordinates_work) {

              // Set our work coordinates
              c.set('work_latlong', coordinates_work);

              // Save our entire object
              c.save(null, {
                success: function () {
                  App.riders.add(c);
                  App.router.navigate('', { trigger: true });
                }
            });
          });

        }
      );





    }

  });

}());
