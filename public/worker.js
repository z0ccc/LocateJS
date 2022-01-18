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

const checkNavigatorPrototype = (key) => {
  try {
  // eslint-disable-next-line no-unused-vars
    const check = Navigator.prototype[key];
    return 'Failed Navigator.prototype';
  } catch (err) {
    return null;
  }
};

const getNavigatorValue = (type) =>
  [checkNavigatorProperties(type),
    checkNavigatorPrototype(type)];

const getIssues = {
  timeZone: [checkDatePrototype()],
  locale: [checkDatePrototype()],
  dateString: [checkDatePrototype()],
  dateLocale: [checkDatePrototype()],
  timezoneOffset: [checkDatePrototype()],
  language: getNavigatorValue('language'),
  languages: getNavigatorValue('languages'),
};

const data = {
  locale: Intl.DateTimeFormat().resolvedOptions().locale,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  timezoneOffset: new Date().getTimezoneOffset(),
  dateString: new Date().toString(),
  dateLocale: new Date().toLocaleString(),
  language: navigator.language,
  languages: navigator.languages,
  issues: getIssues
};

postMessage(data);
