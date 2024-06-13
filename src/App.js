import { useState } from 'react';
import MuiDrawer from './Helpers/MuiDrawer';
import CurrentDateTime from './Components/CurrentDateTime';
import StopWatch from './Components/StopWatch';
import Timer from './Components/Timer';
import YearStatus from './Components/YearStatus';
import './App.css';

const App = () => {

  const tabs = ["Current Date and Time","Stop Watch","Timer","Year Status"];

  const [activeTab,setActiveTab] = useState(tabs[0]);
  
  return(
    <main>
      <MuiDrawer tabs = {tabs} setActiveTab = {setActiveTab} />
      <header>
        <h2>{activeTab}</h2>
      </header>
      <section>
        {activeTab === "Stop Watch" ? <StopWatch />
          : activeTab === "Timer" ? <Timer />
          : activeTab === "Year Status" ? <YearStatus />
          : <CurrentDateTime />
        }
      </section>
    </main>
  )
}

export default App;