import systemData from './systemData';
import getServerData from './getServerData';
import getWorkerData from './workerData';
import detectTor from './detectTor';
import getWebRTCData from './webRtc';
import getHtmlGeolocation from './htmlGeolocation';

Promise.all([
  getServerData(),
  getWorkerData(),
  getWebRTCData(),
  getHtmlGeolocation(),
]).then((promiseValues) => {
  const serverData = promiseValues[0];
  const workerData = promiseValues[1];
  const webRtc = promiseValues[2];
  const htmlGeolocation = promiseValues[3];
  let clientData = {};
  Object.entries(systemData).forEach(([key]) => {
    clientData = {
      ...clientData,
      [key]: {
        topWindow: {
          value: systemData[key].value,
          tampered: systemData[key].tampered,
        },
        webWorker: {
          value: workerData[key].value,
          tampered: workerData[key].tampered,
        },
      },
    };
  });

  clientData = {
    serverData,
    systemData: { ...clientData },
    webRtc,
    tor: detectTor(),
    htmlGeolocation,
  };
  console.log(clientData);
});
