import systemData from './systemData';
import getWorkerData from './workerData';
import detectTor from './detectTor';
import getWebRTCData from './webRtc';

Promise.all([getWorkerData(), getWebRTCData()]).then((promiseValues) => {
  const workerData = promiseValues[0];
  const webRtc = promiseValues[1];
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
  };
  console.log(data);
});
