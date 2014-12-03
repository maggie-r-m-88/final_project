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
        return currentUser.findDistance(other);
      });

      //  var results2 = _.map(collection, function(other) {
      //   return currentUser.findDistance(other, 'work');
      //  });

      console.log(results);

      function isBigEnough(element) {
             return element.miles >  0 && element.miles < 15
                     && element.work_miles < 15 ;

          }
      var homefilter = results.filter(isBigEnough);

      console.log(homefilter);

      // var neighbors = _.each(homefilter, function(x) {
      //   $('.matchresults').append("<li class='matcher'>" + "<a href='"+ '#/allriders/' + x.objectId +"' >"  + "<img class='matchpic' src='" + x.picture + "'/>" + x.username + ' house ' + ' is ' + x.miles + ' miles away' + x.work_miles + 'work mi away' + "</a>" + "</li>");
      // });


    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#matchesTemp').html());
    }



  });
}());
