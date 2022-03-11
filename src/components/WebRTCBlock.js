import Block from './Block';
import TableRow from './TableRow';

const WebRTCBlock = ({ title, data }) => (
  <Block>
    <h1>WebRTC {title}</h1>
    <div className="tableWrap">
      {data.map((item) => (
        <table>
          <tbody>
            <TableRow key={item} title="IP address" value={item} issues={[]} />
          </tbody>
        </table>
      ))}

    </div>
    <p>
      <b>Explanation:</b> Date and language data can be used to identify your
      location. Changing the settings on your computer can prevent this.
    </p>
  </Block>
);

export default WebRTCBlock;
