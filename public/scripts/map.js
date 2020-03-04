const default_coords = {lat: 37.791034, lng: -122.401605};
// 37.791034, -122.401605
// {lat: 37.78, lng: -122.44};
let myCoords = {};
let users = [];
let markers = [];
let infoWindows = [];
let gFilter = [];
let iFilter = [];
let dFilter = [];
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
            <h2>${thisArtist}</h2>
            <p>Loves ${thisGenre}</p>
            <p>Plays ${thisInstrument}</p>
            <a href="/profiles/${id}">View</a>
            <img src=../images/available.svg alt="online">
        </div>`
  });
function updatePosition(myCoords) {
    let body = JSON.stringify({location: [myCoords.lat, myCoords.lng]});
    $.ajax({
  
        // What kind of request
        method: "PUT",
    
        // The URL for the request
        url: `/api/v1/profile/${id}`,
        
        contentType: 'application/json',
        // The data to send aka query parameters
        data: body,
    
        // Code to run if the request succeeds;
        // the response is passed to the function
        success: updateSuccess,
    
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        error: onError
    });
}
function updateSuccess(json) {
    console.log('Updated Location in Mongo');
}
function getProfiles(position) {
    console.log('here');
    document.querySelector('#status').innerHTML = '';
    const default_coords = {};
    default_coords.lat  = position.coords.latitude;
    default_coords.lng = position.coords.longitude;
    myCoords = default_coords;
    updatePosition(myCoords);
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
        if (user._id != id) {
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
    }
    console.log(users);
    // localStorage.setItem('_id', json._id);
}
function onError(xhr, status, errorThrown) {
    alert("Sorry, there was a problem!");
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
}

function attachModals(marker, userObject) {

    console.log(userObject);
    let infowindow = new google.maps.InfoWindow({
        content: 
        `<div class=viewContainer>
            <h2>${userObject.artistName}</h2>
            <p>Loves ${userObject.genres}</p>
            <p>Plays ${userObject.instruments}</p>
            <a href="profiles/${userObject._id}">View</a>
            <img src=../images/unavailable.svg alt="online">
        </div>`
        // <div style='width:100px;height:150px;'>
        ,
        maxWidth: 400
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
    setTimeout(getLocation,0000); // 3000
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
    let dFilter = $('#distance').val()
    $('#distance_result').html(dFilter+' Miles');

    markers.forEach((marker) => marker.setVisible(true));

    hidden = users.filter(function(user,i) {
        // check instrument
        if (iFilter)
            if (!users[i].instruments.includes(iFilter))
                return true;
        if (gFilter)
            if (!users[i].genres.includes(gFilter))
                return true;
        if ((getDistanceBetweenPoints(myCoords.lat,myCoords.lng, users[i].location[0],users[i].location[1])) > dFilter) {
            return true;
        }
    });
    console.log(hidden);
    hidden.forEach((user) => markers[users.indexOf(user)].setVisible(false));
    // dFilter is indices to keep
    // if (gFilter == '' && iFilter == '') {
    //     for (let i = 0; i < users.length; i++) {
    //         markers[i].setVisible(true);
    //     }
    // }
    // else if (iFilter == '') { // if there is no instrument filter
    //     for (let i = 0; i < users.length; i++) {
    //         // update only genres
    //         if (users[i].genres.includes(gFilter)){
    //             markers[i].setVisible(true);
    //         }
    //         else {
    //             markers[i].setVisible(false);
    //         }
    //     }
    // }
    // else if (gFilter == '') {
    //     for (let i = 0; i < users.length; i++) {
    //         if (users[i].instruments.includes(iFilter)){
    //             markers[i].setVisible(true);
    //         }
    //         else {
    //             markers[i].setVisible(false);
    //         }
    //     }
    // }
    // else {
    //     for (let i = 0; i < users.length; i++) {
    //         if (users[i].instruments.includes(iFilter) && 
    //             users[i].genres.includes(gFilter)){
    //             markers[i].setVisible(true);
    //         }
    //         else {
    //             markers[i].setVisible(false);
    //         }
    //     }
    // }
}

function degreesToRadians(degrees){
    return degrees * Math.PI / 180;
}
function getDistanceBetweenPoints(lat1, lng1, lat2, lng2){
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = degreesToRadians(lat2 - lat1);
    let dLong = degreesToRadians(lng2 - lng1);
    let a = Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2) 
            +
            Math.cos(degreesToRadians(lat1)) 
            * 
            Math.cos(degreesToRadians(lat1)) 
            *
            Math.sin(dLong / 2) 
            * 
            Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance/1609.344;
}
function updateDistance() {
    let newVal = $('#distance').val()
    $('#distance_result').html(newVal+' Miles');
    dFilter = [];
    for (let i = 0; i < users.length; i++) {
        let miles = getDistanceBetweenPoints(myCoords.lat,myCoords.lng, users[i].location[0],users[i].location[1])/1609.344;
        // console.log(meters/1609.344,"miles");
        if (miles < newVal) {
            // markers[i].setVisible(false);
            dFilter.push(i);
        }
    }
    updateMap();
}
// getProfiles();
$('#map').css("display", "none");
$('.show').on('click', makeMap());
$('.instru_filter').on('change',updateMap);
$('.genre_filter').on('change',updateMap);
$('#distance').on('change',updateMap);
document.querySelector('.navbar-brand').innerHTML=`Welcome, ${thisArtist}`;
// .appendChild(`${radar}`);