/* eslint-disable no-undef */
import { useContext } from 'react';
import DataContext from './Context';
import Block from './Block';
import TableRow from './TableRow';

const DataBlock = ({ title, type }) => {
  const { delayedData, frameData, workerData } = useContext(DataContext);

  return (
    <Block>
      <h1>{title}</h1>
      <div className="tableWrap">
        <table>
          <tbody>
            <TableRow title="Initial" value={initialData[type]} issues={[]} />
            <TableRow title="Delayed" value={delayedData[type]} issues={delayedData.issues[type]} />
            <TableRow title="Frame" value={frameData[type]} issues={frameData.issues[type]} />
            <TableRow title="Web worker" value={window.Worker.length ? workerData[type] : null} issues={window.Worker.length ? workerData.issues[type] : ['Web workers blocked']} />
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
