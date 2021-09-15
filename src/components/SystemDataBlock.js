import { useState, useEffect } from 'react';
import Block from './Block';
import Table from './Table';
import { fetchAPI, getSystemData } from './main';

const SystemDataBlock = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    fetchAPI(setData);
  }, []);

  return (
    <Block>
      <h1>System Data</h1>
      <Table data={getSystemData(data)} />
      <p>
        <b>Explanation:</b> Your IP address reveals information about your
        connection. Using a VPN or Tor will hide your connection info.
      </p>
    </Block>
  );
};

export default SystemDataBlock;
