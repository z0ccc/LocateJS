import systemData from './systemData';
import getWorkerData from './workerData';
import detectTor from './detectTor';
import getWebRTCData from './webRtc';

getWorkerData().then((workerData) => {
  const data = {
    systemData: {
      dateLocale: {
        topWindow: {
          value: systemData.dateLocale.value,
          tampered: systemData.dateLocale.tampered,
        },
        webWorker: {
          value: workerData.dateLocale.value,
          tampered: workerData.dateLocale.tampered,
        },
      },
      dateString: {
        topWindow: {
          value: systemData.dateString.value,
          tampered: systemData.dateString.tampered,
        },
        webWorker: {
          value: workerData.dateString.value,
          tampered: workerData.dateString.tampered,
        },
      },
      language: {
        topWindow: {
          value: systemData.language.value,
          tampered: systemData.language.tampered,
        },
        webWorker: {
          value: workerData.language.value,
          tampered: workerData.language.tampered,
        },
      },
      languages: {
        topWindow: {
          value: systemData.languages.value,
          tampered: systemData.languages.tampered,
        },
        webWorker: {
          value: workerData.languages.value,
          tampered: workerData.languages.tampered,
        },
      },
      locale: {
        topWindow: {
          value: systemData.locale.value,
          tampered: systemData.locale.tampered,
        },
        webWorker: {
          value: workerData.locale.value,
          tampered: workerData.locale.tampered,
        },
      },
      timeZone: {
        topWindow: {
          value: systemData.timeZone.value,
          tampered: systemData.timeZone.tampered,
        },
        webWorker: {
          value: workerData.timeZone.value,
          tampered: workerData.timeZone.tampered,
        },
      },
      timezoneOffset: {
        topWindow: {
          value: systemData.timezoneOffset.value,
          tampered: systemData.timezoneOffset.tampered,
        },
        webWorker: {
          value: workerData.timezoneOffset.value,
          tampered: workerData.timezoneOffset.tampered,
        },
      },
    },
    tor: detectTor(),
  };

  console.log(data);
});

Promise.all([
  getWebRTCData(),
]).then((data) => {
 console.log(data);
})