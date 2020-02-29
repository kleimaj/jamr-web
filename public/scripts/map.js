console.log('Spice of Life');
const default_coords = {lat: 37.78, lng: -122.44};
map = new google.maps.Map(document.getElementById('map'), {
    center: default_coords,
    zoom: 12
});
const icon = {
    // url:'images/earthquake.png',
    scaledSize: new google.maps.Size(20, 20)
}
let userMarker = new google.maps.Marker({
    position: default_coords, 
    map: map,
    icon: icon
});
userMarker.addListener('click', function() {
    map.setZoom(15);
    map.setCenter(userMarker.getPosition());
  });

const getProfiles = () => {
    $.ajax({
  
        // What kind of request
        method: "GET",
    
        // The URL for the request
        url: `/api/v1/profiles/`,
        
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
    console.log("Successfully retrieved profiles..."); 
    console.log(json);
    // localStorage.setItem('_id', json._id);
};
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
};
getProfiles();