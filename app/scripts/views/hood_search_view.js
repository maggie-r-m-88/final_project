(function(){

  App.Views.HoodSearchView = Parse.View.extend({
    //classNAme???
    events: {

    },

    initialize: function(){
      this.render();

      $('#riderList').html(this.$el);

    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#homeTemp').html());
    }




  });
}());
