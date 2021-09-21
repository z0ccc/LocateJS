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
      <b>Explanation:</b> Date and language data can be used to identify your
      location. Changing the settings on your computer can prevent this.
    </p>
  </Block>
);

export default SystemDataBlock;
