import { useState } from 'react';
import Block from './Block';
import Table from './Table';
import getGeolocation from '../utils/geolocation';

const GeolocationBlock = () => {
  const [geolocationData, setGeolocationData] = useState();
  return (
    <Block>
      <h1>HTML5 Geolocation API</h1>
      {geolocationData ?
        <Table data={geolocationData} />
        :
        <button onClick={() => getGeolocation(setGeolocationData)}>Try It</button>}
      <p>
        <b>Explanation:</b> Date and language data can be used to identify your
        location. Changing the settings on your computer can prevent this.
      </p>
    </Block>
  );
};

export default GeolocationBlock;
