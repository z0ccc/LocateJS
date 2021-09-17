import Block from './Block';
import Table from './Table';
import { getConnection } from './main';

const ConnectionBlock = ({ workerData, connectionData }) => (
  <Block>
    <h1>Connection</h1>
    <Table data={getConnection(connectionData, workerData)} />
    <p>
      <b>Explanation:</b> Your IP address reveals information about your
      connection. Using a VPN or Tor will hide your connection info.
    </p>
  </Block>
);

export default ConnectionBlock;
