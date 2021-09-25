export { getSystemData, getWebWorker };

// Return object of system data
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
    checkTimeZone(),
  ],
});

const getTimezoneOffset = (timezoneOffset) => ({
  key: 'Time zone offset',
  code: 'new Date().getTimezoneOffset()',
  value: timezoneOffset,
  issues: [
    checkWebWorker(new Date().getTimezoneOffset(), timezoneOffset),
    checkDatePrototype(),
    checkTimeZone(),
  ],
});

const getDate = (date) => ({
  key: 'Date',
  code: 'new Date().toString()',
  value: date,
  issues: [checkDatePrototype()],
});

const getLanguage = (language) => ({
  key: 'Main language',
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

const ct = require('countries-and-timezones');

const checkTimeZone = () => {
  const timezone = ct.getTimezone(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  if (
    timezone &&
    new Date().getTimezoneOffset() !== Math.abs(timezone.dstOffset)
  ) {
    return 'Time zone and time zone offset did not match';
  }
  return null;
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

const checkWebWorker = (original, value) => {
  if (original.toString() !== value.toString()) {
    return `Did not match web worker (${original})`;
  }
  return null;
};

const getWebWorker = () => {
  let w;
  if (typeof w === 'undefined') {
    w = new Worker('/LocateJS/worker.js');
  }
  return w;
};
