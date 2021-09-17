import { useState, useEffect } from 'react';
import Block from './Block';
import Table from './Table';
import { fetchAPI, getConnection, getWebWorker } from './main';

const PredictionBlock = () => {
  const [connectionData, setConnectionData] = useState('');
  const [workerData, setWorkerData] = useState();

  useEffect(() => {
    getWebWorker().onmessage = (event) => {
      setWorkerData(event.data);
      fetchAPI(setConnectionData, event.data);
    };
  }, []);

  return (
    <Block>
      <h1>Connection</h1>
      {connectionData ? (
        <Table data={getConnection(connectionData, workerData)} />
      ) : (
        <div className="boxWrap">loading...</div>
      )}
      <p>
        <b>Explanation:</b> Your IP address reveals information about your
        connection. Using a VPN or Tor will hide your connection info.
      </p>
    </Block>
  );
};

export default PredictionBlock;
