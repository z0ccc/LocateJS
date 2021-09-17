/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const PredictionTableRow = ({ item }) => {
  return (
    <tr>
      <td>{item.key}</td>
      <td>{item.value}</td>
      <td>90%</td>
    </tr>
  );
};

export default PredictionTableRow;
