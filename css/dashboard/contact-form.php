<?php

$name=$_POST['name'];
$email=$_POST['email'];
$message=$_POST['message'];

$to="ravikumarkarthick@gmail.com";
$subject="Message From Members";
mail ($to,$subject,$message, "From: " . $name . "Email: " . $email);
echo "Your Message has been sent!";


?>