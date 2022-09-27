import {
  systemData,
  getServerData,
  getWorkerData,
  detectTor,
  getWebRTCData,
  getHtmlGeolocation,
  getPrediction,
} from './locationData'

Promise.all([
  getServerData(),
  getWorkerData(),
  getWebRTCData(),
  getHtmlGeolocation(),
]).then((promiseValues) => {
  const serverData = promiseValues[0]
  const workerData = promiseValues[1]
  const webRtc = promiseValues[2]
  const htmlGeolocation = promiseValues[3]
  let clientData = {}
  Object.entries(systemData).forEach(([key]) => {
    clientData = {
      ...clientData,
      [key]: {
        topWindow: {
          value: systemData[key].value,
          tampered: systemData[key].tampered,
        },
        webWorker: {
          value: workerData[key].value,
          tampered: workerData[key].tampered,
        },
      },
    }
  })

  const data = {
    serverData,
    clientData,
    webRtc,
    torDetected: detectTor(),
    htmlGeolocation,
  }

  const prediction = getPrediction(data)

  console.log(prediction, data)
})
