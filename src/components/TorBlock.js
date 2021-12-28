import Block from './Block';
import Table from './Table';

const detectTor = () => {
  const date = new Date();
  if (
    navigator.plugins.length === 0 &&
      date.getTimezoneOffset() === 0 &&
      window.outerWidth === window.screen.availWidth &&
      window.outerHeight === window.screen.availHeight
  ) {
    return 'True';
  }
  return 'False';
};

const TorBlock = () => (
  <Block>
    <h1>Tor Browser</h1>
    <Table data={[{
      key: 'Detected',
      value: detectTor(),
      issues: [],
    }]}
    />
    <p>
      <b>Explanation:</b> Date and language data can be used to identify your
      location. Changing the settings on your computer can prevent this.
    </p>
  </Block>
);

export default TorBlock;
