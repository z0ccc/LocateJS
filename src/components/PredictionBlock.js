/* eslint-disable no-unused-vars */
import './PredictionBlock.css';
import { useState, useContext } from 'react';
import DataContext from './Context';
import Block from './Block';
import PredictionTable from './PredictionTable';
import { getMap, getPrediction } from '../utils/predict';

const PredictionBlock = () => {
  const { initialData, delayedData, frameData, workerData, connectionData, webRTCData, isTor } =
    useContext(DataContext);
  getPrediction(initialData, delayedData, frameData, workerData, connectionData, webRTCData, isTor);
  // const [data, setData] = useState(getPrediction(connectionData, workerData));
  // const handleCheckBox = (e) => {
  //   setData(
  //     getPrediction(e.target.checked ? null : connectionData, workerData)
  //   );
  // };
  return (
    <Block>
      {/* <h1>Location Prediction</h1>
      <label htmlFor="systemOnly" className="checkBox">
        <input
          type="checkbox"
          id="systemOnly"
          name="systemOnly"
          onClick={(e) => handleCheckBox(e)}
        />
        Only use system data for prediction
      </label>
      <img
        className="mapImg"
        src={getMap(data)}
        alt="Map of current location"
      />
      <PredictionTable data={data} /> */}
      <p>
        <b>Explanation:</b> Your connection and system data can be combined and
        analyzed to reveal your location.
      </p>
    </Block>
  );
};

export default PredictionBlock;
