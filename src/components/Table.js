import TableRow from './TableRow';

const Table = ({ data }) => (
  <div className="tableWrap">
    <table>
      <tbody>
        {data.map((item) => (
          <TableRow item={item} key={item.key} />
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
