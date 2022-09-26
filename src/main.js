import systemData from './systemData'
import getServerData from './getServerData'
import getWorkerData from './workerData'
import detectTor from './detectTor'
import getWebRTCData from './webRtc'
import getHtmlGeolocation from './htmlGeolocation'
import getPrediction from './prediction'

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
    tor: detectTor(),
    htmlGeolocation,
  }

  const prediction = getPrediction(data)

  console.log(prediction, data)
})
