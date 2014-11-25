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

      c.save(null, {
        success: function () {
          App.riders.add(c);
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());
