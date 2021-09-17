import PredictionTableRow from './PredictionTableRow';

const PredictionTable = ({ data }) => (
  <div className="tableWrap">
    <table>
      {data.map((item) => (
        <tbody key={item.key}>
          <PredictionTableRow item={item} />
        </tbody>
      ))}
    </table>
  </div>
);

export default PredictionTable;
