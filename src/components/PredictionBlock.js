/* eslint-disable no-unused-vars */
import './PredictionBlock.css';
import { useState, useContext } from 'react';
import DataContext from './Context';
import Block from './Block';
import { getMap, getPrediction } from '../utils/predict';
import PredictionTableRow from './PredictionTableRow';

const PredictionBlock = () => {
  const { initialData, delayedData, frameData, workerData, connectionData, webRTCData, isTor } =
    useContext(DataContext);

  const prediction =
  getPrediction(initialData, delayedData, frameData, workerData, connectionData, webRTCData, isTor);
  // const [data, setData] = useState(getPrediction(connectionData, workerData));
  // const handleCheckBox = (e) => {
  //   setData(
  //     getPrediction(e.target.checked ? null : connectionData, workerData)
  //   );
  // };
  return (
    <Block>
      <h1>Location Prediction</h1>
      {/* <label htmlFor="systemOnly" className="checkBox">
        <input
          type="checkbox"
          id="systemOnly"
          name="systemOnly"
          onClick={(e) => handleCheckBox(e)}
        />
        Only use system data for prediction
      </label> */}
      <img
        className="mapImg"
        src={getMap(prediction)}
        alt="Map of location prediction"
      />
      <div className="tableWrap">
        <table>
          <tbody>
            <PredictionTableRow title="Country" value={prediction.country} percent={prediction.countryPercent} />
            <PredictionTableRow title="City" value={prediction.city} percent={prediction.cityPercent} />
          </tbody>
        </table>
      </div>
      <p>
        Accuracy of the location prediction is dependant on how much
        authentic info you&apos;re exposing. To learn about how to hide your location visit the{' '}
        <a
          className="link"
          target="_blank"
          rel="noreferrer"
          alt="Link to GitHub repo"
          href="https://github.com/z0ccc/LocateJS#locatejs"
        >
          GitHub repo
        </a>
        .
      </p>
    </Block>
  );
};

export default PredictionBlock;
