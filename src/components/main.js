export { fetchAPI, getConnection, getSystemData, checkWebWorker };

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

const getSystemData = () => [
  getLocale(),
  getTimezone(),
  getTimezoneOffset(),
  getDate(),
  getLanguage(),
  getLanguages(),
];

const getLocale = () => ({
  key: 'Locale',
  code: 'Intl.DateTimeFormat().resolvedOptions().locale',
  value: Intl.DateTimeFormat().resolvedOptions().locale,
  issues: [],
});

const getTimezone = () => ({
  key: 'Time zone',
  code: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
  value: Intl.DateTimeFormat().resolvedOptions().timeZone,
  issues: [],
});

const getTimezoneOffset = () => ({
  key: 'Time zone offset',
  code: 'new Date().getTimezoneOffset()',
  value: new Date().getTimezoneOffset(),
  issues: [],
  // issues: [
  //   checkNavigatorProperties('languages'),
  //   checkNavigatorValue('languages'),
  //   checkNavigatorPrototype('languages'),
  // ],
});

const getDate = () => ({
  key: 'Date',
  code: 'new Date().toString()',
  value: new Date().toString(),
  issues: [],
  // issues: [
  //   checkNavigatorProperties('languages'),
  //   checkNavigatorValue('languages'),
  //   checkNavigatorPrototype('languages'),
  // ],
});

const getLanguage = () => ({
  key: 'Language',
  code: 'navigator.language',
  value: navigator.language,
  issues: [
    checkNavigatorProperties('language'),
    checkNavigatorValue('language'),
    checkNavigatorPrototype('language'),
  ],
});

const getLanguages = () => ({
  key: 'Languages',
  code: 'navigator.languages',
  value: navigator.languages.join(', '),
  issues: [
    checkNavigatorProperties('languages'),
    checkNavigatorValue('languages'),
    checkNavigatorPrototype('languages'),
  ],
});

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

const checkWebWorker = () => {
  let w;
  if (typeof w === 'undefined') {
    w = new Worker('/worker.js');
  }

  w.onmessage = (event) => {
    console.log(event.data);
    // setWorkerData(event.data.toString());
  };
};
