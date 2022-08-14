import systemData from './systemData';
import getWorkerData from './workerData';
import detectTor from './detectTor';

getWorkerData().then((workerData) => {
  const data = {
    systemData: {
      dateLocale: {
        topWindow: systemData.dateLocale.value,
        webWorker: workerData.dateLocale.value,
      },
      dateString: {
        topWindow: systemData.dateString.value,
        webWorker: workerData.dateString.value,
      },
      language: {
        topWindow: systemData.language.value,
        webWorker: workerData.language.value,
      },
      languages: {
        topWindow: systemData.languages.value,
        webWorker: workerData.languages.value,
      },
      locale: {
        topWindow: systemData.locale.value,
        webWorker: workerData.locale.value,
      },
      timeZone: {
        topWindow: systemData.timeZone.value,
        webWorker: workerData.timeZone.value,
      },
      timezoneOffset: {
        topWindow: systemData.timezoneOffset.value,
        webWorker: workerData.timezoneOffset.value,
      },
    },
    torFingerprint: detectTor(),
  };

  console.log(data);
});
