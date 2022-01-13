import { useContext } from 'react';
import DataContext from './Context';
import Block from './Block';
import Table from './Table';
import { getData } from '../utils/data';

const DataBlock = ({ title, type, value }) => {
  const { frameData, workerData } = useContext(DataContext);

  return (
    <Block>
      <h1>{title}</h1>
      <Table data={getData(type, value, frameData, workerData)} />
      <p>
        <b>Explanation:</b> Date and language data can be used to identify your
        location. Changing the settings on your computer can prevent this.
      </p>
    </Block>
  );
};

export default DataBlock;
