const getGeolocation = () => {
  if (navigator.geolocation) {
    const position = navigator.geolocation.getCurrentPosition(showPosition, showError);
    return [
      getLatitudeValue(position.coords.latitude),
    ];
  }
  return ('Geolocation is not supported by this browser.');
};

const getLatitudeValue = (value) => ({
  key: 'Latitude',
  value,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const showPosition = (position) => {
  console.log(`Latitude: ${position.coords.latitude}`);
  console.log(`Longitude: ${position.coords.longitude}`);
  console.log(`accuracy: ${position.coords.accuracy}`);
  console.log(`altitude: ${position.coords.altitude}`);
  console.log(`altitudeAccuracy: ${position.coords.altitudeAccuracy}`);
  console.log(`heading: ${position.coords.heading}`);
  console.log(`speed: ${position.coords.speed}`);
  console.log(`timestamp: ${position.timestamp}`);
};

const showError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      console.log('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      console.log('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      console.log('An unknown error occurred.');
      break;
    default:
  }
};

export default getGeolocation;
