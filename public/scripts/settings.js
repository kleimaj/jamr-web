let id = localStorage.getItem('_id');
let thisArtist = localStorage.getItem('artistName');
let thisInstrument = localStorage.getItem('instruments');
let thisGenre = localStorage.getItem('genres');
let thisBio = localStorage.getItem('bio');

function setDefaultInputs () {
    if (thisArtist != undefined)
        $('.artistName')[0].value=thisArtist;
    if (thisBio != undefined)
        $('.bio')[0].value=thisBio;
    let genreOptions = $('.genre').children('option');
    console.log(thisGenre);
    for (let i = 0; i < genreOptions.length; i++) {
        console.log(genreOptions[i].textContent);
        if (genreOptions[i].textContent.toLowerCase()===thisGenre) {
            console.log(genreOptions[i].textContent)
            genreOptions[i].selected=true;
            break;
        }
    }
    let instrOptions = $('.instru').children('option');
    for (let i = 0; i < instrOptions.length; i++) {
        if (instrOptions[i].textContent.toLowerCase()===thisInstrument) {
            // console.log(instrOptions[i].textContent)
            instrOptions[i].selected=true;
            break;
        }
    }
}

$(".update").submit(function(event){
    event.preventDefault();
    // console.log('save');
    //   Ajax
    // id = "5e5af74d746d0ca6fe861ec9"
    let body = {
        // _id: id,
        artistName: $('.artistName').val(),
        bio: $('.bio').val(),
        instruments: $('.instru').val(),
        genres: $('.genre').val(),
        
    };
    console.log(body);
    localStorage.setItem('artistName', body.artistName);
    localStorage.setItem('instruments', body.instruments);
    localStorage.setItem('genres', body.genres);
    localStorage.setItem('bio', body.bio);
    body = JSON.stringify(body);
    $.ajax({
  
        // What kind of request
        method: "PUT",
    
        // The URL for the request
        url: `/api/v1/profile/${id}`,
        
        contentType: 'application/json',
        // The data to send aka query parameters
        data: body,
        // data: $("form").serialize(),
    
        // Code to run if the request succeeds;
        // the response is passed to the function
        success: onSuccessUpdate,
    
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: onError
    });
});

function onSuccessUpdate(json) {
    console.log('success');
    console.log(json);
}
function onSuccessDelete(json) {
    console.log('successfully deleted profile');
    console.log(json);
    window.location.pathname = '/';
}
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
};
function deleteProfile(event) {
    // id = "5e5af74d746d0ca6fe861ec9";
    $.ajax({
  
        // What kind of request
        method: "DELETE",
    
        // The URL for the request
        url: `/api/v1/profile/${id}`,
        
        contentType: 'application/json',
    
        // Code to run if the request succeeds;
        // the response is passed to the function
        success: onSuccessDelete,
    
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: onError
    });

}
setDefaultInputs();
$('.delete').on('click',deleteProfile);