import Block from './Block';
import PredictionTable from './PredictionTable';
import { getMap, getPrediction } from '../utils/predict';

const PredictionBlock = ({ workerData, connectionData }) => {
  const data = getPrediction(connectionData, workerData);

  return (
    <Block>
      <h1>Location Prediction</h1>
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
