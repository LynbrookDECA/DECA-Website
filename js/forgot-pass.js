// Parse.initialize("DECA_APPLICATION_ID");
// Parse.serverURL = 'https://54.212.246.50:1337/parse';
// alert ("hello");


$("#forgot-pass-button").click(function(){

	var email = $("#forgot-email").val();
  alert(email);


  var auth = firebase.auth();
  alert (email);
  // var emailAddress = "user@example.com";

  auth.sendPasswordResetEmail(email).then(function() {
    alert (email);
    $("#message").html("An email has been sent to your email address with instructions on how to change your password.");

    $("#message").css("color", "green");
    $(".forgot-pass").css("text-align", "center");
    $("#forgot-email").css("display", "none");
    $("#forgot-pass-button").css("display", "none");
  // Email sent.
  }, function(error) {
    alert (email);
  // An error happened.

  $("#message").html("This email is not registered with us. Please try again!");
    $("#message").css("color", "red");
    $("#forgot-email").val("");
    $(".forgot-pass").css("text-align", "center");
  });

// 	Parse.User.requestPasswordReset(email, {
//   success: function() {
//   	$("#message").html("An email has been sent to your email address with instructions on how to change your password.");

//   	$("#message").css("color", "green");
//   	$(".forgot-pass").css("text-align", "center");
//   	$("#forgot-email").css("display", "none");
//   	$("#forgot-pass-button").css("display", "none");
//   },
//   error: function(error) {
//     // Show the error message somewhere
//     $("#message").html("This email is not registered with us. Please try again!");
//   	$("#message").css("color", "red");
//     $("#forgot-email").val("");
//   	$(".forgot-pass").css("text-align", "center");

//   }
// });
});