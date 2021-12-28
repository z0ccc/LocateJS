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
const getConnection = (connectionData) => {
  const isProxy = checkProxy(connectionData.proxy);
  return [
    {
      key: 'IP address',
      value: connectionData.query,
      issues: [isProxy],
    },
    {
      key: 'Country',
      value: connectionData.country,
      issues: [isProxy],
    },
    {
      key: 'Region',
      value: connectionData.regionName,
      issues: [isProxy],
    },
    {
      key: 'City',
      value: connectionData.city,
      issues: [isProxy],
    },
    {
      key: 'Time zone',
      value: connectionData.timezone,
      issues: [isProxy],
    },
    {
      key: 'Zip code',
      value: connectionData.zip,
      issues: [isProxy],
    },
    {
      key: 'Latitude',
      value: connectionData.lat,
      issues: [isProxy],
    },
    {
      key: 'Longitude',
      value: connectionData.lon,
      issues: [isProxy],
    },
    {
      key: 'ISP',
      value: connectionData.isp,
      issues: [isProxy],
    },
    {
      key: 'Org',
      value: connectionData.org,
      issues: [isProxy],
    },
    {
      key: 'ASN',
      value: connectionData.as,
      issues: [isProxy],
    },
  ];
};

const checkProxy = (proxy) => {
  if (proxy) {
    return 'VPN/proxy has been detected';
  }
  return null;
};
