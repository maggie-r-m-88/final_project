(function () {

  App.Views.ListRiders = Parse.View.extend({

    tagName: 'ul',
    className: 'allRiders',

    events: {},

    template: _.template($('#listTemp').html()),

    initialize: function (options) {

      this.options = options;

      //this.render();

      this.collection.off();
      this.collection.on('sync', this.riderQuery, this);

      // Get our Element On Our Page
      $('#riderList').html(this.$el);

      //render our page
      this.riderQuery();
    },

    riderQuery: function(){
      var self= this;

      //query parse for specific rider per user
      var user_rider = new Parse.Query(App.Models.Rider);
      user_rider.equalTo('user', App.user);
      user_rider.find({
        success: function (results) {
          self.collection = results;
          self.render();

        }

      });
    },

    render: function () {
      var self = this;

      // Empty out
      this.$el.empty();

      var local_collection = this.collection;
      if (this.options.sort != undefined) {
        // Setting up a localized collection to sort by our sort param
         local_collection = _.sortBy(this.collection, function (model){
          return model[self.options.sort];
        });
      }
       //else {
      //    local_collection = _.sortBy(this.collection, function (model){
      //     return -parseInt(model.rating);
      //   });
       //
      //  }
        _.each(local_collection, function (c) {
          self.$el.append(self.template(c.toJSON()));
       });
        // Sort from our default comparator in our collection constructor

        // this.collection.each(function (c) {
        //
        //   var profilePhoto = c.get("picture");
        //
        //   var imageURL = profilePhoto.url();
        //
        //   $('.profilepic').src = imageURL;
        //
        //   self.$el.append(self.template(c.toJSON()));
        // });

      return this;

      }


  });

}());
