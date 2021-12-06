/* eslint-disable no-unused-vars */
export { getData, getWebWorker };

// Return object of system data
const getData = (type, value, workerData) => [
  // eslint-disable-next-line no-undef
  getInitialValue(initialData[type]),
  getDelayedValue(),
  getFrameValue(),
  getWorkerValue(workerData),
];

const getInitialValue = (value) => ({
  key: 'Initial',
  value,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const getDelayedValue = () => ({
  key: 'Delayed',
  value: Intl.DateTimeFormat().resolvedOptions().timeZone,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const getFrameValue = () => ({
  key: 'Frame',
  // eslint-disable-next-line no-undef
  value: frame.contentWindow.Intl.DateTimeFormat().resolvedOptions().timeZone,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const getWorkerValue = (workerValue) => ({
  key: 'Web Worker',
  value: workerValue,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const getWebWorker = () => {
  let w;
  if (typeof w === 'undefined') {
    w = new Worker('/LocateJS/worker.js');
  }
  return w;
};
