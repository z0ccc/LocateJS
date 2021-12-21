import './MainColumn.css';
import Logo from './Logo';
import Blocks from './Blocks';

const MainColumn = () => (
  <div className="centerBlockOuter">
    <div className="centerBlockInner">
      <Logo />
      <Blocks />
    </div>
  </div>
);

export default MainColumn;
