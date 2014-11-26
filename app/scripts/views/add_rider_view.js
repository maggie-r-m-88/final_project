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

      var geocoder = new google.maps.Geocoder();
      var address = $('#rider_home').val();
      var coordinates_obj;
      var coordinates;

       geocoder.geocode( { 'address': address}, function(results, status) {

       if (status == google.maps.GeocoderStatus.OK) {
         coordinates_obj = results[0].geometry.location;
         coordinates = [coordinates_obj.k, coordinates_obj.B];

         console.log(coordinates);

           }
         });

      // var addy_home =  $('#rider_home').val();
      //   window.getCoordinates(addy_home,
      //       function(coordinates_home)
      //       {
      //         Data.homeCords = coordinates_home;
      //
      //       });
      //
      // var addy_work =  $('#rider_work').val();
      // window.getCoordinates(addy_work,
      //      function(coordinates_work)
      //      {
      //        Data.workCords = coordinates_work;
      //        console.log(Data.workCords)
      //      });



      var c = new App.Models.Rider({
        name: $('#rider_name').val(),
        home_address: $('#rider_home').val(),
        work_address: $('#rider_work').val(),
        home_latlong: coordinates

      });


      c.save(null, {
        success: function () {
          App.riders.add(c);
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());
