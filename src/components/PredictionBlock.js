import Block from './Block';
import PredictionTable from './PredictionTable';
import { getMap, getPrediction } from '../utils/predict';

const PredictionBlock = ({ workerData, connectionData }) => {
  const data = getPrediction(connectionData, workerData);
  // const systemData = getPrediction(connectionData, workerData);

  return (
    <Block>
      <h1>Location Prediction</h1>
      <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
      <label htmlFor="vehicle1">Only predict using system data</label>
      <br />
      <br />
      <img src={getMap(data)} alt="Map of current location" />
      <PredictionTable data={data} />
      <p>
        <b>Explanation:</b> Your connection and system data can be combined and
        analyzed to reveal your location.
      </p>
    </Block>
  );
};

export default PredictionBlock;
