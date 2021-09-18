/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
export { getPrediction };

const getPrediction = (connectionData, workerData) => {
  let country, countryPercent, city, cityPercent, timezone, timezonePercent;
  if (connectionData.timezone === workerData.timeZone) {
    country = connectionData.country;
    countryPercent = connectionData.proxy ? 80 : 90;

    city = connectionData.city;
    cityPercent = connectionData.proxy ? 60 : 90;

    timezone = connectionData.timezone;
    timezonePercent = connectionData.proxy ? 80 : 90;
  } else {
    const countryObj = checkCountry(workerData);
    country = countryObj.value;
    countryPercent = countryObj.percent;

    city = connectionData.city;

    timezone = workerData.timeZone;
    timezonePercent = 70;
  }
  // checkTimezone(connectionData, workerData);
  const data = [
    {
      key: 'Country',
      value: country,
      percent: countryPercent,
    },
    {
      key: 'Closest city',
      value: city,
      percent: cityPercent,
    },
    {
      key: 'Time zone',
      value: timezone,
      percent: timezonePercent,
    },
  ];
  return data;
};

const ct = require('countries-and-timezones');
const cl = require('country-language');

const checkCountry = (workerData) => {
  const timezone = ct.getTimezone(workerData.timeZone);
  // console.log(timezone);

  let langArr = [];
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

  // console.log(langArr);

  workerData.languages.forEach((language) => {
    if (language.length > 2) {
      // console.log(language.slice(-2));
      langArr.push(language.slice(-2));
    }
  });

  // console.log(langArr);

  // console.log(timezone.countries);

  langArr = langArr.concat(timezone.countries);

  // console.log(langArr);

  const cnts = langArr.reduce((obj, val) => {
    // eslint-disable-next-line no-param-reassign
    obj[val] = (obj[val] || 0) + 1;
    return obj;
  }, {});

  // Use the keys of the object to get all the values of the array
  // and sort those keys by their counts
  const sorted = Object.keys(cnts).sort((a, b) => cnts[b] - cnts[a]);

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return {
    value: regionNames.of(sorted[0]),
    percent: langArr.filter((x) => x === sorted[0]).length * 14,
  };
};
