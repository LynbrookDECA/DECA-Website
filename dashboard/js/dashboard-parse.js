$(window).resize(function () {

    // alert("hello")
    // if ($(window).width() > 1100)
    // {
    //     $(".nav-menu").css("display", "none");

    // }
    if (screen.width < 790) {
        // alert("hello");
        $(".navbar-brand").css("font-size", "200vw");
    }
});

var globalUserID;
var globalEmail;
var globalFirst;
var globalLast;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $(".bodyDisplay").css("display", "block");
        globalUserID = user.uid;

        globalEmail = user.email;
        // alert (userId);
        firebase.database().ref('/userData/' + globalUserID).once('value').then(function (snapshot) {
            globalFirst = snapshot.val().firstname;
            globalLast = snapshot.val().lastname;

            $(".user-name").html(" " + globalFirst + " " + globalLast + " ");


            $("#firstname-profile").val(snapshot.val().firstname);
            $("#lastname-profile").val(snapshot.val().lastname);
            $("#cellphone-profile").val(snapshot.val().phone);
            $("#currentgrade-profile").val(snapshot.val().currentgrade);
            $("#yearindeca-profile").val(snapshot.val().yearindeca);
            $("#email-profile").val(snapshot.val().email);
            $("#tshirt-profile").val(snapshot.val().tshirtsize);
            $("#parentemail-profile").val(snapshot.val().parentemail);

            $("#roleplayevent").val(snapshot.val().roleplay.name);
            $("#writtenevent").val(snapshot.val().written.name);
            $("#roleplayPartner").val(snapshot.val().roleplay.teammate1);
            $("#writtenPartner1").val(snapshot.val().written.teammate1);
            $("#writtenPartner2").val(snapshot.val().written.teammate2);

        });


        var points = 0;
        firebase.database().ref('/DECAdiamonds/' + globalUserID).once('value').then(function (snapshot) {
            firebase.database().ref('/DECAdiamonds/' + 'jEZPFSqtThag80UEQB7Ig06HR823').once('value').then(function (snapshot2) {
                var meeting = snapshot2.val().currentMeeting;

                var phrase;

                if (meeting.includes("FM")) {
                    phrase = 'Friday Meeting';
                }
                else {
                    phrase = "Study Session"
                }
                // alert(meeting);

                phrase = phrase + " (" + meeting.substring(3, 5) + "/" + meeting.substring(5, 7) + "/" + meeting.substring(7, 9) + ")";
                // alert("hello");
                // alert (phrase);

                $("#date").html(phrase);

                snapshot.forEach(function (childSnapshot) {

                    if (childSnapshot.key.includes("FM") || childSnapshot.key.includes("SS")) {
                        // console.log(childSnapshot.key);
                        points = points + childSnapshot.val();


                        if (childSnapshot.key == meeting) {
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
        window.location.href = '../index.html';
    }
});



$("#save").click(function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var firstname = $("#firstname-profile").val();
            var lastname = $("#lastname-profile").val();
            var cellphone = $("#cellphone-profile").val();
            var currentgrade = $("#currentgrade-profile").val();
            var yearindeca = $("#yearindeca-profile").val();
            var tshirtsize = $("#tshirt-profile").val();
            var parentemail = $("#parentemail-profile").val();
            firebase.database().ref('userData/' + user.uid).update({
                firstname: firstname,
                lastname: lastname,
                phone: cellphone,
                currentgrade: currentgrade,
                tshirtsize: tshirtsize,
                yearindeca: yearindeca,
                parentemail: parentemail
            });
        }
    });

});

$(".logout-button").click(function () {
    alert("working");

    firebase.auth().signOut().then(function () {
        location.reload();
    }, function (error) {
        alert("logout unsuccessful");
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


$("#pointsbutton").click(function () {
    var thepass;
    firebase.database().ref('/DECAdiamonds/' + 'jEZPFSqtThag80UEQB7Ig06HR823').once('value').then(function (snapshot) {
        thepass = snapshot.val().password;
        // alert(thepass);
        if ($('#pointspass').val() == thepass) {
            var rootRef = firebase.database().ref();
            var storesRef = rootRef.child('DECAdiamonds/' + globalUserID);
            // alert(storesRef);
            // if (storesRef == null)
            // {
            //     alert("null");
            // }

            firebase.database().ref('/DECAdiamonds/' + 'jEZPFSqtThag80UEQB7Ig06HR823').once('value').then(function (snapshot2) {
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
        else {
            alert("incorrect pass");
            location.reload();
        }
    });
    // alert(thepass);
    // CHANGE THIS
    // alert ($('#pointspass').val());


    //FM_bucket


});


$("#pointsbutton2").click(function () {
    var thepass = 'supersecret';                             // CHANGE THIS
    // alert ($('#pointspass').val());
    if ($('#pointspass2').val() == thepass) {
        var orig = 0;
        firebase.database().ref('/DECAdiamonds/' + globalUserID).once('value').then(function (snapshot) {
            var first = snapshot.val().FM_bucket;
            console.log(first);
            // alert(first);
            if (first != null) {

                orig = first;
                // alert (orig);
            }

            var rootRef = firebase.database().ref();
            var storesRef = rootRef.child('DECAdiamonds/' + globalUserID);
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
    else {
        alert("incorrect pass");
        location.reload();
    }

}); // end of points button actions

var isopen = false;
$("#icon-bar1").click(function () {

    if (isopen) {
        $(".nav-menu").css("display", "none");

        isopen = !isopen;
    }
    else {
        $(".nav-menu").css("display", "block");

        isopen = !isopen;
    }

});

//Profile.html Java Script


$("#eventsSave").click(function () {
    console.log("is this working");
    if ($("option:selected", "select[name=roleplays]").hasClass('team')) {
        //do something
        // alert("hello");
        if ($("#roleplayPartner").val() == '') {
            // alert("hello");
            $("#needPartner").css("display", "block");

            return;
        }
    }
    else if ($("#roleplayPartner").val().length > 0) {
        $("#noPartner").css("display", "block");
        return;
    }

    if ($("#writtenPartner1").val().length > 0 || $("#writtenPartner2").val().length > 0) {
        if (!$("option:selected", "select[name=writtens]").hasClass('team')) {
            // alert("u stupid");
            $("#noWrittenPartner").css("display", "block");
            return;
        }
    }
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var roleplay = {'name':$("#roleplayevent").val(), 'teammate1':$("#roleplayPartner").val()};
            var written = {'name':$("#writtenevent").val(), 'teammate1':$("#writtenPartner1").val(), 'teammate2':$("#writtenPartner2").val()};

            firebase.database().ref('userData/' + user.uid).update({
                roleplay: roleplay,
                written: written
            });
        }
    });
    location.reload();

});


function reset() {
    // alert("hello");
    // alert(globalEmail);
    var auth = firebase.auth();
    var emailAddress = globalEmail;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        alert("Password Reset sent successfully");
    }, function (error) {
        // An error happened.
        // alert("didnt work");
    });
}

// Contact.html javascript

$("#name").val(currentUser.get("firstname") + " " + currentUser.get("lastname"));
$("#email").val(currentUser.get("username"));


function harlem() {
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
        while (!!t) {
            n += t.offsetTop;
            t = t.offsetParent
        }
        return n
    }

    function g() {
        var e = document.documentElement;
        if (!!window.innerWidth) {
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


