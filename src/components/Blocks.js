import { useState, useEffect } from 'react';
import NoteBlock from './NoteBlock';
import PredictionBlock from './PredictionBlock';
import ConnectionBlock from './ConnectionBlock';
import SystemDataBlock from './SystemDataBlock';
import { getWebWorker } from '../utils/system';
import { fetchAPI } from '../utils/connection';

const Blocks = () => {
  const [workerData, setWorkerData] = useState();
  const [connectionData, setConnectionData] = useState('');

  useEffect(() => {
    getWebWorker().onmessage = (event) => {
      setWorkerData(event.data);
      fetchAPI(setConnectionData);
    };
  }, []);

  return (
    <>
      {connectionData ? (
        <>
          <NoteBlock />
          <PredictionBlock
            workerData={workerData}
            connectionData={connectionData}
          />
          <SystemDataBlock workerData={workerData} />
          <ConnectionBlock
            workerData={workerData}
            connectionData={connectionData}
          />
        </>
      ) : (
        <div className="contentBlock">
          <center>Loading...</center>
        </div>
      )}
    </>
  );
};

export default Blocks;
