let thisArtist = localStorage.getItem('artistName');
let uid = window.location.href.split('/')[4];

function getProfile() {

    $.ajax({
  
        // What kind of request
        method: "GET",
    
        // The URL for the request
        url: `/api/v1/profile/${uid}`,
        
        contentType: 'application/json',
        // The data to send aka query parameters
        // data: $("form").serialize(),
    
        // Code to run if the request succeeds;
        // the response is passed to the function
        success: onSuccess,
    
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: onError
    });
}

function onSuccess(json) {
    user = json[0];
    console.log(user);
    $('.artistName').html(user.artistName);
    $('.bio').html(user.bio);
    for (genre of user.genres) {
        $('.genre').append(`<li>${genre}</li>`);
    }
    for (instr of user.instruments) {
        $('.instru').append(`<li>${instr}</li>`);
    }

    //get comments
    $.ajax({
  
        // What kind of request
        method: "GET",
    
        // The URL for the request
        url: `/api/v1/profile/${uid}/comments`,
        
        contentType: 'application/json',
        // The data to send aka query parameters
        // data: $("form").serialize(),
    
        // Code to run if the request succeeds;
        // the response is passed to the function
        success: receivedComments,
    
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: onError
    });
}
function receivedComments(json) {
    // console.log(json);
    for (comment of json) {
        $('.comments').append(`
    <div class=comment>
        <h3>${comment.from}</h3>
        <p>${comment.body}</p>
    </div>`)
    }
}
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}

function commentCallback() {
    $('.comments').append(`
    <div class=comment>
        <h3>${thisArtist}</h3>
        <p>${$('input').val()}</p>
    </div>`)
    $(".input").val("");
}
function postComment(event) {
    event.preventDefault();
    let comment = {
        to: uid,
        from: thisArtist,
        body: $('input').val()
    }
    if ($('input').val()) {
        $.ajax({
  
            // What kind of request
            method: "POST",
        
            // The URL for the request
            url: `/api/v1/profile/${uid}/comments`,
            
            contentType: 'application/json',
            // The data to send aka query parameters
            data: JSON.stringify(comment),
        
            // Code to run if the request succeeds;
            // the response is passed to the function
            success: commentCallback,
        
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            error: onError
        });
    }
}
$('form').on('submit',postComment);
getProfile();
