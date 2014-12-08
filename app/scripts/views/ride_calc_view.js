(function(){

  App.Views.matchesView = Parse.View.extend({

  //tagName: 'ul'  ,
  //className: 'myMatches',
    events: {
       'click #matchesCalc' : 'matchesCalc',
       'click #filter' : 'filter'
    },

    initialize: function(){
      this.render();

      $('#riderList').html(this.$el);
      collection = App.riders.models;

    //google maps template initialize//
    // function initialize() {
    //   geocoder = new google.maps.Geocoder();
    //   var latlng = new google.maps.LatLng(33.848688,-84.37332900000001);
    //   var mapOptions = {
    //     zoom: 10,
    //     center: latlng
    //   }
    //   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    //
    //   collection = App.riders.models;
    //
    // /**********define our current user*********** this is global*******/
    // currentUser = App.riders.find( function (a) {
    //     return a.attributes.user.id == App.user.id;
    //   });
    //
    //
    //      }
    //
    // google.maps.event.addDomListener(window, 'load', initialize);
    //
    // geocoder = new google.maps.Geocoder();


    window.getCoordinates = function ( address, callback) {
      var coordinates;

      geocoder.geocode({ address: address}, function (results, status){
         coords_obj = results[0].geometry.location;
         coordinates = [coords_obj.k, coords_obj.B];
         callback(coordinates);
      })

    }
    //end google maps intialize

    },

    filter: function(filternumber){
      filternumber = $('#filternumber').val();

      $('.testresults').empty();

      var results = _.map(collection, function(other) {
        return currentUser.findDistance(other);
      });

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

      var sorted = results.sort(dynamicSort("miles"));
           console.log(sorted);

      //sort by will go here
      function isBigEnough(element) {
             return element.miles >  0 && element.miles < filternumber
                     && element.work_miles < filternumber ;

          }
      var homefilter = sorted.filter(isBigEnough);
      console.log(homefilter);
      if (homefilter.length === 0) {
        $('.testresults').append("<li>" + 'No Current Matches Found' + "</li>");
      };

    var neighbors = _.each(homefilter, function(x) {
     $('.testresults').append("<li class='matcher'>" + "<a href='"+ '#/allriders/' + x.objectId +"' >"  + "<p class='stats'>"+'Home:  ' + x.miles +'mi' +'    '+ 'Work:  ' +  x.work_miles + 'mi' + "</p>" + "<img class='matchpic' src='" + x.picture + "'/>" + "<h3>" + x.username + "</h3>" +   "</a>" + "</li>");
     });


    }
    ,
    matchesCalc: function(){



    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#matchesTemp').html());
    }



  });
}());
