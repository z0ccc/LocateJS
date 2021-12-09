/* eslint-disable no-unused-vars */
export { getData, getWebWorker, getFrameData };

// Return object of system data
const getData = (type, value, workerData) => [
  // eslint-disable-next-line no-undef
  getInitialValue(initialData[type]),
  getDelayedValue(value),
  // eslint-disable-next-line no-undef
  // getFrameValue(frameData[type]),
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

const getDelayedValue = (value) => ({
  key: 'Delayed',
  value,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const getFrameValue = (value) => ({
  key: 'Frame',
  // eslint-disable-next-line no-undef
  value,
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

const getFrameData = () => {
  let w;
  if (typeof w === 'undefined') {
    w = new Worker('/LocateJS/worker.js');
  }
  return w;
};
