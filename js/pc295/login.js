/*
 * Editor client script for DB table userlist
 */
/*global $, pc295 */
pc295.login = ( function($) {
  var
    doLogin,
    doLogout,
    initModule;

  doLogin = function () {
    var
      userid,
      password,
      user;
    userid = $('#login .userid').val();
    if( '' === userid ) {
      return pc295.openDialog('ERRROE', 'Please enter userid');
    }
    password = $('#login .password').val();
    if( '' === password ) {
      return pc295.openDialog('ERROR', 'Please enter password');
    }

    $.ajax({
      url : '/pc295/wp-json/jwt-auth/v1/token',
      type: 'POST',
      dataType: 'json',
      data: {
        username : userid,
        password : password
      },
      timeout: 5000
    })
    .done( function( response ) {
      if (response.token) { // if token is returned
        user = {
          userid: userid,
          email: response.user_email,
          nice_name: response.user_nicename,
          display_name: response.user_display_name,
          token: response.token
        };
      } else {
        pc295.openDialog('ERROR', 'Failed to login.', 5000);
        return false;
      }
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      pc295.afterLogin( user );
      return true;
    })
    .fail( function( data, textStatus, errorThrown ) {
      pc295.openDialog('ERROR', textStatus );
      console.log( errorThrown.message );
    }); // END $.ajax
  };

  doLogout = function () {
    // pc295.Global.USER_ID = null;
    pc295.Global.USERID = null; // userid
    pc295.Global.USER_EMAIL = null; // email
    pc295.Global.USER_NICE_NAME = null; // nice_name
    pc295.Global.USER_DISPLAY_NAME = null; // nice_name
    pc295.Global.USER_TOKEN = null;
    $.ajax({
      url : 'php/logout.php',
      type: 'GET',
      timeout: 5000
    })
    .done( function( response ) {
      $('#content')
        .css('padding', '6px')
        .html( response );
      return true;
    })
    .fail( function( data, textStatus, errorThrown ) {
      pc295.openDialog('ERROR', textStatus );
      console.log( errorThrown.message );
    }); // END $.ajax
  };

  initModule = function() {
    // cf. http://stackoverflow.com/questions/11204406/mask-and-unmask-input-text-in-html
    var inp = document.querySelector( '#login .password' );

    $('#show_password').click( function (e) {
      if ( 'password' === inp.type ) {
        inp.type = 'text';
        $('#show_password').text('hide password');
      }
      else {
        inp.type = 'password';
        $('#show_password').text('show password');
      }
    });
    inp.addEventListener( 'focus', function(){ inp.type = 'text'; });
    inp.addEventListener( 'blur',  function(){ inp.type = 'password'; });

    $('#login .userid').on('keyup', function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        return doLogin();
      }
    });

    $('#login .password').on('keyup', function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        return doLogin();
      }
    });

    $('#login_button').on('click', function (event) {
      event.preventDefault();
      return doLogin();  
    });

    $('#logout_button').on('click', function (event) {
      return doLogout();
    });

    $('#login button').css('padding', '4px');
    $('#logout button').css('padding', '4px');
  };

  return {
    initModule    : initModule
  };
}(jQuery));