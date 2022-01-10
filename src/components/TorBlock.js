import { useState } from 'react';
import Block from './Block';
import Table from './Table';

const detectTor = (setIsTor) => {
  const css = document.createElement('link');
  css.href = 'resource://torbutton-assets/aboutTor.css';
  css.type = 'text/css';
  css.rel = 'stylesheet';
  document.head.appendChild(css);
  css.onload = () => {
    setIsTor('True');
  };
  css.onerror = () => {
    setIsTor('False');
  };
  document.head.removeChild(css);
};

const TorBlock = () => {
  const [isTor, setIsTor] = useState();
  detectTor(setIsTor);
  return (
    <Block>
      <h1>Tor Browser</h1>
      {isTor && (
      <Table data={[{
        key: 'Detected',
        value: isTor,
        issues: [],
      }]}
      />
      )}
      <p>
        <b>Explanation:</b> Date and language data can be used to identify your
        location. Changing the settings on your computer can prevent this.
      </p>
    </Block>
  );
};

export default TorBlock;
