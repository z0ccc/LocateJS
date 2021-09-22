import '../styles/App.css';
import Github from './Github';
import MainColumn from './MainColumn';

const App = () => (
  <div className="App">
    <Github />
    <div className="background" />
    <MainColumn />
  </div>
);

export default App;
