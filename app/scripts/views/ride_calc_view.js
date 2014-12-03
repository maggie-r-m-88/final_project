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

//       var container=$('.image-grid'),
// item_title,
// item_store,
// item_price,
// display;
//
//   etsyList.results.forEach( function (object) {
//
//   item_title = "<h3>" + object.title + "</h3>";
//
//   item_store = "<p>" + object.Shop.shop_name; + "</p>";
//
//   item_price = "<span>" + object.price + " " + object.currency_code + "<span>";
//
//   object.Images.forEach (function (y) {
//   item_image = "<img src='" + y.url_170x135 + "' />";
// });
//
//   display = "<li>" + item_image + item_title + item_store + item_price + "</li>";
//   container.append(display);
// });
      console.log(results);
      //  <a href="#/allriders/<%= objectId %>">
      console.log('I live at ' + currentUser.attributes.home_address);
      var neighbors = _.each(results, function(x) {
        $('.matchresults').append("<li class='matcher'>" + "<a href='"+ '#/allriders/' + x.objectId +"' >"  + "<img class='matchpic' src='" + x.picture + "'/>" + x.username + ' house ' + ' is ' + x.miles + ' miles away' + x.work +"</a>" + "</li>");
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
