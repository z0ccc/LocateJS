/* eslint-disable no-unused-vars */
export { getMap, getPrediction };

// const sortData = (initialData, delayedData, frameData, workerData) => {

// };

const getPrediction = (
  initialData, delayedData, frameData, workerData, connectionData, webRTCData, isTor
) => {
  let country, countryPercent, city, cityPercent, timeZone;

  const getAccurateData = (type) => {
    if (window.Worker.length && !workerData[type].issues.length) return workerData[type].value;
    if (!frameData[type].issues.length) return frameData[type].value;
    if (!delayedData[type].issues.length) return delayedData[type].value;
    return initialData[type].value;
  };

  const accurateData = {
    locale: getAccurateData('locale'),
    timeZone: getAccurateData('timeZone'),
    timezoneOffset: getAccurateData('timezoneOffset'),
    dateString: getAccurateData('dateString'),
    dateLocale: getAccurateData('dateLocale'),
    language: getAccurateData('language'),
    languages: getAccurateData('languages'),
  };

  const webRTCIP = checkWebRTC(webRTCData);

  const systemCountry = checkCountry(accurateData);

  const systemCity = checkCity(accurateData.timeZone, country);

  if (isTor === 'True') return false;

  if (!connectionData.proxy) {
    if (webRTCIP && !webRTCIP.proxy) {
      if (webRTCIP.query === connectionData.query) {
        countryPercent = 90;
        cityPercent = 90;
      } else {
        countryPercent = 80;
        cityPercent = 80;
      }
      country = webRTCIP.countryCode;
      city = webRTCIP.city;
      timeZone = webRTCIP.timeZone;
    } else {
      country = connectionData.countryCode;
      city = connectionData.city;
      timeZone = connectionData.timeZone;

      countryPercent = 80;
      cityPercent = 80;
    }
  } else if (webRTCIP && !webRTCIP.proxy) {
    countryPercent = 85;
    cityPercent = 85;
    country = webRTCIP.countryCode;
    city = webRTCIP.city;
    timeZone = webRTCIP.timeZone;
  }

  if (country && systemCountry === country) {
    countryPercent = 95;
  } else if (country && systemCountry !== country) {
    countryPercent -= 40;
  } else {
    countryPercent = 40;
    country = systemCountry;
  }

  if (city && systemCity === city) {
    cityPercent = 95;
  } else if (city && systemCity !== city) {
    cityPercent -= 20;
  } else {
    cityPercent = 20;
    city = systemCity;
  }

  if (timeZone && timeZone !== accurateData.timeZone) {
    countryPercent -= 20;
  }

  if (cityPercent > countryPercent) {
    cityPercent = countryPercent - 5;
  }

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  country = regionNames.of(country);

  console.log(country, countryPercent, city, cityPercent);

  return false;
};

const checkWebRTC = (webRTCData) => {
  let localIP, ipv6, publicIP;
  for (let i = 0; i < webRTCData.length; i++) {
    if (webRTCData[i].proxy === false) {
      if (webRTCData[i].query.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
        localIP = webRTCData[i];
      } else if (webRTCData[i].query.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)) {
        ipv6 = webRTCData[i];
      } else {
        publicIP = webRTCData[i];
      }
    }
  }
  if (publicIP) return publicIP;
  if (ipv6) return ipv6;
  if (localIP) return localIP;
  return null;
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
// const cl = require('country-language');

const checkCountry = (data) => {
  const countryArr =
    checkLocale(data.locale).concat(checkTimezone(data.timeZone), checkLanguages(data));

  const countryObj = handleCountryArr(countryArr);

  console.log(countryObj);

  const topCountry =
  Object.keys(countryObj).reduce((a, b) => (countryObj[a] > countryObj[b] ? a : b));

  return topCountry;
};

// Get country from locale
const checkLocale = (locale) => {
  const IntlLocale = new Intl.Locale(locale);
  // const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return [IntlLocale.region];
};

// Get countries of timezone
const checkTimezone = (timeZone) => {
  if (timeZone) {
    const countryArr = ct.getTimezone(timeZone).countries;
    return countryArr.concat(countryArr, countryArr);
  }
  return [];
};

const checkLanguages = (data) => {
  const countryArr = [];
  // loop thru system data languages
  data.languages.forEach((language) => {
    if (language.length > 2) {
      countryArr.push(language.slice(-2));
    }
  });

  // Checks if main language has country code
  // if (data.language.length > 2) {
  //   countryArr.push(data.language.slice(-2));
  // }

  return countryArr;
};

// converts array to object of value/frequency
const handleCountryArr = (countryArr) =>
  countryArr.reduce((obj, val) => {
    // eslint-disable-next-line no-param-reassign
    obj[val] = (obj[val] || 0) + 1;
    return obj;
  }, {});

const checkCity = (timeZone, country) => {
  console.log(timeZone);
  console.log(country);

  let city = null;

  // Check if timezone contains city info
  if (
    timeZone.includes('/') &&
    timeZone.match(/universal|GMT|UCT|UTC/g) === null &&
    !/\d/.test(timeZone)
  ) {
    city = timeZone.split('/');
    city = city[city.length - 1].replace('_', ' ');
  }

  return city;
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
