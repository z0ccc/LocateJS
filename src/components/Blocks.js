import './Blocks.css';
import { useState, useEffect } from 'react';
import DataContext from './Context';
import NoteBlock from './NoteBlock';
import PredictionBlock from './PredictionBlock';
import ConnectionBlock from './ConnectionBlock';
import SystemDataBlock from './SystemDataBlock';
import TimeZoneBlock from './TimeZoneBlock';

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
        <DataContext.Provider value={{ workerData, connectionData }}>
          <TimeZoneBlock />
          <NoteBlock />
          <PredictionBlock />
          <SystemDataBlock />
          <ConnectionBlock />
        </DataContext.Provider>
      ) : (
        <div className="contentBlock">
          <center>Loading...</center>
        </div>
      )}
    </>
  );
};

export default Blocks;
