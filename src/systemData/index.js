const systemData = {
  locale: {
    value: Intl.DateTimeFormat().resolvedOptions().locale,
  },
  timeZone: {
    value: Intl.DateTimeFormat().resolvedOptions().timeZone,
  },
  timezoneOffset: {
    value: new Date().getTimezoneOffset(),
  },
  dateString: {
    value: new Date().toString(),
  },
  dateLocale: {
    value: new Date().toLocaleString(),
  },
  language: {
    value: navigator.language,
  },
  languages: {
    value: navigator.languages,
  },
};

export default systemData;
