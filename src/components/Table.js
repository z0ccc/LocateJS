const Table = ({ data }) => (
  <div className="tableWrap">
    <table>
      {data.map((item) => (
        <tbody key={item.key} title={item.code}>
          <tr>
            <td>{item.key}</td>
            <td>{item.value}</td>
          </tr>
        </tbody>
      ))}
    </table>
  </div>
);

export default Table;
