import { useState } from 'react';
import Block from './Block';
import getGeolocation from '../utils/geolocation';
import TableRow from './TableRow2';

const GeolocationBlock = () => {
  const [geolocationData, setGeolocationData] = useState();
  const [buttonValue, setbuttonValue] = useState('Allow Geolocation API');
  return (
    <Block>
      <h1>HTML5 Geolocation API</h1>
      {geolocationData ? (
        <>
          {typeof geolocationData === 'string' ? (
            <div className="boxWrap">
              <div className="hash">{`${geolocationData}`}</div>
            </div>
          ) : (
            <>
              <p style={{ marginBottom: '10px' }}>
                This data is not included in location prediction
              </p>
              <div className="tableWrap">
                <table>
                  <tbody>
                    {geolocationData.map((item) => (
                      <TableRow
                        key={item.key}
                        title={item.key}
                        value={item.value}
                        issues={item.issues}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <input
          type="submit"
          onClick={() => {
            getGeolocation(setGeolocationData);
            setbuttonValue('Loading...');
          }}
          className="button"
          value={buttonValue}
        />
      )}
      <p>
        <b>Explanation:</b> Date and language data can be used to identify your
        location. Changing the settings on your computer can prevent this.
      </p>
    </Block>
  );
};

export default GeolocationBlock;
