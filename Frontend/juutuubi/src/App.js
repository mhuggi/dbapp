// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Users from './components/Users';
import Videos from './components/Videos';
import Channels from './components/Channels';
import Notifications from './components/Notifications';
import AllUsers from './components/AllUsers';
import AddUser from './components/AddUser';
import DeleteUser from './components/DeleteUser';
import ModifyUser from './components/ModifyUser';

function App() {
  const [selectedDatabase, setSelectedDatabase] = useState('');

  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <h1>Video Platform Dashboard</h1>
                <label htmlFor="database-select">Choose a database: </label>
                <select id="database-select" onChange={handleDatabaseChange}>
                  <option value="">Choose location</option>
                  <option value="VideoPlatform">England</option>
                  <option value="VideoPlatform2">Finland</option>
                  <option value="videoplatform3">Sweden</option>
                  <option value="mongo">Spain</option>
                </select>

                {selectedDatabase && (
                  <>
                    <Users database={selectedDatabase} />
                    <Videos database={selectedDatabase} />
                    <Channels database={selectedDatabase} />
                    <Notifications database={selectedDatabase} />
                  </>
                )}
              </>
            }
          />

          {/* All Users Page */}
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/add-user" element={<AddUser database={selectedDatabase} />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/modify-user" element={<ModifyUser />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
