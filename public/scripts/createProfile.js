let id = localStorage.getItem('_id');
console.log(id);

$("form").submit(function(event){
    event.preventDefault();
    console.log('Getting Profile data...');
    let artist = $('.artistName').val();
    console.log(artist);
  
    // let bioData = $('#bio').val();
    // console.log(bioData);
    // instruments: $('.instru').dropdown('get value', thisInstrument),
        // genres: $('.genre').dropdown('get value', thisGenre),
  
    let instrument = $('.instru').dropdown('get value');
    console.log(instrument);
  
    let genre = $('.genre').dropdown('get value');
    console.log(genre);

    let bio = $('.bio').val();
    console.log(bio);

    localStorage.setItem('artistName', artist);
    localStorage.setItem('instruments', instrument);
    localStorage.setItem('genres', genre);
    localStorage.setItem('bio', bio);
  
    let body = JSON.stringify({
        _id: `${id}`,
        artistName:`${artist}`, 
        genres:`${genre}`,
        instruments:`${instrument}`,
        bio:`${bio}` ,
        UserRef: `${localStorage.getItem('_id')}`
      });
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
             success: onSuccessProfileCreation,
         
             // Code to run if the request fails; the raw request and
             // status codes are passed to the function
             error: onError
         });
});

function onSuccessProfileCreation(json) {
    console.log("Successfully created Profile..."); 
    console.log(json);
    window.location.pathname = '/map';
    // localStorage.setItem('_id', json._id);
    // window.location.pathname = '/createProfile';
    // console.log(json);
};

function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
};

$('.genre').dropdown('set selected', ['']);
$('.instru').dropdown('set selected',['']);