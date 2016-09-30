$(function(){

  var $form = $('<form>').attr('method', 'POST');
  var username = 'username: <input type="text" name="username" value=""><br>';
  var password = 'password: <input type="password" name="password" value=""><br>';
  var submit = '<input type="submit" name="submit" value="Submit">';
  $form.html(username + password + submit);

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
