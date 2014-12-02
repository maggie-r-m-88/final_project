(function () {

  App.Models.Rider = Parse.Object.extend({

    className: 'Rider',

    idAttribute: 'objectId',

    defaults: {
      name: '',
      work_address: '',
      home_address: ''

    },

    initialize: function () {
      var t = this.get('name');
      //console.log(t + " has been added");
    },

     findDistance2: function (rider) {
      alert('hello ' + rider.attributes.name + 'Im ' + currentUser.attributes.name);

    //   var deg2rad = function(deg) {
    //     rad = deg * Math.PI/180; // radians = degrees * pi/180
    //     return rad;
    //   }
    //
    //   var round = function(x) {
    //     return Math.round( x * 1000) / 1000;
    //   }
    //   var lat1, lon1, lat2, lon2;
    //
    //   lat1 = deg2rad(this.get('home_latlong')[0]);
    //   lon1 = this.get('home_latlong')[1];
    //   lat2 = rider.get('home_latlong')[0];
    //   ....
    //   return {miles: mi, kilometers: km};
     }

  });

}());
