import Worker from './worker?worker';

const getWebWorker = async () => {
  if (window.Worker) {
    const worker = new Worker();
    return new Promise((resolve, reject) => {
      worker.onmessage = (event) => {
        resolve(event.data);
        worker.terminate();
      };
    });
  }
};

export default getWebWorker;
