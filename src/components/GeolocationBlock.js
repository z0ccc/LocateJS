import Block from './Block';
// import Table from './Table';
import getGeolocation from '../utils/geolocation';

const GeolocationBlock = () => (
  <Block>
    <h1>HTML5 Geolocation API</h1>
    <button onClick={() => getGeolocation()}>Try It</button>
    {/* <Table data={data} /> */}
    <p>
      <b>Explanation:</b> Date and language data can be used to identify your
      location. Changing the settings on your computer can prevent this.
    </p>
  </Block>
);

export default GeolocationBlock;
