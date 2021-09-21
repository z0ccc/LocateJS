import StartList from './StartList';
import Block from './Block';

const listItems = [
  {
    title: 'Predict Location',
    icon: 'predict',
    body: 'Connection and system data can be examined to determine if the info is accurate. Accurate info can then be further evaluated to determine location.',
  },
  {
    title: 'Connection',
    icon: 'connection',
    body: 'Every device connecting to the internet is assigned an ip address. Information about your location can be exposed by analyzing your ip address.',
  },
  {
    title: 'System Data',
    icon: 'system',
    body: "JavaScript can be used to find data about your computer's software and hardware. This information can be used to create a fingerprint.",
  },
];

const StartBlock = ({ setScan }) => (
  <Block>
    <h2>About</h2>
    <div className="contentBody">
      LocateJS predicts your location by analysing your connection and system
      data. This scan allows you to understand how your location can be
      pinpointed even while using a vpn, location spoofer or private mode.
    </div>
    <StartList items={listItems} />
    <input
      type="submit"
      onClick={() => setScan(true)}
      className="scanButton"
      value="Start Scan"
    />
  </Block>
);

export default StartBlock;
