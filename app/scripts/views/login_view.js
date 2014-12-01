(function(){

  App.Views.LoginView = Parse.View.extend({
    //classNAme???
    events: {
      'submit #login' : 'userLogin'
      //'click .js-btn' : 'userLogin'
    },
    initialize: function(){
      this.render();

      $('#riderList').html(this.$el);

    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#loginTemp').html());
    },

    userLogin: function(e) {
      e.preventDefault();

      var username = $('#username').val();
      var password = $('#password').val();


      Parse.User.logIn(username, password, {
        success: function (user) {
          App.user = user;
          App.router.navigate('', {trigger: true});
          $('#pattern').show();
          //$('#loginField').hide();
          console.log('were logged in');


        }
      });

    }

  });
}());