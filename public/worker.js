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

// const checkNavigatorValue = (key) => {
//   if (
//     Object.getOwnPropertyDescriptor(Navigator.prototype, key).value !==
//   undefined
//   ) {
//     return 'Failed descriptor.value undefined';
//   }
//   return null;
// };

const checkNavigatorPrototype = (key) => {
  try {
  // eslint-disable-next-line no-unused-vars
    const check = Navigator.prototype[key];
    return 'Failed Navigator.prototype';
  } catch (err) {
    return null;
  }
};

const getIssues = {
  language: [checkNavigatorProperties('language'),
    // checkNavigatorValue('language'),
    checkNavigatorPrototype('language')],
  languages: [checkNavigatorProperties('languages'),
    // checkNavigatorValue('languages'),
    checkNavigatorPrototype('languages')],
  date: [checkDatePrototype()]
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
