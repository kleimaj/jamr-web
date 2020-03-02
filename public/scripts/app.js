console.log('connected');

// Form errors.
// (function() {
//     'use strict';
//     window.addEventListener('load', function() {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation');
//       // Loop over them and prevent submission
//       var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener('submit', function(event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add('was-validated');
//         }, false);
//       });
//     }, false);
//   })();

// Ajax call.
$(".login").submit(function(event){
    event.preventDefault();
    console.log('Getting User data...');
    let userData = $("#validationTooltipUsername").val();
    console.log(userData);
    let passwordData = $("#exampleInputPassword1").val();
    console.log(passwordData);
    let body = JSON.stringify({username:`${userData}`, password:`${passwordData}`})
    console.log(body);
        //   Ajax
        $.ajax({
  
            // What kind of request
            method: "GET",
        
            // The URL for the request
            url: `/api/v1/users/${body}`,
            
            contentType: 'application/json',
            // The data to send aka query parameters
            data: body,
            // data: $("form").serialize(),
        
            // Code to run if the request succeeds;
            // the response is passed to the function
            success: onSuccessLogin,
        
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            error: onError
        });
});


// Signup
console.log('Sign up...');
$(".signup").submit(function(event){
  event.preventDefault();
  
  // On load, clear out form.

  // $('.artistName').empty();
  // $('#bio').empty();
  // $('.instru').empty();
  // $('.genre').empty();
  let userData = $("#validationTooltipUsername").val();
  console.log(userData);
  let passwordData = $("#exampleInputPassword1").val();
  console.log(passwordData);
  let body = JSON.stringify({username:`${userData}`, password:`${passwordData}`})
 console.log(body);

  

console.log('making ajax POST request');
//   Ajax
$.ajax({
  
    // What kind of request
    method: "POST",

    // The URL for the request
    url: '/api/v1/users',
    
    contentType: 'application/json',
    // The data to send aka query parameters
    data: body,
    // data: $("form").serialize(),

    // Code to run if the request succeeds;
    // the response is passed to the function
    success: onSuccessSignUp,

    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    error: onError
});

  
     
  });

 
function onSuccessSignUp(json) {
    console.log("Successfully registered user..."); 
    // console.log(json);
    localStorage.setItem('_id', json._id);
    window.location.pathname = '/createProfile';
    console.log(json);
};
function onSuccessLogin(json) {
    console.log("Successfully logged in user..."); 
    console.log(json);
    profile = json[0];
    localStorage.setItem('_id', profile._id);
    localStorage.setItem('artistName', profile.artistName);
    localStorage.setItem('instruments', profile.instruments);
    localStorage.setItem('genres', profile.genres);
    localStorage.setItem('bio', profile.bio);
    window.location.pathname = '/map';
};
    
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
};
