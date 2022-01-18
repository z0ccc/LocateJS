const checkDatePrototype = () => {
  if (!Date.prototype.setDate.toString().includes('[native code]')) {
    return 'Failed Date.prototype.setDate.toString()';
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

const getNavigatorValue = (type) =>
  [checkNavigatorProperties(type),
    checkNavigatorValue(type),
    checkNavigatorPrototype(type)];

const getIssues = {
  timeZone: [checkIntlPrototype()],
  locale: [checkIntlPrototype()],
  dateString: [checkDatePrototype()],
  dateLocale: [checkDatePrototype()],
  timezoneOffset: [checkDatePrototype()],
  language: getNavigatorValue('language'),
  languages: getNavigatorValue('languages'),
};

const delayedData = {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  locale: Intl.DateTimeFormat().resolvedOptions().locale,
  dateString: new Date().toString(),
  dateLocale: new Date().toLocaleString(),
  timezoneOffset: new Date().getTimezoneOffset(),
  language: navigator.language,
  languages: navigator.languages,
  issues: getIssues
};

export default delayedData;
