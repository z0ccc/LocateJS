/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import DataContext from './Context';
import Block from './Block';
import Table from './Table';
import { getData } from '../utils/data';
import TableRow from './TableRow2';

const DataBlock = ({ title, type, value }) => {
  const { frameData, workerData } = useContext(DataContext);

  return (
    <Block>
      <h1>{title}</h1>
      {/* <Table data={getData(type, value, frameData, workerData)} /> */}
      <div className="tableWrap">
        <table>
          <tbody>
            <TableRow title="Initial" value={initialData[type]} issues={[]} />
            <TableRow title="Delayed" value={value} issues={[]} />
            <TableRow title="Frame" value={frameData[type]} issues={[]} />
            <TableRow title="Web worker" value={workerData[type]} issues={[]} />
          </tbody>
        </table>
      </div>
      <p>
        <b>Explanation:</b> Date and language data can be used to identify your
        location. Changing the settings on your computer can prevent this.
      </p>
    </Block>
  );
};

export default DataBlock;
