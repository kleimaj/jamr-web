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
$(".signin").submit(function(event){
    console.log('creating ajax POST request');
    
    event.preventDefault();
    let userData = $("#validationTooltipUsername").val();
    console.log(userData);
    let passwordData = $("#exampleInputPassword1").val();
    console.log(passwordData);
    let body = JSON.stringify({username:`${userData}`, password:`${passwordData}`})
   console.log(body);
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
  
  // On load, Check form is empty.

  // $('.artistName').empty();
  // $('#bio').empty();
  // $('.instru').empty();
  // $('.genre').empty();
  
  
  console.log('Getting Profile data...');
  let artist = $('.artistName').val();
  console.log(artist);

  let bioData = $('#bio').val();
  console.log(bioData);

  let instrument = $('.instru').val();
  console.log(instrument);

  let genre = $('.genre').val();
  console.log(genre);

  let body = JSON.stringify({
      artistName:`${artist}`, 
      genres:`${genre}`,
      instruments:`${instrument}`,
      bio:`${bioData}` 
    });

//   Ajax
$.ajax({
  
    // What kind of request
    method: "POST",

    // The URL for the request
    url: '/api/v1/profile',
    
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
    window.location.pathname = '/createProfile'
    console.log(json);
};
function onSuccessLogin(json) {
    console.log("Successfully logged in user..."); 
    console.log(json);
};
    
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
};
