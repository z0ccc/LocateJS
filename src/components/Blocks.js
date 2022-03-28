/* eslint-disable no-unused-vars */
import './Blocks.css';
import { useState, useEffect } from 'react';
import DataContext from './Context';
import PredictionBlock from './PredictionBlock';
import ConnectionBlock from './ConnectionBlock';
import DataBlock from './DataBlock';
import WebRTCBlock from './WebRTCBlock';
import TorBlock from './TorBlock';
import GeolocationBlock from './GeolocationBlock';
import { fetchAPI } from '../utils/connection';
import getWebRTC from '../utils/webRTC';
import delayedData from '../utils/data';

const getWebWorker = () => {
  let w;
  if (typeof w === 'undefined') {
    w = new Worker('/worker.js');
  }
  return w;
};

const detectTor = (setIsTor) => {
  if (window.chrome) {
    setIsTor('False');
  } else {
    const css = document.createElement('link');
    css.href = 'resource://torbutton-assets/aboutTor.css';
    css.type = 'text/css';
    css.rel = 'stylesheet';
    document.head.appendChild(css);
    css.onload = () => {
      setIsTor('True');
    };
    css.onerror = () => {
      setIsTor('False');
    };
    document.head.removeChild(css);
  }
};

const Blocks = () => {
  const [workerData, setWorkerData] = useState();
  const [frameData, setFrameData] = useState();
  const [connectionData, setConnectionData] = useState('');
  const [webRTCData, setWebRTCData] = useState();
  const [isTor, setIsTor] = useState();
  // eslint-disable-next-line no-undef
  const initialData = initialDataObj;

  useEffect(() => {
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    frame.style.display = 'none';
    frame.src = '/frame.html';
    const receiveMessage = (event) => setFrameData(event.data);
    window.addEventListener('message', receiveMessage, false);

    fetchAPI(setConnectionData);

    getWebRTC(setWebRTCData);

    if (window.Worker.length) {
      getWebWorker().onmessage = (event) => {
        setWorkerData(event.data);
      };
    } else {
      setWorkerData(true);
    }

    detectTor(setIsTor);
  }, []);

  return (
    <>
      {connectionData && frameData && workerData && webRTCData && isTor ? (
        <DataContext.Provider
          value={{
            initialData, delayedData, frameData, workerData, connectionData, webRTCData, isTor
          }}
        >
          <div className="centerBlockInner">
            <PredictionBlock />
            <WebRTCBlock data={webRTCData} />
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
            <TorBlock isTor={isTor} />
            <GeolocationBlock />
          </div>
          <div className="centerBlockMobile">
            <PredictionBlock />
            <ConnectionBlock />
            <WebRTCBlock data={webRTCData} />
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
            <TorBlock isTor={isTor} />
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
