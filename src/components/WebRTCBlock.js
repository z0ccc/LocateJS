import Block from './Block';
import TableRow from './TableRow';
import { getConnection } from '../utils/connection';

const WebRTCBlock = ({ title, data }) => (
  <Block>
    <h1>WebRTC {title}</h1>
    {data.map((ipData) => (
      <div className="tableWrap">
        <table>
          <tbody>
            {getConnection(ipData).map((item) => (
              <TableRow key={item.key} title={item.key} value={item.value} issues={item.issues} />
            ))}
          </tbody>
        </table>
      </div>
    ))}

    <p>
      <b>Explanation:</b> Date and language data can be used to identify your
      location. Changing the settings on your computer can prevent this.
    </p>
  </Block>
);

export default WebRTCBlock;
