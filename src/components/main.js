export { fetchAPI, getConnection, getSystemData };

const fetchAPI = (setData) => {
  fetch('https://api.vytal.io/ip/')
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });
};

const getConnection = (json) => {
  const data = [
    {
      key: 'ipAddress',
      title: 'IP address',
      value: json.query,
    },
    {
      key: 'country',
      title: 'Country',
      value: json.country,
    },
    {
      key: 'regionName',
      title: 'Region',
      value: json.regionName,
    },
    {
      key: 'lat',
      title: 'City',
      value: json.city,
    },
    {
      key: 'zip',
      title: 'Zip code',
      value: json.zip,
    },
    {
      key: 'lat',
      title: 'Latitude',
      value: json.lat,
    },
    {
      key: 'lon',
      title: 'Longitude',
      value: json.lon,
    },
  ];
  return data;
};

const getSystemData = (json) => {
  const data = [
    {
      key: 'ipAddress',
      title: 'IP address',
      value: json.query,
    },
    {
      key: 'country',
      title: 'Country',
      value: json.country,
    },
    {
      key: 'regionName',
      title: 'Region',
      value: json.regionName,
    },
    {
      key: 'lat',
      title: 'City',
      value: json.city,
    },
    {
      key: 'zip',
      title: 'Zip code',
      value: json.zip,
    },
    {
      key: 'lat',
      title: 'Latitude',
      value: json.lat,
    },
    {
      key: 'lon',
      title: 'Longitude',
      value: json.lon,
    },
  ];
  return data;
};
