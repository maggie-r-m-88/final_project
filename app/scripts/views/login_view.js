(function(){

  App.Views.LoginView = Parse.View.extend({
    //classNAme???
    events: {
      'submit #login' : 'userLogin'
      //'click .js-btn' : 'userLogin'
    },
    initialize: function(){
      this.render();

      $('#homeSearch').html(this.$el);

    },

    render: function(){
      this.$el.empty();
      this.$el.html($('#loginTemp').html());
    },

    userLogin: function(e) {
      e.preventDefault();

      var username = $('#email').val();
      //var email = $('#email').val();
      var password = $('#password').val();


      Parse.User.logIn(username, password, {
        success: function (user) {
          App.user = user;
          App.router.navigate('', {trigger: true});
          $('#pattern').show();
          $('.topnavlinks').hide();
          $('#logOut').show();
          //$('#loginField').hide();
          console.log('were logged in');
        },
        error: function(user, error) {
       // //   // Show the error message somewhere and let the user try again.
          alert("Error: " + error.code + " " + error.message);
         }
      });

    }

  });
}());
