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
    }

  });

}());
