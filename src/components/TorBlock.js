import Block from './Block';
import TableRow from './TableRow';

const TorBlock = ({ isTor }) => (
  <Block>
    <h1>Tor Browser</h1>
    <div className="tableWrap">
      <table>
        <tbody>
          <TableRow
            title="Detected"
            value={isTor}
            issues={[]}
          />
        </tbody>
      </table>
    </div>
    <p>
      <b>Explanation:</b> Date and language data can be used to identify your
      location. Changing the settings on your computer can prevent this.
    </p>
  </Block>
);

export default TorBlock;
