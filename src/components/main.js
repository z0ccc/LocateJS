export { fetchAPI, getConnection, getSystemData, getWebWorker };

const fetchAPI = (setData) => {
  fetch('https://api.vytal.io/ip/')
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });
};

const getConnection = (json) => {
  const data = [
    {
      key: 'IP address',
      value: json.query,
      issues: [],
    },
    {
      key: 'Country',
      value: json.country,
      issues: [],
    },
    {
      key: 'Region',
      value: json.regionName,
      issues: [],
    },
    {
      key: 'City',
      value: json.city,
      issues: [],
    },
    {
      key: 'Zip code',
      value: json.zip,
      issues: [],
    },
    {
      key: 'Latitude',
      value: json.lat,
      issues: [],
    },
    {
      key: 'Longitude',
      value: json.lon,
      issues: [],
    },
  ];
  return data;
};

const getSystemData = (workerData) => [
  getLocale(workerData.locale),
  getTimezone(workerData.timeZone),
  getTimezoneOffset(workerData.timezoneOffset),
  getDate(workerData.date),
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
  issues: [checkWebWorker(new Date().toString(), date)],
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

  w.onmessage = (event) => {
    setWorkerData(event.data);
  };
};
