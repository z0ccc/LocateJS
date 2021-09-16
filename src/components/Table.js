/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ReactComponent as XCircle } from '../xCircle.svg';
import { ReactComponent as CheckCircle } from '../checkCircle.svg';

const Table = ({ data }) => {
  const [issues, setIssues] = useState(false);

  return (
    <div className="tableWrap">
      <table>
        {data.map((item) => (
          <tbody key={item.key} title={item.code}>
            <tr>
              <td>{item.key}</td>
              <td>{item.value}</td>
              <td>
                {issues ? (
                  <XCircle className="circleButton" />
                ) : (
                  <CheckCircle className="circleButton" />
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Table;
