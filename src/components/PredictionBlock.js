import Block from './Block';
import PredictionTable from './PredictionTable';
import { getMap, getPrediction } from './predict';

const PredictionBlock = ({ workerData, connectionData }) => (
  <Block>
    <h1>Location Prediction</h1>
    <img src={getMap()} alt="Map of current location" />
    <PredictionTable data={getPrediction(connectionData, workerData)} />
    <p>
      <b>Explanation:</b> Your IP address reveals information about your
      connection. Using a VPN or Tor will hide your connection info.
    </p>
  </Block>
);

export default PredictionBlock;
