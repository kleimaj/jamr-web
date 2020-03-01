console.log('Spice of Life');
const default_coords = {lat: 37.791034, lng: -122.401605};
// 37.791034, -122.401605
// {lat: 37.78, lng: -122.44};
let infoWindows = [];
map = new google.maps.Map(document.getElementById('map'), {
    center: default_coords,
    zoom: 12
});
const icon = {
    url:'images/musician.png',
    scaledSize: new google.maps.Size(30, 30)
}
const iconOther = {
    url:'images/musicianOther.png',
    scaledSize: new google.maps.Size(30, 30)
}
let userMarker = new google.maps.Marker({
    position: default_coords, 
    map: map,
    icon: icon
});
let id = localStorage.getItem('_id');
let thisArtist = localStorage.getItem('artistName');
let thisInstrument = localStorage.getItem('instruments');
let thisGenre = localStorage.getItem('genres');
let thisBio = localStorage.getItem('bio');
let infowindow = new google.maps.InfoWindow({
    content: 
    `<div class=viewContainer>
        <h4>${thisArtist}</h4>
        <p>${thisInstrument}</p>
        <p>${thisGenre}</p>
        <button class=viewButton>View</button>
    </div>`
  });
userMarker.addListener('click', function() {
    map.setZoom(12);
    map.setCenter(userMarker.getPosition());
    infowindow.open(userMarker.get('map'), userMarker);
  });

const getProfiles = () => {
$('#map').css("display", "block");
$('.prompt').css("display","none");

    $.ajax({
  
        // What kind of request
        method: "GET",
    
        // The URL for the request
        url: `/api/v1/profile/`,
        
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
    // console.log(json);
    for (let user of json) {
        // console.log(user.location);
        let lat = parseFloat(user.location[0]);
        let lng = parseFloat(user.location[1]);
        // console.log(lat,lng)
        let newMarker = new google.maps.Marker({
            position: {lat: lat, lng: lng}, 
            map: map,
            icon: iconOther
        });
        newMarker.addListener('click', function() {
            map.setZoom(12);
            map.setCenter(newMarker.getPosition());
          });
        attachModals(newMarker, user);
    }
    // localStorage.setItem('_id', json._id);
};
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
};

function attachModals(marker, userObject) {

    console.log(userObject);
    let infowindow = new google.maps.InfoWindow({
        content: 
        `<div class=viewContainer>
            <h4>${userObject.artistName}</h4>
            <p>${userObject.instruments}</p>
            <p>${userObject.genres}</p>
            <button class=viewButton>View</button>
        </div>`
      });

      marker.addListener('click', function() {
        if(infoWindows.length > 0){
            console.log('here');
            infoWindows[0].close();
            infoWindows.splice(0,1);
        }
        infowindow.open(marker.get('map'), marker);
        infoWindows.push(infowindow);
      });
}
// getProfiles();
$('#map').css("display", "none");
$('.show').on('click', getProfiles);