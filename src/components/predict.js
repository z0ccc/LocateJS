export { getMap, getPrediction };

const getPrediction = (connectionData, workerData) => {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  let country, countryPercent, city, cityPercent;
  if (connectionData.timezone === workerData.timeZone) {
    country = connectionData.country;
    countryPercent = connectionData.proxy ? 80 : 90;

    city = connectionData.city;
    cityPercent = connectionData.proxy ? 60 : 90;
  } else {
    const countryObj = checkCountry(workerData);
    const cityObj = checkCity(workerData, countryObj.value);
    country = regionNames.of(countryObj.value);
    countryPercent = countryObj.percent;

    city = cityObj.value;
    cityPercent = cityObj.percent;
  }
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
  ];
  return data;
};

const ct = require('countries-and-timezones');
const cl = require('country-language');

const checkCountry = (workerData) => {
  const timezone = ct.getTimezone(workerData.timeZone);
  let langArr = [];

  workerData.languages.forEach((language) => {
    // loop thru system data languages
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

  workerData.languages.forEach((language) => {
    if (language.length > 2) {
      langArr.push(language.slice(-2));
    }
  });
  langArr = langArr.concat(timezone.countries);

  const cnts = langArr.reduce((obj, val) => {
    // eslint-disable-next-line no-param-reassign
    obj[val] = (obj[val] || 0) + 1;
    return obj;
  }, {});

  // Use the keys of the object to get all the values of the array
  // and sort those keys by their counts
  const sorted = Object.keys(cnts).sort((a, b) => cnts[b] - cnts[a]);
  return {
    value: sorted[0],
    percent: langArr.filter((x) => x === sorted[0]).length * 14,
  };
};

const checkCity = (workerData, country) => {
  const timezone = ct.getTimezone(workerData.timeZone);
  let city = 'N/A';
  let percent = 0;

  if (
    workerData.timeZone.includes('/') &&
    workerData.timeZone.match(/universal|GMT|UCT|UTC/g) === null &&
    !/\d/.test(workerData.timeZone)
  ) {
    if (timezone.countries.includes(country)) {
      city = workerData.timeZone.split('/');
      city = city[city.length - 1];
      percent = 30;
    }
  }
  return {
    value: city,
    percent,
  };
};

const getMap = () =>
  'https://maps.googleapis.com/maps/api/staticmap?center=oakville,canada&markers=color:red%7Clabel:%7C0,0&size=500x200&zoom=10&key=AIzaSyB-YN-X8PGBSPd7NOaQu4csVhgJUnF3ZGk';
