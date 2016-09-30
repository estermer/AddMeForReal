$(function(){

  var $form = $('<form>').attr('method', 'POST');
  var username = 'username: <input type="text" name="username" value=""><br>';
  var password = 'password: <input type="text" name="password" value=""><br>';
  $form.html(username + password);

  //Signup-button
  $('#signup').on('click', function(){
    $('#signup-login').html('');

    $form.attr('action', '/signup');

    $('#signup-login').append($form);

  });
  //Login-button
  $('#login').on('click', function(){
    $('#signup-login').html('');

      $form.attr('action', '/login');

    $('#signup-login').append($form);

  });


});
