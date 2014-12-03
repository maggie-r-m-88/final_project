(function(){

  App.Views.matchesView = Parse.View.extend({

  //tagName: 'ul'  ,
  //className: 'myMatches',
    events: {
       'click #matchesCalc' : 'matchesCalc'
    },

    initialize: function(){
      this.render();

      $('#riderList').html(this.$el);
      collection = App.riders.models;

    },

    matchesCalc: function(){

      var results = _.map(collection, function(other) {
        return currentUser.findDistance(other, 'home');
      });

      //  var results2 = _.map(collection, function(other) {
      //   return currentUser.findDistance(other, 'work');
      //  });
      console.log(results);
      console.log('I live at ' + currentUser.attributes.home_address);
      var neighbors = _.each(results, function(x) {
        $('.matchresults').append("<li>" + x.username + ' house ' + ' is ' + x.miles + ' miles away' + x.work + "</li>");
      });



      // console.log('I work at ' + currentUser.attributes.work_address);
      // var neighbors2 = _.each(results2, function(x) {
      // //  console.log(x.username + ' work ' + ' is ' + x.miles + ' miles away');
      //   $('.matchresults4').append("<li>" + x.username + ' work ' + ' is ' + x.miles + ' miles away' + "</li>");
      // });





    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#matchesTemp').html());
    }



    //}

  });
}());
