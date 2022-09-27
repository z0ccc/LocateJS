const getServerData = () =>
  fetch('http://localhost:8000/api/ip').then((response) => response.json())

export default getServerData
