import './MainColumn.css';
import { useState } from 'react';
import Logo from './Logo';
import Blocks from './Blocks';
import StartBlock from './StartBlock';

const MainColumn = () => {
  const [scan, setScan] = useState(false);

  return (
    <div className="centerBlockOuter">
      <div className="centerBlockInner">
        <Logo />
        {scan ? <Blocks /> : <StartBlock scan={scan} setScan={setScan} />}
      </div>
    </div>
  );
};

export default MainColumn;
