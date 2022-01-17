/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
export { getData, getWebWorker };

// Return object of system data
const getData = (type, value, frameData, workerData) =>
  [
    // eslint-disable-next-line no-undef
    getDataObj('Initial', initialData[type], []),
    getDataObj('Delayed', value, getIssues(type)),
    getDataObj('Frame', frameData[type], type.includes('language') ? frameData.issues[type] : frameData.issues.date),
    getDataObj('Web worker', workerData[type], []),
  ];

const getDataObj = (key, value, issues) => ({
  key,
  value,
  issues,
});

const getWebWorker = () => {
  let w;
  if (typeof w === 'undefined') {
    w = new Worker('/LocateJS/worker.js');
  }

  return w;
};

const getIssues = (type) => {
  if (type.includes('language')) {
    return [checkNavigatorProperties(type),
      checkNavigatorValue(type),
      checkNavigatorPrototype(type)
    ];
  }
  return [checkDatePrototype()];
};

const checkDatePrototype = () => {
  if (!Date.prototype.setDate.toString().includes('[native code]')) {
    return 'Failed Date.prototype.setDate.toString()';
  }
  return null;
};

const checkNavigatorProperties = (key) => {
  if (Object.getOwnPropertyDescriptor(navigator, key) !== undefined) {
    return 'Failed undefined properties';
  }
  return null;
};

const checkNavigatorValue = (key) => {
  if (
    Object.getOwnPropertyDescriptor(Navigator.prototype, key).value !==
  undefined
  ) {
    return 'Failed descriptor.value undefined';
  }
  return null;
};

const checkNavigatorPrototype = (key) => {
  try {
  // eslint-disable-next-line no-unused-vars
    const check = Navigator.prototype[key];
    return 'Failed Navigator.prototype';
  } catch (err) {
    return null;
  }
};
