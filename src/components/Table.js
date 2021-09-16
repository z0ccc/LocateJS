/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import TableRow from './TableRow';
import { checkWebWorker } from './main';

checkWebWorker();

const Table = ({ data }) => {
  return (
    <div className="tableWrap">
      <table>
        {data.map((item) => (
          <tbody key={item.key} title={item.code}>
            <TableRow item={item} />
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Table;
