/* eslint-disable no-unused-vars */
export { fetchAPI, getConnection, getSystemData, getWebWorker };

const fetchAPI = (setData) => {
  fetch('https://api.vytal.io/ip/')
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });
};

const getConnection = (connectionData, workerData) => {
  const timeZoneIssue = compareTimeZone(
    connectionData.timezone,
    workerData.timeZone
  );
  const data = [
    {
      key: 'IP address',
      value: connectionData.query,
      issues: [timeZoneIssue],
    },
    {
      key: 'Country',
      value: connectionData.country,
      issues: [timeZoneIssue],
    },
    {
      key: 'Region',
      value: connectionData.regionName,
      issues: [timeZoneIssue],
    },
    {
      key: 'City',
      value: connectionData.city,
      issues: [timeZoneIssue],
    },
    {
      key: 'Time zone',
      value: connectionData.timezone,
      issues: [timeZoneIssue],
    },
    {
      key: 'Zip code',
      value: connectionData.zip,
      issues: [timeZoneIssue],
    },
    {
      key: 'Latitude',
      value: connectionData.lat,
      issues: [timeZoneIssue],
    },
    {
      key: 'Longitude',
      value: connectionData.lon,
      issues: [timeZoneIssue],
    },
  ];
  return data;
};

const compareTimeZone = (connectionTimeZone, workerTimeZone) => {
  if (connectionTimeZone !== workerTimeZone) {
    return "Connection data doesn't match system data";
  }
  return null;
};

const getSystemData = (workerData) => [
  getTimezone(workerData.timeZone),
  getTimezoneOffset(workerData.timezoneOffset),
  getDate(workerData.date),
  getLocale(workerData.locale),
  getLanguage(workerData.language),
  getLanguages(workerData.languages),
];

const getLocale = (locale) => ({
  key: 'Locale',
  code: 'Intl.DateTimeFormat().resolvedOptions().locale',
  value: locale,
  issues: [
    checkWebWorker(Intl.DateTimeFormat().resolvedOptions().locale, locale),
  ],
});

const getTimezone = (timeZone) => ({
  key: 'Time zone',
  code: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
  value: timeZone,
  issues: [
    checkWebWorker(Intl.DateTimeFormat().resolvedOptions().timeZone, timeZone),
  ],
});

const getTimezoneOffset = (timezoneOffset) => ({
  key: 'Time zone offset',
  code: 'new Date().getTimezoneOffset()',
  value: timezoneOffset,
  issues: [checkWebWorker(new Date().getTimezoneOffset(), timezoneOffset)],
});

const getDate = (date) => ({
  key: 'Date',
  code: 'new Date().toString()',
  value: date,
  issues: [checkWebWorker(new Date().toString(), date), checkDatePrototype()],
});

const getLanguage = (language) => ({
  key: 'Language',
  code: 'navigator.language',
  value: language,
  issues: [
    checkWebWorker(navigator.language, language),
    checkNavigatorProperties('language'),
    checkNavigatorValue('language'),
    checkNavigatorPrototype('language'),
  ],
});

const getLanguages = (languages) => ({
  key: 'Languages',
  code: 'navigator.languages',
  value: languages.join(', '),
  issues: [
    checkWebWorker(navigator.languages, languages),
    checkNavigatorProperties('languages'),
    checkNavigatorValue('languages'),
    checkNavigatorPrototype('languages'),
  ],
});

const checkWebWorker = (original, value) => {
  if (original.toString() !== value.toString()) {
    return `Did not match web worker (${original})`;
  }
  return null;
};

const checkDatePrototype = () => {
  if (
    Date.prototype.setDate.toString() !== 'function setDate() { [native code] }'
  ) {
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

const getWebWorker = (setWorkerData) => {
  let w;
  if (typeof w === 'undefined') {
    w = new Worker('/worker.js');
  }
  return w;
};
