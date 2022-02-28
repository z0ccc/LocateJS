/* eslint-disable no-unused-vars */
export { getMap, getPrediction };

const getPrediction = (
  initialData, delayedData, frameData, workerData, connectionData, webRTCData, isTor
) => {
  let country, countryPercent, city, cityPercent, regionNames;
  console.log(getIntlTimeZone(initialData, delayedData, frameData, workerData));
  // console.log(webRTCData);

  if (isTor === 'False') {
    if (connectionData.proxy) {
      return false;
    }
    country = connectionData.country;
    city = connectionData.city;
  }
  console.log(country, city);

  return false;
};

const getIntlTimeZone = (initialData, delayedData, frameData, workerData) => {
  // console.log(frameData.issues.timeZone.length);
  if (window.Worker.length && !workerData.issues.timeZone.length) {
    console.log('workerData');
    return workerData.timeZone;
  }
  if (!frameData.issues.timeZone.length) {
    console.log('frameData');

    return frameData.timeZone;
  }
  if (!delayedData.issues.timeZone.length) {
    console.log('delayedData');

    return delayedData.timeZone;
  }
  console.log('initialData');

  return initialData.timeZone;
};
// // if connection timezone equals system data timezone
// if (connectionData && !connectionData.proxy) {
//   country = connectionData.country;
//   city = connectionData.city;
//   if (connectionData.timezone === workerData.timeZone) {
//     countryPercent =s 90;
//     cityPercent = 90;
//   } else {
//     countryPercent = 80;
//     cityPercent = 60;s
//   }
// } else {
//   try {
//     regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
//   } catch (e) {
//     regionNames = null;
//   }

//   const countryObj = checkCountry(workerData);
//   const cityObj = checkCity(workerData, countryObj.value);
//   country = regionNames ? regionNames.of(countryObj.value) : countryObj.value;
//   countryPercent = countryObj.percent;
//   city = cityObj.value;
//   cityPercent = cityObj.percent;
// }
// return [
//   {
//     key: 'Country',
//     value: country,
//     percent: countryPercent,
//   },
//   {
//     key: 'Closest city',
//     value: city,
//     percent: cityPercent,
//   },
// ];
// };

const ct = require('countries-and-timezones');
const cl = require('country-language');

const checkCountry = (workerData) => {
  const timezone = ct.getTimezone(workerData.timeZone);
  const countryArr = checkLanguages(workerData).concat(checkTimezone(timezone));

  const countryObj = handleCountryArr(countryArr);
  // Use the keys of the object to get all the values of the array
  // and sort those keys by their counts
  const sorted = Object.keys(countryObj).sort(
    (a, b) => countryObj[b] - countryObj[a]
  );

  const percent = countryArr.filter((x) => x === sorted[0]).length * 14;

  return {
    value: sorted[0],
    percent: percent > 90 ? 90 : percent,
  };
};

const checkLanguages = (workerData) => {
  const countryArr = [];
  // loop thru system data languages
  workerData.languages.forEach((language) => {
    if (language.length > 2) {
      countryArr.push(language.slice(-2));
    }
    // loop thru countries found in system data timezone
    cl.getLanguageCountries(language.slice(0, 2), (err, languages) => {
      if (err) {
        // console.log(err);
      } else {
        languages.forEach((languageCodes) => {
          countryArr.push(languageCodes.code_2);
        });
      }
    });
  });

  // Checks if main language has country code
  if (workerData.language.length > 2) {
    countryArr.push(workerData.language.slice(-2));
  }

  return countryArr;
};

// Get countries of timezone
const checkTimezone = (timezone) => {
  let countryArr = [];
  if (timezone) {
    countryArr = countryArr // Concat multiple times to assing a greater weight to timezones
      .concat(timezone.countries)
      .concat(timezone.countries)
      .concat(timezone.countries);
  }
  return countryArr;
};

// converts array to object of value/frequency
const handleCountryArr = (countryArr) =>
  countryArr.reduce((obj, val) => {
    // eslint-disable-next-line no-param-reassign
    obj[val] = (obj[val] || 0) + 1;
    return obj;
  }, {});

const checkCity = (workerData, country) => {
  const timezone = ct.getTimezone(workerData.timeZone);
  let city = null;
  let percent = 0;

  // Check if timezone contains city info
  if (
    workerData.timeZone.includes('/') &&
    workerData.timeZone.match(/universal|GMT|UCT|UTC/g) === null &&
    !/\d/.test(workerData.timeZone)
  ) {
    // Check if city is in country
    if (timezone && timezone.countries.includes(country)) {
      city = workerData.timeZone.split('/');
      city = city[city.length - 1].replace('_', ' ');
      percent = 30;
    }
  }
  return {
    value: city,
    percent,
  };
};

// Return url for static map imgage
const getMap = (data) => {
  let location, zoom;
  if (data[1].value === null) {
    location = data[0].value;
    zoom = 3;
  } else {
    location = `${data[1].value},${data[0].value}`;
    zoom = 7;
  }
  return `https://maps.googleapis.com/maps/api/staticmap?center=0,${location}&markers=color:red%7Clabel:%7C${location}&size=460x185&zoom=${zoom}&key=AIzaSyB-YN-X8PGBSPd7NOaQu4csVhgJUnF3ZGk`;
};
