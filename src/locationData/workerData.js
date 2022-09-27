// eslint-disable-next-line import/no-unresolved
import Worker from './worker?worker'

const getWebWorker = async () => {
  if (!window.Worker) return null
  const worker = new Worker()
  return new Promise((resolve) => {
    worker.onmessage = (event) => {
      resolve(event.data)
      worker.terminate()
    }
  })
}

export default getWebWorker
