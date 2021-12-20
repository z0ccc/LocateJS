import Block from './Block';
// import Table from './Table';

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
};

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

const GeolocationBlock = () => (
  <Block>
    <h1>HTML5 Geolocation API</h1>
    <button onClick={() => getLocation()}>Try It</button>
    {/* <Table data={data} /> */}
    <p>
      <b>Explanation:</b> Date and language data can be used to identify your
      location. Changing the settings on your computer can prevent this.
    </p>
  </Block>
);

export default GeolocationBlock;
