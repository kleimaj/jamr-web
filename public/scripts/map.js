const default_coords = {lat: 37.791034, lng: -122.401605};
// 37.791034, -122.401605
// {lat: 37.78, lng: -122.44};
let users = [];
let markers = [];
let infoWindows = [];
let gFilter = [];
let iFilter = [];
map = new google.maps.Map(document.getElementById('map'), {
    center: default_coords,
    zoom: 12,
    disableDefaultUI: true,
    styles: [
        {
          featureType: 'poi.business',
          stylers: [{visibility: 'off'}]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{visibility: 'off'}]
        }
      ]
});
const icon = {
    url:'images/musician.png',
    scaledSize: new google.maps.Size(30, 30)
}
const iconOther = {
    url:'images/musicianOther.png',
    scaledSize: new google.maps.Size(30, 30)
}
// let userMarker = new google.maps.Marker({
//     position: default_coords, 
//     map: map,
//     icon: icon
// });
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
        <a href="/settings"><button class=viewButton>Edit</button> </a>
    </div>`
  });


const getProfiles = (position) => {
    document.querySelector('#status').innerHTML = '';
    const default_coords = {};
    default_coords.lat  = position.coords.latitude;
    default_coords.lng = position.coords.longitude;

    // default_coords.lat = latitude; 
    // default_coords.lng = longitude;
    let userMarker = new google.maps.Marker({
        position: default_coords, 
        map: map,
        icon: icon
    });
    // attachModals(userMarker,)
    userMarker.addListener('click', function() {
        map.setZoom(12);
        map.setCenter(userMarker.getPosition());
        infowindow.open(userMarker.get('map'), userMarker);
        if(infoWindows.length > 0){
            infoWindows[0].close();
            infoWindows.splice(0,1);
        }
        // infowindow.open(marker.get('map'), marker);
        infoWindows.push(infowindow);
      });

    document.querySelector('.radar').innerHTML = '';

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
    // console.log("Successfully retrieved profiles...");
    $('.filters').css('display','block'); 
    for (let user of json) {
        // console.log(user);
        if (user._id != id)
            users.push(user);
        // console.log(user.location);
        let lat = parseFloat(user.location[0]);
        let lng = parseFloat(user.location[1]);
        // console.log(lat,lng)
        let newMarker = new google.maps.Marker({
            position: {lat: lat, lng: lng}, 
            map: map,
            icon: iconOther
        });
        markers.push(newMarker);
        // visibleMarkers.push(newMarker);
        newMarker.addListener('click', function() {
            map.setZoom(12);
            map.setCenter(newMarker.getPosition());
          });
        attachModals(newMarker, user);
    }
    console.log(users);
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
            <button class=chatButton>Chat</button>
        </div>`
      });

      marker.addListener('click', function() {
        if (infoWindows.length > 0){
            console.log('here');
            infoWindows[0].close();
            infoWindows.splice(0,1);
        }
        infowindow.open(marker.get('map'), marker);
        infoWindows.push(infowindow);
      });
}
function makeMap() {
    $('.show').css('display','none');
    setTimeout(injectRadar,0);
    setTimeout(getLocation,3000);
}
function getLocation() {

    // injectRadar();
    const status = document.querySelector('#status');
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.innerHTML = 'Finding users… (can take a few seconds)';
      navigator.geolocation.getCurrentPosition(getProfiles, error);
    }
}

function error() {
    status.textContent = 'Unable to retrieve your location';
}
      
function injectRadar() {
    document.querySelector('.radar').insertAdjacentHTML("beforeend", radar);
}
function updateMap() {
    let iFilter = $('.instru_filter').val();
    let gFilter = $('.genre_filter').val();
    if (gFilter == '' && iFilter == '') {
        for (let i = 0; i < users.length; i++) {
            markers[i].setVisible(true);
        }
    }
    else if (iFilter == '') { // if there is no instrument filter
        for (let i = 0; i < users.length; i++) {
            // update only genres
            if (users[i].genres.includes(gFilter)){
                markers[i].setVisible(true);
            }
            else {
                markers[i].setVisible(false);
            }
        }
    }
    else if (gFilter == '') {
        for (let i = 0; i < users.length; i++) {
            if (users[i].instruments.includes(iFilter)){
                markers[i].setVisible(true);
            }
            else {
                markers[i].setVisible(false);
            }
        }
    }
    else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].instruments.includes(iFilter) && 
                users[i].genres.includes(gFilter)){
                markers[i].setVisible(true);
            }
            else {
                markers[i].setVisible(false);
            }
        }
    }
}
// getProfiles();
$('#map').css("display", "none");
$('.show').on('click', makeMap);
$('.instru_filter').on('change',updateMap);
$('.genre_filter').on('change',updateMap);

document.querySelector('.navbar-brand').innerHTML=`Welcome, ${thisArtist}`;
// .appendChild(`${radar}`);