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
    checkNavigatorPrototype(type)].filter(Boolean);

const data = {
  locale: {
    value: Intl.DateTimeFormat().resolvedOptions().locale,
    issues: [checkIntlPrototype(), checkIntlConstructor()].filter(Boolean)
  },
  timeZone: {
    value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    issues: [checkIntlPrototype(), checkIntlConstructor()].filter(Boolean)
  },
  timezoneOffset: {
    value: new Date().getTimezoneOffset(),
    issues: [checkDatePrototype()].filter(Boolean),
  },
  dateString: {
    value: new Date().toString(),
    issues: [checkDatePrototype()].filter(Boolean)
  },
  dateLocale: {
    value: new Date().toLocaleString(),
    issues: [checkDatePrototype()].filter(Boolean),
  },
  language: {
    value: navigator.language,
    issues: getNavigatorValue('language'),
  },
  languages: {
    value: navigator.languages,
    issues: getNavigatorValue('languages'),
  },
};

self.addEventListener('message', event => {
  event.ports[0].postMessage(data);
});
