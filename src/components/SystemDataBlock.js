/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import Block from './Block';
import Table from './Table';
import { getSystemData } from './main';

const SystemDataBlock = ({ workerData }) => (
  <Block>
    <h1>System Data</h1>
    <Table data={getSystemData(workerData)} />
    <p>
      <b>Explanation:</b> Your IP address reveals information about your
      connection. Using a VPN or Tor will hide your connection info.
    </p>
  </Block>
);

export default SystemDataBlock;
