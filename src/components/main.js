export { fetchAPI, getConnection, getSystemData };

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
    },
    {
      key: 'Country',
      value: json.country,
    },
    {
      key: 'Region',
      value: json.regionName,
    },
    {
      key: 'City',
      value: json.city,
    },
    {
      key: 'Zip code',
      value: json.zip,
    },
    {
      key: 'Latitude',
      value: json.lat,
    },
    {
      key: 'Longitude',
      value: json.lon,
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
  issues: [],
  // issues: [
  //   checkNavigatorProperties('language'),
  //   checkNavigatorValue('language'),
  //   checkNavigatorPrototype('language'),
  // ],
});

const getLanguages = () => ({
  key: 'Languages',
  code: 'navigator.languages',
  value: navigator.languages.join(', '),
  issues: [],
  // issues: [
  //   checkNavigatorProperties('languages'),
  //   checkNavigatorValue('languages'),
  //   checkNavigatorPrototype('languages'),
  // ],
});
