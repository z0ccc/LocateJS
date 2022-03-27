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
      Tor Browser is a web broswer that hides your location info,
      causing the location prediction to be inaccurate.
    </p>
  </Block>
);

export default TorBlock;
