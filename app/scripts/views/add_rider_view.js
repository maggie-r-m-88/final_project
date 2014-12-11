(function () {

  App.Views.AddRider = Parse.View.extend({

    events: {
      'submit #addRider' : 'addRider'
    },

    initialize: function () {
      this.render();

      $('#homeSearch').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());
    },

    addRider: function (e) {
      e.preventDefault();

      var fileUploadControl = $("#profilePhotoFileUpload")[0];
        if (fileUploadControl.files.length > 0) {
          var file = fileUploadControl.files[0];
          var name = "photo.jpg";

          var parseFile = new Parse.File(name, file);
        }
      parseFile.save()


      var c = new App.Models.Rider({
        name: $('#rider_name').val(),
        //name: App.user.attributes.name,
        home_address: $('#rider_home').val(),
        work_address: $('#rider_work').val(),
        info: $('#rider_info').val(),
        home_neighborhood:$('#rider_home_neighborhood').val(),
        work_neighborhood:$('#rider_work_neighborhood').val(),
        picture: parseFile,
        employer: $('#rider_employer').val(),
        linked_in: $('#rider_linked_in').val(),
        user: App.user,
        email: App.user.attributes.email

      });

       // Set Access Control List
      //c.setACL(new Parse.ACL(App.user));

      var postACL = new Parse.ACL(Parse.User.current());
      postACL.setPublicReadAccess(true);
      c.setACL(postACL);

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
                  App.updateUser();
                  App.riders.add(c);
                  App.router.navigate('#/myCommute', { trigger: true });
                }
            });
          });

        }
      );


    }

  });

}());
