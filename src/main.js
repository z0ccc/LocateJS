import systemData from './systemData';
import getWorkerData from './workerData';
import detectTor from './detectTor';
import getWebRTCData from './webRtc';
import getHtmlGeolocation from './htmlGeolocation';

Promise.all([getWorkerData(), getWebRTCData(), getHtmlGeolocation()]).then(
  (promiseValues) => {
    const workerData = promiseValues[0];
    const webRtc = promiseValues[1];
    const htmlGeolocation = promiseValues[2];
    let data = {};
    Object.entries(systemData).forEach(([key]) => {
      data = {
        ...data,
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

    data = {
      ...data,
      webRtc,
      tor: detectTor(),
      htmlGeolocation,
    };
    console.log(data);
  }
);
