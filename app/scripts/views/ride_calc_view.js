(function(){

  App.Views.rideCalcView = Parse.View.extend({
    //classNAme???
    events: {
       'click #distanceCalc' : 'distanceCalc'
    },

    initialize: function(){
      this.render();

      $('#riderList').html(this.$el);

    },

    distanceCalc: function(){

      var results = _.map(collection, function(other) {
        return currentUser.findDistance(other, 'home');
      });

       var results2 = _.map(collection, function(other) {
        return currentUser.findDistance(other, 'work');
       });

      console.log('I live at ' + currentUser.attributes.home_address);
      var neighbors = _.each(results, function(x) {
        $('.matchresults3').append("<li>" + x.username + ' house ' + ' is ' + x.miles + ' miles away' + "</li>");
      });

      console.log('I work at ' + currentUser.attributes.work_address);
      var neighbors2 = _.each(results2, function(x) {
      //  console.log(x.username + ' work ' + ' is ' + x.miles + ' miles away');
        $('.matchresults4').append("<li>" + x.username + ' work ' + ' is ' + x.miles + ' miles away' + "</li>");
      });





    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#rideCalcTemp').html());
    }



    //}

  });
}());
