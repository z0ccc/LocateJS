const PredictionTableRow = ({ item }) => (
  <tr>
    <td>{item.key}</td>
    <td>{item.value || 'N/A'}</td>
    <td>{item.percent}%</td>
  </tr>
);

export default PredictionTableRow;
