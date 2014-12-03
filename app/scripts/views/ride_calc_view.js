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

       var results2 = _.map(collection, function(other) {
        return currentUser.findDistance(other, 'work');
       });



      function isBigEnough(element) {
             return element.miles >  0 && element.miles < 5;
          }
      var homefilter = results.filter(isBigEnough);

      console.log(homefilter);


      var neighbors = _.each(homefilter, function(x) {
        $('.matchresults').append("<li class='matcher'>" + "<a href='"+ '#/allriders/' + x.objectId +"' >"  + "<img class='matchpic' src='" + x.picture + "'/>" + x.username + ' house ' + ' is ' + x.miles + ' miles away' +"</a>" + "</li>");
      });

    //  console.log('I work at ' + currentUser.attributes.work_address);
      var neighbors2 = _.each(results2, function(x) {
    //    console.log(x.username + ' work ' + ' is ' + x.miles + ' miles away');
        // $('.matchresults4').append("<li>" + x.username + ' work ' + ' is ' + x.miles + ' miles away' + "</li>");
      });





    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#matchesTemp').html());
    }



    //}

  });
}());
