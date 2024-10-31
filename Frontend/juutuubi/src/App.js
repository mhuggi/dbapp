// src/App.js
import React, {useState} from 'react';
import './App.css';
import Users from './components/Users';
import Videos from './components/Videos';
import Channels from './components/Channels';
import Notifications from './components/Notifications';

function App() {
  const [selectedDatabase, setSelectedDatabase] = useState('');

  const handleDatabaseChange = (event) => {
      setSelectedDatabase(event.target.value);
  };

    return (
      <div className="App">
        <h1>Video Platform Dashboard</h1>

        <label htmlFor="database-select">Choose a database: </label>
        <select id="database-select" onChange={handleDatabaseChange}>
          <option value="">Choose location</option>
          <option value="VideoPlatform">England</option>
          <option value="VideoPlatform2">Finland</option>
          <option value="videoplatform3">Sweden</option>

        </select>

        {selectedDatabase && (
          <>
              <Users database={selectedDatabase} />
              <Videos database={selectedDatabase} />
              <Channels database={selectedDatabase} />
              <Notifications database={selectedDatabase} />
          </>
        )}
  </div>

    );
}

export default App;
