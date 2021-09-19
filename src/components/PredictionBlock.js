import Block from './Block';
import PredictionTable from './PredictionTable';
import { getMap, getPrediction } from './predict';

const PredictionBlock = ({ workerData, connectionData }) => {
  const data = getPrediction(connectionData, workerData);

  return (
    <Block>
      <h1>Location Prediction</h1>
      <img src={getMap(data)} alt="Map of current location" />
      <PredictionTable data={data} />
      <p>
        <b>Explanation:</b> Your IP address reveals information about your
        connection. Using a VPN or Tor will hide your connection info.
      </p>
    </Block>
  );
};

export default PredictionBlock;
