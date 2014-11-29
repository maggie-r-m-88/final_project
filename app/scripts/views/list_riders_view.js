(function () {

  App.Views.ListRiders = Parse.View.extend({

    tagName: 'ul',
    className: 'allRiders',

    events: {},

    template: _.template($('#listTemp').html()),

    initialize: function (options) {

      this.options = options;

      this.render();

      this.collection.off();
      this.collection.on('sync', this.render, this);

      // Get our Element On Our Page
      $('#riderList').html(this.$el);



    },

    render: function () {
      var self = this;

      // Empty out
      this.$el.empty();


        // Sort from our default comparator in our collection constructor

        this.collection.each(function (c) {

          var profilePhoto = c.get("picture");

          var imageURL = profilePhoto.url();
          
          $('.profilepic').src = imageURL;

          self.$el.append(self.template(c.toJSON()));
        });



      }


  });

}());
