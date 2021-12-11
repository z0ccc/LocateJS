const data = {
  locale: Intl.DateTimeFormat().resolvedOptions().locale,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  timezoneOffset: new Date().getTimezoneOffset(),
  dateString: new Date().toString(),
  dateLocale: new Date().toLocaleString(),
  language: navigator.language,
  languages: navigator.languages,
};

postMessage(data);
