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
import { getMapUrl, getPrediction } from '../utils/predict';

const getWebWorker = () => {
  let w;
  if (typeof w === 'undefined') {
    w = new Worker('/worker.js');
  }
  return w;
};

async function askServiceWorker() {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/sw.js');
    const messageChannel = new MessageChannel();
    return new Promise(resolve => {
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      }
    });
    navigator.serviceWorker.controller.postMessage({message: 'ask'}, [messageChannel.port1]);
  }
}

// breaks safari
// const detectTor = (setIsTor) => {
//   if (window.chrome) {
//     setIsTor('False');
//   } else {
//     const css = document.createElement('link');
//     css.href = 'resource://torbutton-assets/aboutTor.css';
//     css.type = 'text/css';
//     css.rel = 'stylesheet';
//     document.head.appendChild(css);
//     css.onload = () => {
//       setIsTor('True');
//     };
//     css.onerror = () => {
//       setIsTor('False');
//     };
//     document.head.removeChild(css);
//   }
// };

const detectTor = () => {
  const date = new Date();
  if (
    navigator.plugins.length === 0 &&
    date.getTimezoneOffset() === 0 &&
    window.outerWidth === window.screen.availWidth &&
    window.outerHeight === window.screen.availHeight
  ) {
    return true;
  }
  return false;
};

const Blocks = () => {
  const [serviceWorkerData, setServiceWorkerData] = useState();
  const [workerData, setWorkerData] = useState();
  const [frameData, setFrameData] = useState();
  const [connectionData, setConnectionData] = useState('');
  const [webRTCData, setWebRTCData] = useState();
  const [prediction, setPrediction] = useState();
  const [mapUrl, setMapUrl] = useState();

  // eslint-disable-next-line no-undef
  const initialData = initialDataObj;

  const isTor = detectTor();

  useEffect(async () => {
    const serviceWorkerData = await askServiceWorker();
    setServiceWorkerData(serviceWorkerData);
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    frame.style.display = 'none';
    frame.src = '/frame.html';
    const receiveMessage = (event) => {
      if (event.data.type === 'frameData') {
        setFrameData(event.data.data);
      }
    };
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
  }, []);

  useEffect(() => {
    if (connectionData && frameData && workerData && webRTCData, serviceWorkerData) {
      setPrediction(
        getPrediction(
          initialData, delayedData, frameData, workerData, connectionData, webRTCData, isTor, serviceWorkerData
        )
      );
    }
  }, [connectionData, frameData, workerData, webRTCData, serviceWorkerData]);

  useEffect(() => {
    if (prediction) {
      setMapUrl(getMapUrl(prediction));
    }
  }, [prediction]);

  return (
    <>
      {mapUrl ? (
        <DataContext.Provider
          value={{
            initialData,
            delayedData,
            frameData,
            workerData,
            connectionData,
            webRTCData,
            prediction,
            mapUrl,
            serviceWorkerData
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
