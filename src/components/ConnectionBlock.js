import { useState, useEffect } from 'react';
import Block from './Block';
import Table from './Table';
import { fetchAPI, getConnection } from './main';

const ConnectionBlock = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    fetchAPI(setData);
  }, []);

  return (
    <Block>
      <h1>Connection</h1>
      <Table data={getConnection(data)} />
      <p>
        <b>Explanation:</b> Your IP address reveals information about your
        connection. Using a VPN or Tor will hide your connection info.
      </p>
    </Block>
  );
};

export default ConnectionBlock;
