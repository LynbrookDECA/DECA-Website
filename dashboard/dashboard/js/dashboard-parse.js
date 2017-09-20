// // Parse.initialize("kScQXRCZFHxkzilbr6loKIKO2hxt7lcKom9DWKRD", "R0gxChWChXhekNDydkGcxGCLfZndbw3H6dQSUHgr");
// Parse.initialize("DECA_APPLICATION_ID");
// Parse.serverURL = 'https://54.212.246.50:1337/parse';

// var object = new Parse.Object("DECAdiamonds");
// alert (object);

// var currentUser = Parse.User.current();
// if (currentUser) {
// 		    // alert("you are logged in");
// 		    $(".bodyDisplay").css("display", "block");
// 		    $(".user-name").html(" "+currentUser.get("firstname")+ " " + currentUser.get("lastname") +" ");

// 		} else {
// 		    // alert("not logged in");
// 		    // window.location.href='../index.html';
// 		}

		$(window).resize(function() {

            // alert("hello")
            // if ($(window).width() > 1100)
            // {
            //     $(".nav-menu").css("display", "none");

            // }
            if (screen.width < 790)
            {
                // alert("hello");
                $(".navbar-brand").css("font-size", "200vw");
            }
        });

var globarUserID;
var globalEmail;
var globalFirst;
var globalLast;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // alert (user);
    $(".bodyDisplay").css("display", "block");
    var userId = user.uid;
    globarUserID = userId;
    globalEmail = user.email;
    // alert (userId);
    firebase.database().ref('/userData/' + userId).once('value').then(function(snapshot) {
    var first = snapshot.val().firstname;
    globalFirst = first;
    var last = snapshot.val().lastname;
    globalLast = last;
    $(".user-name").html(" "+first+ " " + last +" ");
        
        // default/global gathering
        var onlineUsers = new Gathering(firebase.database());
         
        // Join myself Anonymously (a random generated name)
        // onlineUsers.join();
        // Or join with a beautiful name
        onlineUsers.join(null, globalFirst + "_" + globalLast);
         
        // Attach a callback function to track updates
        // That function will be called (with the user count and array of users) every time user list updated
        onlineUsers.onUpdated(function(count, users) {
          if (first == "Tejasvi")
          {
            console.log('We have '+ count +' members online right now.');
            console.log('Here is the updated users list -');
            for(var i in users) {
                console.log(users[i] + '(id: '+ i + ')');
            }
          }
        });
      
    });




 var points = 0;
firebase.database().ref('/DECAdiamonds/' + userId).once('value').then(function(snapshot) {
   firebase.database().ref('/DECAdiamonds/' + 'jEZPFSqtThag80UEQB7Ig06HR823').once('value').then(function(snapshot2) {
                var meeting = snapshot2.val().currentMeeting;

                var phrase;

                if (meeting.includes("FM"))
                {
                  phrase = 'Friday Meeting';
                }
                else
                {
                  phrase = "Study Session"
                }
                // alert(meeting);

                phrase  = phrase + " (" + meeting.substring(3,5) + "/" + meeting.substring(5,7) + "/" + meeting.substring(7,9) + ")";
                // alert("hello");
                // alert (phrase);

                $("#date").html(phrase);

                snapshot.forEach(function(childSnapshot) {
    
              if (childSnapshot.key.includes("FM") || childSnapshot.key.includes("SS"))
              {
        // console.log(childSnapshot.key);
                points = points + childSnapshot.val();


                if (childSnapshot.key == meeting)
                {
                  $("#pointsbutton").fadeOut(1000);
                $("#pointspass").fadeOut(1000);
                $("#message").html("<em>Points have been successfully logged for this meeting!</em>");
                $("#message").css("font-size", 20);
                }
              }
    // console.log(points)
    
    
              });
                $("#decaDiamondPointDisplay").html("Your DECA Diamond Point Total: " + points);
                
              });
    
    


});




    


// console.log(user.email + " " + user.uid);

  // firebase.database().ref('DECAdiamonds/' + userId).set({
  //   hithisme: "this works lmao"
    
  // });

    



  // var newStoreRef = storesRef.push().hello;
  // storesRef.push("helfdasdfdsalo":5);
  // alert("worked"  );

  } else {
    // No user is signed in.
    window.location.href='../index.html';
  }
});




		$(".logout-button").click(function(){
	alert("working");

	firebase.auth().signOut().then(function() {
   location.reload();
    }, function(error) {
    alert ("logout unsuccessful");
  });

	// alert("Logged out");

	// window.location.href='../index.html';

});









		// var currentUser = Parse.User.current();
		// var username = currentUser.get("username");
  //           // alert(username);

  //           var points = 0;
  //           var query = new Parse.Query("DECAdiamonds"); 
  //           query.limit(1000);

  //           query.find( {
  //           	success: function listOfObjects(results) {
  //           		var decaDiamonds = null;
  //           // alert("Error");
  //           // console.log("Successfully retrieved " + results.length);
  //           // Do something with the returned Parse.Object values
  //           if ( results.length == 0 ) {

  //           } 
  //           for (var i = 0; i < results.length; i++) { 
  //           	var object = results[i];
  //           	console.log(object.id + ' - ' + object.get('column'));
  //           	if(object.get('username') == username) {
  //           		decaDiamonds = object;
  //               //alert(JSON.stringify(object));
  //               var str =  JSON.stringify(object);
  //               var jsonObj = $.parseJSON(str);

  //               for (var key in jsonObj) {
  //               	if(jsonObj.hasOwnProperty(key)) {
  //                       //alert( key + " " + jsonObj[key]);
  //                       if(key.indexOf("SS_") != -1) {
  //                       	if(jsonObj[key] != undefined) {
  //                       		points += jsonObj[key];
  //                       	}

  //                       } else if (key.indexOf("FM_") != -1) {
  //                       	if(jsonObj[key] != undefined) {
  //                       		points += jsonObj[key];
  //                       	}
  //                       }
  //                   }
  //               }
  //               // alert("Points:" + points);
  //               $("#decaDiamondPointDisplay").html("Your DECA Diamond Point Total: " + points);
  //               //Object.keys(jsonObj).forEach(function(key) {
  //               //    var value = jsonObj[key];
  //               //    alert(key + " "  + value);
  //               //});
  //               //JSON.parse(str, function(key, value) {
  //               //    alert(key + " "  +value);

  //               //});
  //               //for (key in Object.keys(str) ) {
  //               //    alert(key)
  //               //}
  //               //alert(String(decaDiamonds));
  //               //alert(decaDiamonds.toJSON());
  //               //alert(decaDiamonds.attributes);
  //               //for (key in Object.keys(decaDiamonds.toJSON()) ) {
  //               //    alert(key + object.get(key));
  //               //}

  //               // for(key in decaDiamonds.keys().toJSON()) 
  //               // {
  //               //     alert(key + object.get(key));
  //               // }
  //               break;
  //           }
  //       }
  //   }
  //      //  if (decaDiamonds == null) {
  //      //    var object = new Parse.Object("DECAdiamonds");
  //      //    object.set( 'username', username ) ;
  //      //    object.set( 'firstname', currentUser.get('firstname') ) ;
  //      //    object.set( 'lastname', currentUser.get('lastname') ) ;
  //      //    object.set( 'yearindeca', currentUser.get('yearindeca') ) ;
  //      //    object.set( 'FM_092316', 3 ) ;                                     // CHANGE THIS
  //      //    object.save(null, {
  //      //      success: function(object) {
  //      //          // alert("Saved new user");
  //      //          alert("Success logging points!");
  //      //      },
  //      //      error: function(object, error) {
  //      //          alert('error saving for new user:' + error.message);
  //      //      }
  //      //  });
  //      //             // alert("fail");
  //      //         } else {
  //      //          decaDiamonds.set('FM_092316', 3 ) ;                          // CHANGE THIS
  //      //          decaDiamonds.save(null, {
  //      //              success: function(object) {
  //      //                  // alert("Saved for existing user.");
  //      //                  alert("Success logging points!");
  //      //              },
  //      //              error: function(object, error) {
  //      //                  alert('Error saving for existing user:' + error.message);
  //      //              }
  //      //          });
  //      //      }


  //      //  },
  //      //  error: function (error) {
  //      //     alert("Error")
  //      // }

  //  });
    //         $('#pointspass').keypress(function (e) {                                       
    //         	if (e.which == 13) {
    //         		e.preventDefault();
    //         //do something   
    //     }
    // });
    //         $("#pointspass").keyup(function(event){
    //         	$("#pointsbutton").click();
    //         	if(event.keyCode == 13){
            		

    //         	}
    //         });


            $("#pointsbutton").click(function(){
              var thepass; 
              firebase.database().ref('/DECAdiamonds/' + 'jEZPFSqtThag80UEQB7Ig06HR823').once('value').then(function(snapshot) {
                thepass = snapshot.val().password;
                // alert(thepass);
                if ($('#pointspass').val() == thepass)
              {
                var rootRef = firebase.database().ref();
                var storesRef = rootRef.child('DECAdiamonds/'+ globarUserID);
                // alert(storesRef);
                // if (storesRef == null)
                // {
                //     alert("null");
                // }

                 firebase.database().ref('/DECAdiamonds/' + 'jEZPFSqtThag80UEQB7Ig06HR823').once('value').then(function(snapshot2) {
                    var meeting = snapshot2.val().currentMeeting;
                    storesRef.child(meeting).set(3);
              });

                
                alert("Success logging points!");
                // $("#pointsbutton").fadeOut(1000);
                // $("#pointspass").fadeOut(1000);
                // $("#message").html("<em>Points have been successfully logged for this meeting!</em>");
                // $("#message").css("font-size", 20);
                location.reload()

                
                

            }
            else
            {
                alert("incorrect pass");
                location.reload();
            }
            });
              // alert(thepass);
                                                     // CHANGE THIS
            // alert ($('#pointspass').val());
            
                        

            //FM_bucket
       

    });

        





            $("#pointsbutton2").click(function(){
            var thepass = 'supersecret';                             // CHANGE THIS
            // alert ($('#pointspass').val());
            if ($('#pointspass2').val() == thepass)
            {
              var orig = 0;
              firebase.database().ref('/DECAdiamonds/' + globarUserID).once('value').then(function(snapshot) {
              var first = snapshot.val().FM_bucket;
              console.log(first);
              // alert(first);
              if (first != null)
              {

                orig = first;
                // alert (orig);
              }

              var rootRef = firebase.database().ref();
                var storesRef = rootRef.child('DECAdiamonds/'+ globarUserID);
                // alert(storesRef);
                // if (storesRef == null)
                // {
                //     alert("null");
                // }

                orig = orig + 3;
                // alert (orig);
                storesRef.child('FM_bucket').set(orig);
                alert("Success logging points!");
                location.reload();
    
    
            });

            	  

               

            }
            else
            {
                alert("incorrect pass");
                location.reload();
            }

    }); // end of points button actions

            var isopen = false;
            $("#icon-bar1").click(function()
            {

            	if (isopen)
            	{
            		$(".nav-menu").css("display", "none");

            		isopen = !isopen;
            	}
            	else {
            		$(".nav-menu").css("display", "block");

            		isopen = !isopen;
            	}

            });

//Profile.html Java Script



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
    // var userId = firebase.auth().currentUser.uid;
    // firebase.database().ref('/userData/' + 'tejasvikothapalli@gmailcom').once('value').then(function(snapshot) {
    // var business = snapshot.val().businesscourse;
    // // alert(business);

    
    // console.log(user.email + " " + user.uid);
  } else {
    // No user is signed in.
    window.location.href='../index.html';
  }
});


$(".profile-name").html(currentUser.get("firstname") +" " + currentUser.get("lastname") +"'s Profile");

$("#firstname-profile").val(currentUser.get("firstname"));
$("#lastname-profile").val(currentUser.get("lastname"));
$("#cellphone-profile").val(currentUser.get("phone"));
$("#currentgrade-profile").val(currentUser.get("currentgrade"));
$("#yearindeca-profile").val(currentUser.get("yearindeca"));
$("#email-profile").val(currentUser.get("username"));
$("#tshirt-profile").val(currentUser.get("tshirtsize"));
$("#parentemail-profile").val(currentUser.get("parentemail"));



var urrentUser = Parse.User.current();
var username = urrentUser.get("username");
// alert(username);
 // alert($("#roleplayevent").val());

 var query1 = new Parse.Query(Parse.Object.extend("Events")); 
 query1.limit(1000);

 query1.find( {

 	success: function (results) {

 		var Events = null;
        // alert("hello" + results.length); 

        for (var i = 0; i < results.length; i++) { 
        	var object = results[i];
        	console.log(object.id + ' - ' + object.get('column'));
        	if(object.get('username') == username) {
        		Events = object;
        		break;
        	}
        }
        if (Events == null) {


        } else {
        	$("#roleplayevent").val(Events.get("roleplay"));
        	$("#writtenevent").val(Events.get("written"));
        	$("#roleplayPartner").val(Events.get("roleplayPartner"));
        	$("#writtenPartner1").val(Events.get("writtenPartner1"));
        	$("#writtenPartner2").val(Events.get("writtenPartner2"));
            // Events.get("roleplay")

            
        }


    },
    error: function (error) {
    	alert("Error" + " " + error.message);
    }

});



 $("#eventsSave").click(function(){ 

 	if($("option:selected", "select[name=roleplays]").hasClass('team')){
        //do something
        // alert("hello");
        if ($("#roleplayPartner").val() =='')
        {
            // alert("hello");
            $("#needPartner").css("display", "block");

            return;
        }
    }
    else if ($("#roleplayPartner").val().length > 0)
    {
    	$("#noPartner").css("display", "block");
    	return;
    }


    if ($("#writtenPartner1").val().length > 0 || $("#writtenPartner2").val().length >0)
    {
    	if(!$("option:selected", "select[name=writtens]").hasClass('team'))
    	{
            // alert("u stupid");
            $("#noWrittenPartner").css("display", "block");
            return;
        }
    }
// alert("hello");
var urrentUser = Parse.User.current();
var username = urrentUser.get("username");
// alert(username);
 // alert($("#roleplayevent").val());

 var query1 = new Parse.Query(Parse.Object.extend("Events")); 
 query1.limit(1000);

 query1.find( {

 	success: function (results) {

 		var Events = null;
        // alert("hello" + results.length); 

        for (var i = 0; i < results.length; i++) { 
        	var object = results[i];
        	console.log(object.id + ' - ' + object.get('column'));
        	if(object.get('username') == username) {
        		Events = object;
        		break;
        	}
        }
        if (Events == null) {

        	var object = new Parse.Object("Events");
        	object.set( 'username', username ) ;
        	object.set( 'firstname', currentUser.get('firstname') ) ;
        	object.set( 'lastname', currentUser.get('lastname') ) ;
        	object.set( 'yearindeca', currentUser.get('yearindeca') ) ;
            object.set('roleplay', $("#roleplayevent").val() ) ;                          // CHANGE THIS
            object.set('written', $("#writtenevent").val() ) ;   
            object.set('roleplayPartner', $("#roleplayPartner").val() ) ;
            object.set('writtenPartner1', $("#writtenPartner1").val() ) ;
            object.set('writtenPartner2', $("#writtenPartner2").val() ) ;
            object.save(null, {
            	success: function(object) {

                    // alert("Changing Events.");
                    location.reload();
                },
                error: function(object, error) {
                	alert('error saving for new user:' + error.message);
                }
            });
    // alert("fail");
} else {
            Events.set('roleplay', $("#roleplayevent").val() ) ;                          // CHANGE THIS
            Events.set('written', $("#writtenevent").val() ) ;   
            Events.set('roleplayPartner', $("#roleplayPartner").val() ) ;
            Events.set('writtenPartner1', $("#writtenPartner1").val() ) ;
            Events.set('writtenPartner2', $("#writtenPartner2").val() ) ;
            Events.save(null, {
            	success: function(object) {

                    // alert("Success logging points!");

                    location.reload();
                },
                error: function(object, error) {
                	alert('Error saving for existing user:' + error.message);
                }
            });
        }


    },
    error: function (error) {
    	alert("Error" + " " + error.message);
    }

});

});



$("#save").click(function(){                                        // THIS IS IT!!!
	
	var currentUser = Parse.User.current();
	//currentUser.set("firstname",$("#firstname-profile").val());
	//currentUser.set("email",$("#email-profile").val());
	//alert($("#email-profile").val());
	//currentUser.set("firstname",$("#firstname-profile").val());

	var firstname = $("#firstname-profile").val();
	var lastname = $("#lastname-profile").val();
	var cellphone = $("#cellphone-profile").val();
	var currentgrade = $("#currentgrade-profile").val();
	var yearindeca = $("#yearindeca-profile").val();
	var tshirtsize = $("#tshirt-profile").val();
	var parentemail = $("#parentemail-profile").val();
	// var email = $("#email-profile").val();

			// currentUser.setUsername("username", email);
			// currentUser.setEmail("email", email);

			currentUser.set("firstname", firstname);
			currentUser.set("lastname", lastname);
			
			currentUser.set("phone", cellphone);
			currentUser.set("currentgrade", currentgrade);
			currentUser.set("yearindeca", yearindeca);

			currentUser.set("tshirtsize", tshirtsize);
			currentUser.set("parentemail", parentemail);

			currentUser.save();
			alert("Profile Updated");



                    // CHANGE THIS
// alert ($('#pointspass').val());




});


function reset() {
	// alert("hello");
  // alert(globalEmail);
	var auth = firebase.auth();
var emailAddress = globalEmail;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  alert ("Password Reset sent successfully");
}, function(error) {
  // An error happened.
  // alert("didnt work");
});
}

// Contact.html javascript

$("#name").val(currentUser.get("firstname") + " " + currentUser.get("lastname"));
$("#email").val(currentUser.get("username"));



function harlem(){
	function c() {
		var e = document.createElement("link");
		e.setAttribute("type", "text/css");
		e.setAttribute("rel", "stylesheet");
		e.setAttribute("href", f);
		e.setAttribute("class", l);
		document.body.appendChild(e)
	}
	function h() {
		var e = document.getElementsByClassName(l);
		for (var t = 0; t < e.length; t++) {
			document.body.removeChild(e[t])
		}
	}
	function p() {
		var e = document.createElement("div");
		e.setAttribute("class", a);
		document.body.appendChild(e);
		setTimeout(function () {
			document.body.removeChild(e)
		}, 100)
	}
	function d(e) {
		return {
			height: e.offsetHeight,
			width: e.offsetWidth
		}
	}
	function v(i) {
		return true
	}
	function m(e) {
		var t = e;
		var n = 0;
		while ( !! t) {
			n += t.offsetTop;
			t = t.offsetParent
		}
		return n
	}
	function g() {
		var e = document.documentElement;
		if ( !! window.innerWidth) {
			return window.innerHeight
		} else if (e && !isNaN(e.clientHeight)) {
			return e.clientHeight
		}
		return 0
	}
	function y() {
		if (window.pageYOffset) {
			return window.pageYOffset
		}
		return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
	}
	function E(e) {
		var t = m(e);
		return t >= w && t <= b + w
	}
	function S() {
		var e = document.createElement("audio");
		e.setAttribute("class", l);
		e.src = i;
		e.loop = false;
		e.addEventListener("canplay", function () {
			setTimeout(function () {
				x(k)
			}, 500);
			setTimeout(function () {
				N();
				p();
				for (var e = 0; e < O.length; e++) {
					T(O[e])
				}
			}, 15500)
		}, true);
		e.addEventListener("ended", function () {
			N();
			h()
		}, true);
		e.innerHTML = " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
		document.body.appendChild(e);
		e.play()
	}
	function x(e) {
		e.className += " " + s + " " + o
	}
	function T(e) {
		e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)]
	}
	function N() {
		var e = document.getElementsByClassName(s);
		var t = new RegExp("\\b" + s + "\\b");
		for (var n = 0; n < e.length;) {
			e[n].className = e[n].className.replace(t, "")
		}
	}
	var e = 30;
	var t = 30;
	var n = 350;
	var r = 350;
	var i = "//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";
	var s = "mw-harlem_shake_me";
	var o = "im_first";
	var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
	var a = "mw-strobe_light";
	var f = "//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";
	var l = "mw_added_css";
	var b = g();
	var w = y();
	var C = document.getElementsByTagName("*");
	var k = null;
	for (var L = 0; L < C.length; L++) {
		var A = C[L];

		var s2 = d(A);

		if (s2.height > e && s2.height < n && s2.width > t && s2.width < r) {
			if (E(A)) {
				k = A;
				break
			}
		}
	}
	if (A === null) {
		console.warn("Could not find a node of the right size. Please try a different page.");
		return
	}
	c();
	S();
	var O = [];
	for (var L = 0; L < C.length; L++) {
		var A = C[L];
		if (v(A)) {
			O.push(A)
		}
	}
}


