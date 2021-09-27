export { fetchAPI, getConnection };

// Gets connection values
const fetchAPI = (setData) => {
  fetch('https://api.vytal.io/ip/')
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });
};

// Returns object with connection data
const getConnection = (connectionData, workerData) => {
  const timeZoneIssue = compareTimeZone(
    connectionData.timezone,
    workerData.timeZone
  );
  const isProxy = checkProxy(connectionData.proxy);
  return [
    {
      key: 'IP address',
      value: connectionData.query,
      issues: [timeZoneIssue, isProxy],
    },
    {
      key: 'Country',
      value: connectionData.country,
      issues: [timeZoneIssue, isProxy],
    },
    {
      key: 'Region',
      value: connectionData.regionName,
      issues: [timeZoneIssue, isProxy],
    },
    {
      key: 'City',
      value: connectionData.city,
      issues: [timeZoneIssue, isProxy],
    },
    {
      key: 'Time zone',
      value: connectionData.timezone,
      issues: [timeZoneIssue, isProxy],
    },
    {
      key: 'Zip code',
      value: connectionData.zip,
      issues: [timeZoneIssue, isProxy],
    },
    {
      key: 'Latitude',
      value: connectionData.lat,
      issues: [timeZoneIssue, isProxy],
    },
    {
      key: 'Longitude',
      value: connectionData.lon,
      issues: [timeZoneIssue, isProxy],
    },
  ];
};

const compareTimeZone = (connectionTimeZone, workerTimeZone) => {
  if (connectionTimeZone !== workerTimeZone) {
    return "Connection data doesn't match system data";
  }
  return null;
};

const checkProxy = (proxy) => {
  if (proxy) {
    return 'VPN/proxy has been detected';
  }
  return null;
};
