(function () {

  App.Views.GasRider = Parse.View.extend({

    tagName: 'ul',
    className: 'allRiders',

    events: {
        'click #gasCalc' : 'testRider'

    },

    template: _.template($('#gasTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#riderList').html(this.$el);
      /**********define our current user*********** this is global*******/
      currentUser = App.riders.find( function (a) {
          return a.attributes.user.id == App.user.id;
        });


    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.rider.toJSON()));

    },

    testRider: function (x) {

      var mpg = $('#mpg').val();
      var days = $('#days').val();
      var miles = $('#miles').val();
      var parking = $('#parking').val()
      var priceOfGas = 2.60;
      var tires = .0524

      var parkingTotal = parking * 12
      var costPerMile = priceOfGas/mpg
      var totalCPM = costPerMile + tires
      var time = days * 12
      var totalCost = totalCPM * time * miles
      var result = totalCost + parkingTotal

      var round = function(x) {
            return Math.round( x * 100) / 100;
      }
      var results2 = round(result);
           console.log('It costs $' + results2 + ' per year to commute.')
           $('#gas-results').empty();
           $('#gas-results').append("<li>" + 'It costs $' + results2 + ' per year to commute.'+ "</li>");
    },



  });

}());
