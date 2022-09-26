const getGeocode = (lat, long) =>
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyByyRWGncal9iAq1-3Ek2WQ3ROLw9bCS-8`
  )
    .then((response) => response.json())
    .then((data) => data.results[0].formatted_address)

const checkGetCurrentPosition = () => {
  if (
    !navigator.geolocation.getCurrentPosition
      .toString()
      .includes('[native code]')
  ) {
    return true
  }
  return false
}

const getHtmlGeolocation = async () =>
  new Promise((showPosition, showError) => {
    navigator.geolocation.getCurrentPosition(showPosition, showError, {
      enableHighAccuracy: true,
    })
  })
    .then(async (position) => {
      const reverseGeocode = await getGeocode(
        position.coords.latitude,
        position.coords.longitude
      )
      const htmlGeolocation = {
        tampered: checkGetCurrentPosition(),
        data: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          reverseGeocode,
        },
      }

      return htmlGeolocation
    })
    .catch((e) => e.message)

export default getHtmlGeolocation
