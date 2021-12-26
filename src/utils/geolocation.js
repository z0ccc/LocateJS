const getGeolocation = (setGeolocationData) => {
  new Promise((showPosition, showError) => {
    navigator.geolocation.getCurrentPosition(showPosition, showError, { enableHighAccuracy: true });
  }).then(async (position) => {
    const geocode = await getGeocode(position.coords.latitude, position.coords.longitude);
    setGeolocationData([
      getValue('Latitude', position.coords.latitude),
      getValue('Longitude', position.coords.longitude),
      getValue('Accuracy', position.coords.accuracy),
      getValue('Altitude', position.coords.altitude),
      getValue('Altitude Accuracy', position.coords.altitudeAccuracy),
      getValue('Heading', position.coords.heading),
      getValue('Speed', position.coords.speed),
      getValue('Reverse Geocoding', geocode),

    ]);
  })
    .catch((e) => setGeolocationData(e.message));
};

const getGeocode = (lat, long) => fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyByyRWGncal9iAq1-3Ek2WQ3ROLw9bCS-8`)
  .then((response) => response.json())
  .then((data) => data.results[0].formatted_address);

const getValue = (key, value) => ({
  key,
  value,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

export default getGeolocation;
