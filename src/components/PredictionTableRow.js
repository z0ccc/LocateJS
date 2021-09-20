/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

const PredictionTableRow = ({ item }) => {
  return (
    <tr>
      <td>{item.key}</td>
      <td>{item.value || 'N/A'}</td>
      <td>{item.percent}%</td>
    </tr>
  );
};

export default PredictionTableRow;
