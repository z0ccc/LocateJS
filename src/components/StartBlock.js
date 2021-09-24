import StartList from './StartList';
import Block from './Block';

const listItems = [
  {
    title: 'Predict Location',
    icon: 'predict',
    body: 'Connection and system data can be analyzed to predict your location. If the data is accurate then your location can be easily identified.',
  },
  {
    title: 'System Data',
    icon: 'system',
    body: "JavaScript can be used to find data about your computer's software and hardware. Some of this information can reveal your location.",
  },
  {
    title: 'Connection',
    icon: 'connection',
    body: 'Every device connecting to the internet is assigned an ip address. Information about your location can be exposed by analyzing your ip address.',
  },
];

const StartBlock = ({ setScan }) => (
  <Block>
    <h2>About</h2>
    <div className="contentBody">
      LocateJS predicts your location by analyzing your connection and system
      data. This scan allows you to understand how your location can be
      pinpointed even while using a VPN, location spoofer or private mode.
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
