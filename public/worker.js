const checkDatePrototype = () => {
  if (!Date.prototype.setDate.toString().includes('[native code]')) {
    return 'Failed Date.prototype.setDate.toString()';
  }
  return null;
};

const checkIntlConstructor = () => {
  if (!Object.getPrototypeOf(Intl.DateTimeFormat.prototype).constructor.toString().includes('Object')) {
    return 'Failed Object.getPrototypeOf(Intl.DateTimeFormat.prototype).constructor.toString()';
  }
  return null;
};

const checkIntlPrototype = () => {
  if (!Intl.DateTimeFormat.prototype.resolvedOptions.toString().includes('[native code]')) {
    return 'Failed Intl.DateTimeFormat.prototype.resolvedOptions.toString()';
  }
  return null;
};

const checkNavigatorProperties = (key) => {
  if (Object.getOwnPropertyDescriptor(navigator, key) !== undefined) {
    return 'Failed Object.getOwnPropertyDescriptor(navigator, key)';
  }
  return null;
};

const checkNavigatorPrototype = (key) => {
  try {
  // eslint-disable-next-line no-unused-vars
    const check = Navigator.prototype[key];
    return 'Failed Navigator.prototype[key]';
  } catch (err) {
    return null;
  }
};

const getNavigatorValue = (type) =>
  [checkNavigatorProperties(type),
    checkNavigatorPrototype(type)];

const getIssues = {
  timeZone: [checkIntlPrototype(), checkIntlConstructor()],
  locale: [checkIntlPrototype(), checkIntlConstructor()],
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
