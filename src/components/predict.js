/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
export { getPrediction };

const getPrediction = (connectionData, workerData) => {
  // console.log(connectionData);
  checkTimezone(connectionData, workerData);
  const data = [
    {
      key: 'Country',
      value: connectionData.country,
      percentage: '',
    },
    // {
    //   key: 'Region',
    //   value: connectionData.regionName,
    //   percentage: '',
    // },
    {
      key: 'Closest city',
      value: connectionData.city,
      percentage: '',
    },
    {
      key: 'Time zone',
      value: connectionData.timezone,
      percentage: '',
    },
  ];
  return data;
};

const checkTimezone = (connectionData, workerData) => {
  if (connectionData.timezone === workerData.timeZone) {
    // console.log('true');
  }
  checkCountry(workerData);
};

const ct = require('countries-and-timezones');
const cl = require('country-language');

const checkCountry = (workerData) => {
  const timezone = ct.getTimezone(workerData.timeZone);
  const langArr = [];
  workerData.languages.forEach((language) => {
    cl.getLanguageCountries(language.slice(0, 2), (err, languages) => {
      if (err) {
        console.log(err);
      } else {
        languages.forEach((languageCodes) => {
          langArr.push(languageCodes.code_2);
        });
      }
    });
  });

  console.log(langArr);

  const duplicates = langArr.filter(
    (val) => timezone.countries.indexOf(val) !== -1
  );

  console.log(duplicates);

  const uniq = [...new Set(duplicates)];

  console.log(uniq);
  // let countries = [];
  // uniq.forEach((code) => {
  // let country = new Intl.DisplayNames(['en'], { type: 'region' });

  // if (timezone.countries[0]) {
  //   // console.log('lol');
  // }
};
