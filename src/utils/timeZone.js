export { getTimeZoneData, getWebWorker };

// Return object of system data
const getTimeZoneData = (workerData) => [
  getInitialValue(),
  getDelayedValue(),
  getFrameValue(),
  getWorkerValue(workerData.timeZone),
];

const getInitialValue = () => ({
  key: 'Initial',
  code: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
  // eslint-disable-next-line no-undef
  value: initialData.timeZone,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const getDelayedValue = () => ({
  key: 'Delayed',
  code: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
  value: Intl.DateTimeFormat().resolvedOptions().timeZone,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const getFrameValue = () => ({
  key: 'Frame',
  code: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
  // eslint-disable-next-line no-undef
  value: frame.contentWindow.Intl.DateTimeFormat().resolvedOptions().timeZone,
  issues: [
    // checkWebWorker(initialData.timeZone, workerValue),
    // checkTimeZone(),
  ],
});

const getWorkerValue = (workerValue) => ({
  key: 'Web Worker',
  code: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
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
