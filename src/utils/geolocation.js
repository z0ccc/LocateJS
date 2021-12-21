/* eslint-disable no-unused-vars */
const getGeolocation = (setGeolocationData) => {
  new Promise((showPosition, showError) => {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }).then((position) => setGeolocationData([
    getValue('Latitude', position.coords.latitude),
    getValue('Longitude', position.coords.longitude),
    getValue('accuracy', position.coords.accuracy),
    getValue('altitude', position.coords.altitude),
    getValue('altitudeAccuracy', position.coords.altitudeAccuracy),
    getValue('heading', position.coords.heading),
    getValue('speed', position.coords.speed),
    getValue('timestamp', position.timestamp),
  ]))
    .catch(setGeolocationData);
};

// setGeolocationData(navigator.geolocation.getCurrentPosition(showPosition, showError));
// return [
//   getLatitudeValue(position.coords.latitude),
// ];

const getValue = (key, value) => ({
  key,
  value,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

// const showPosition = (position) => {
//   console.log(`Latitude: ${position.coords.latitude}`);
//   console.log(`Longitude: ${position.coords.longitude}`);
//   console.log(`accuracy: ${position.coords.accuracy}`);
//   console.log(`altitude: ${position.coords.altitude}`);
//   console.log(`altitudeAccuracy: ${position.coords.altitudeAccuracy}`);
//   console.log(`heading: ${position.coords.heading}`);
//   console.log(`speed: ${position.coords.speed}`);
//   console.log(`timestamp: ${position.timestamp}`);
// };

// const showError = (error) => {
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       console.log('User denied the request for Geolocation.');
//       break;
//     case error.POSITION_UNAVAILABLE:
//       console.log('Location information is unavailable.');
//       break;
//     case error.TIMEOUT:
//       console.log('The request to get user location timed out.');
//       break;
//     case error.UNKNOWN_ERROR:
//       console.log('An unknown error occurred.');
//       break;
//     default:
//   }
// };

export default getGeolocation;
