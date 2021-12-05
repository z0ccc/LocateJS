import { useContext } from 'react';
import DataContext from './Context';
import Block from './Block';
import Table from './Table';
import { getTimeZoneData } from '../utils/timeZone';

const TimeZoneBlock = () => {
  const { workerData } = useContext(DataContext);
  return (
    <Block>
      <h1>Intl.DateTimeFormat().resolvedOptions().timeZone</h1>
      <Table data={getTimeZoneData(workerData)} />
      <p>
        <b>Explanation:</b> Date and language data can be used to identify your
        location. Changing the settings on your computer can prevent this.
      </p>
    </Block>
  );
};

export default TimeZoneBlock;
