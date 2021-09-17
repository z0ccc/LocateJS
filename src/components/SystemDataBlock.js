/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Block from './Block';
import Table from './Table';
import { getSystemData, getWebWorker } from './main';

const SystemDataBlock = () => {
  const [workerData, setWorkerData] = useState();

  useEffect(() => {
    getWebWorker().onmessage = (event) => {
      setWorkerData(event.data);
    };
  }, []);

  return (
    <Block>
      <h1>System Data</h1>
      {workerData && <Table data={getSystemData(workerData)} />}
      <p>
        <b>Explanation:</b> Your IP address reveals information about your
        connection. Using a VPN or Tor will hide your connection info.
      </p>
    </Block>
  );
};

export default SystemDataBlock;
