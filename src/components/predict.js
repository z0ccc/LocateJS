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

  if (timezone) langArr = langArr.concat(timezone.countries);

  // loop thru system data languages
  workerData.languages.forEach((language) => {
    if (language.length > 2) {
      langArr.push(language.slice(-2));
    }
    // loop thru countries found in system data timezone
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

  // Checks if main language has country code
  if (workerData.language.length > 2) {
    langArr.push(workerData.language.slice(-2));
  }

  if (timezone) langArr = langArr.concat(timezone.countries);

  // converts array to object of value/frequency
  const countryObj = langArr.reduce((obj, val) => {
    // eslint-disable-next-line no-param-reassign
    obj[val] = (obj[val] || 0) + 1;
    return obj;
  }, {});

  // Use the keys of the object to get all the values of the array
  // and sort those keys by their counts
  const sorted = Object.keys(countryObj).sort(
    (a, b) => countryObj[b] - countryObj[a]
  );

  const percent = langArr.filter((x) => x === sorted[0]).length * 14;

  return {
    value: sorted[0],
    percent: percent > 90 ? 90 : percent,
  };
};

const checkCity = (workerData, country) => {
  const timezone = ct.getTimezone(workerData.timeZone);
  let city = null;
  let percent = 0;

  if (
    workerData.timeZone.includes('/') &&
    workerData.timeZone.match(/universal|GMT|UCT|UTC/g) === null &&
    !/\d/.test(workerData.timeZone)
  ) {
    if (timezone && timezone.countries.includes(country)) {
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

const getMap = (data) => {
  let location, zoom;
  if (data[1].value === null) {
    location = data[0].value;
    zoom = 3;
  } else {
    location = `${data[1].value},${data[0].value}`;
    zoom = 6;
  }
  return `https://maps.googleapis.com/maps/api/staticmap?center=0,${location}&markers=color:red%7Clabel:%7C${location}&size=500x200&zoom=${zoom}&key=AIzaSyB-YN-X8PGBSPd7NOaQu4csVhgJUnF3ZGk`;
};
