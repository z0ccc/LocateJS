/* eslint-disable no-unused-vars */
import './Blocks.css';
import { useState, useEffect } from 'react';
import DataContext from './Context';
import NoteBlock from './NoteBlock';
import PredictionBlock from './PredictionBlock';
import ConnectionBlock from './ConnectionBlock';
import DataBlock from './DataBlock';
import WebRTCBlock from './WebRTCBlock';
import TorBlock from './TorBlock';
import GeolocationBlock from './GeolocationBlock';
import { getWebWorker } from '../utils/system';
import { fetchAPI } from '../utils/connection';
import getWebRTC from '../utils/webRTC';
import delayedData from '../utils/data';

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
    if (window.Worker.length) {
      getWebWorker().onmessage = (event) => {
        setWorkerData(event.data);
      };
    } else {
      setWorkerData(true);
    }
    fetchAPI(setConnectionData);
  }, []);

  return (
    <>
      {connectionData && frameData && workerData && webRTCData ? (
        <DataContext.Provider value={{ delayedData, frameData, workerData, connectionData }}>
          <div className="centerBlockInner">
            {/* <PredictionBlock /> */}
            <WebRTCBlock data={webRTCData} />
            <TorBlock />
            <DataBlock
              title="Intl.DateTimeFormat().resolvedOptions().timeZone"
              type="timeZone"
            />
            <DataBlock
              title="Intl.DateTimeFormat().resolvedOptions().locale"
              type="locale"
            />
            <DataBlock
              title="navigator.language"
              type="language"
            />
            <DataBlock
              title="navigator.languages"
              type="languages"
            />

          </div>
          <div className="centerBlockInner">
            <NoteBlock />
            <ConnectionBlock />
            <DataBlock
              title="new Date().toString()"
              type="dateString"

            />
            <DataBlock
              title="new Date().toLocaleString()"
              type="dateLocale"
            />
            <DataBlock
              title="new Date().getTimezoneOffset()"
              type="timezoneOffset"
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
