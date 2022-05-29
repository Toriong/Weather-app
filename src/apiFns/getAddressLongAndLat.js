import google from '@google/maps';

const API_key = 'AIzaSyBBczHI38aFR7P5tJ600SRxkh4DNQ5iqCo'
const otherAPI_key = 'AIzaSyDirtftOwQ0HFkJY5_KN4Gj1kuTakI7V4w'
const positionStackAPI_key = '04f67790145823ecccf869bcdf43342d'

// use this function when the user enters in an address on the search bar 

export const getAddressLongAndLat = address => {
    const geocoder = new google.maps.Geocoder();

    return geocoder.geocode({ 'address': address }, (results, status) => {
        console.log('results: ', results)
        if (status === google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
        };

        console.log(latitude);
        console.log(longitude);

        const myLatLng = { lat: latitude, lng: longitude };

        console.log('myLatLng: ', myLatLng)

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatLng
        });

        return new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });

    }).then(userLocation => userLocation)
}


