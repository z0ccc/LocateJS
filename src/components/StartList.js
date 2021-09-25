import './StartList.css';
import { ReactComponent as PredictIcon } from '../images/predict.svg';
import { ReactComponent as ConnectionIcon } from '../images/connection.svg';
import { ReactComponent as SystemIcon } from '../images/system.svg';

const Icons = {
  predict: <PredictIcon />,
  connection: <ConnectionIcon />,
  system: <SystemIcon />,
};

const StartList = ({ items }) => (
  <div className="contentList">
    {items.map((item) => (
      <div className="listItem" key={item.title}>
        <div className="contentIcon">{Icons[item.icon]}</div>
        <div>
          <h2>{item.title}</h2>
          <div>{item.body}</div>
        </div>
      </div>
    ))}
  </div>
);

export default StartList;
