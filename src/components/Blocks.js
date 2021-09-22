import { useState, useEffect } from 'react';
import NoteBlock from './NoteBlock';
import PredictionBlock from './PredictionBlock';
import ConnectionBlock from './ConnectionBlock';
import SystemDataBlock from './SystemDataBlock';
import { getWebWorker, fetchAPI } from './main';

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
          <ConnectionBlock
            workerData={workerData}
            connectionData={connectionData}
          />
          <SystemDataBlock workerData={workerData} />
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
