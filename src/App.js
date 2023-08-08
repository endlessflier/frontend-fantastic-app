import { useState } from 'react';
import Navbar from '~/pages/phone/navbar';
import Menu from '~/pages/menu';
import Activity from '~/pages/phone/activity';
import Archive from '~/pages/phone/archive';
import './App.css';
import { PHONE_TAB } from './constant';

function App() {
  const [selectedTab, setSelectedTab] = useState(PHONE_TAB.activity.key);
  return (
    <div className="App">
      <div className="appContainer">
        <Menu />
        <Navbar value={selectedTab} onChange={setSelectedTab} />
        {selectedTab === PHONE_TAB.activity.key && <Activity />}
        {selectedTab === PHONE_TAB.archive.key && <Archive />}
      </div>
    </div>
  );
}

export default App;
