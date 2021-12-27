/* eslint-disable no-unused-vars */
import './Blocks.css';
import { useState, useEffect } from 'react';
import DataContext from './Context';
import NoteBlock from './NoteBlock';
import PredictionBlock from './PredictionBlock';
import ConnectionBlock from './ConnectionBlock';
import DataBlock from './DataBlock';
import WebRTCBlock from './WebRTCBlock';
import GeolocationBlock from './GeolocationBlock';
import { getWebWorker } from '../utils/system';
import { fetchAPI } from '../utils/connection';
import getWebRTC from '../utils/webRTC';

const Blocks = () => {
  const [workerData, setWorkerData] = useState();
  const [frameData, setFrameData] = useState();
  const [connectionData, setConnectionData] = useState('');
  const [webRTCData, setWebRTCData] = useState();

  useEffect(() => {
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    frame.style.display = 'none';
    frame.src = '/LocateJS/frame.html';
    const receiveMessage = (event) => setFrameData(event.data);
    window.addEventListener('message', receiveMessage, false);
    getWebRTC(setWebRTCData);
    getWebWorker().onmessage = (event) => {
      setWorkerData(event.data);
      fetchAPI(setConnectionData);
    };
  }, []);

  return (
    <>
      {connectionData && frameData && workerData && webRTCData ? (
        <DataContext.Provider value={{ workerData, connectionData }}>

          <div className="centerBlockInner">
            <PredictionBlock />
            <WebRTCBlock data={webRTCData} />
            <DataBlock
              title="Intl.DateTimeFormat().resolvedOptions().timeZone"
              type="timeZone"
              value={Intl.DateTimeFormat().resolvedOptions().timeZone}
              frameData={frameData.timeZone}
              workerData={workerData.timeZone}
            />
            <DataBlock
              title="Intl.DateTimeFormat().resolvedOptions().locale"
              type="locale"
              value={Intl.DateTimeFormat().resolvedOptions().locale}
              frameData={frameData.locale}
              workerData={workerData.locale}
            />
            <DataBlock
              title="navigator.language"
              type="language"
              value={navigator.language}
              frameData={frameData.language}
              workerData={workerData.language}
            />
            <DataBlock
              title="navigator.languages"
              type="languages"
              value={navigator.languages}
              frameData={frameData.languages}
              workerData={workerData.languages}
            />

          </div>
          <div className="centerBlockInner">
            <NoteBlock />
            <ConnectionBlock />
            <DataBlock
              title="new Date().toString()"
              type="dateString"
              value={new Date().toString()}
              frameData={frameData.dateString}
              workerData={workerData.dateString}
            />
            <DataBlock
              title="new Date().toLocaleString()"
              type="dateLocale"
              value={new Date().toLocaleString()}
              frameData={frameData.dateLocale}
              workerData={workerData.dateLocale}
            />
            <DataBlock
              title="new Date().getTimezoneOffset()"
              type="timezoneOffset"
              value={new Date().getTimezoneOffset()}
              frameData={frameData.timezoneOffset}
              workerData={workerData.timezoneOffset}
            />
            <GeolocationBlock />

          </div>
        </DataContext.Provider>

      ) : (
        <div className="contentBlock loadBlock">
          <center>Loading...</center>
        </div>
      )}
    </>
  );
};

export default Blocks;
