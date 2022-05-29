import google from '@google/maps';





export const getAddressLongAndLat = address => {
    const geocoder = new google.maps.Geocoder();

    return geocoder.geocode({ 'address': address }, (results, status) => {

        if (status === google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
        }

        console.log(latitude);
        console.log(longitude);

        const myLatLng = { lat: latitude, lng: longitude };

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


