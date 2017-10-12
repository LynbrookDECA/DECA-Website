
$("#forgot-pass-button").click(function(){

  var email = $("#forgot-email").val();



  var auth = firebase.auth();

  // var emailAddress = "user@example.com";

  auth.sendPasswordResetEmail(email).then(function() {

  	
    $("#message").html("An email has been sent to your email address with instructions on how to change your password.");
    alert("Your reset password email should arrive in a couple of minutes.");
    $("#message").css("color", "green");
    $(".forgot-pass").css("text-align", "center");
    $("#forgot-email").css("display", "none");
    $("#forgot-pass-button").css("display", "none");
  	// Email sent.
	}).catch(function(error) {
	  // An error happened.
	  $("#message").html("This email is not registered with us. Please try again!");
   	  $("#message").css("color", "red");
      $("#forgot-email").val("");
      $(".forgot-pass").css("text-align", "center");
	});
});