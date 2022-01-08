import TableRow from './TableRow';

const Table = ({ data }) => (
  <div className="tableWrap">
    {data && (
    <table>
      {data.map((item) => (
        <tbody key={item.key}>
          <TableRow item={item} />
        </tbody>
      ))}
    </table>
    )}
  </div>
);

export default Table;
