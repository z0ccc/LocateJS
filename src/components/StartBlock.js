/* eslint-disable no-unused-vars */
import StartList from './StartList';
import Block from './Block';

const listItems = [
  {
    title: 'Predict Location',
    icon: 'predict',
    body: 'Browsers reveal bits of identifiable information. This data can be combined into a digital fingerprint which can be used to follow you around the web.',
  },
  {
    title: 'Connection',
    icon: 'connection',
    body: 'Websites are able to access your IP address when you connect to their server. Your IP address exposes information about your connection and location.',
  },
  {
    title: 'System Info',
    icon: 'system',
    body: "JavaScript can be used to find data about your computer's software and hardware. This information can be used to create a fingerprint.",
  },
];

const StartBlock = ({ setScan }) => (
  <Block>
    <h2>About</h2>
    <div className="contentBody">
      Vytal shows you what traces your browser leaves behind while surfing the
      web. This scan allows you to understand how easy it is to identify and
      track your browser even while using private mode.
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
