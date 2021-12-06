import './Blocks.css';
import { useState, useEffect } from 'react';
import DataContext from './Context';
import NoteBlock from './NoteBlock';
import PredictionBlock from './PredictionBlock';
import ConnectionBlock from './ConnectionBlock';
import SystemDataBlock from './SystemDataBlock';
import DataBlock from './DataBlock';

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
          <DataBlock title="Intl.DateTimeFormat().resolvedOptions().timeZone" type="timeZone" value={Intl.DateTimeFormat().resolvedOptions().timeZone} workerData={workerData.timeZone} />
          <DataBlock title="Intl.DateTimeFormat().resolvedOptions().locale" type="locale" value={Intl.DateTimeFormat().resolvedOptions().locale} workerData={workerData.locale} />
          <DataBlock title="new Date().getTimezoneOffset()" type="timezoneOffset" value={new Date().getTimezoneOffset()} workerData={workerData.timezoneOffset} />
          <DataContext.Provider value={{ workerData, connectionData }}>
            <NoteBlock />
            <PredictionBlock />
            <SystemDataBlock />
            <ConnectionBlock />
          </DataContext.Provider>
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
