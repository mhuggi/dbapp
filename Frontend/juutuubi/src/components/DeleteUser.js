import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [message, setMessage] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDatabaseChange = (e) => {
    setSelectedDatabase(e.target.value);
  };

  const handleDelete = async () => {
    if (!userId || !selectedDatabase) {
      setMessage('Please select a database and provide a User ID.');
      return;
    }

    try {
      if (selectedDatabase === 'mongo') {
        // Delete user from MongoDB
        const response = await axios.delete(`http://127.0.0.1:5000/delete/user/mongo/${userId}`);
        setMessage(response.data.message || 'User deleted from MongoDB successfully!');
      } else {
        // Delete user from PostgreSQL
        const response = await axios.delete(`http://127.0.0.1:5000/delete/user/${userId}`);
        setMessage(response.data.message || 'User deleted from PostgreSQL successfully!');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Failed to delete user.');
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <label>
        User ID:
        <input type="text" value={userId} onChange={handleUserIdChange} required />
      </label>
      <br />
      <label>
        Select Database:
        <select value={selectedDatabase} onChange={handleDatabaseChange} required>
          <option value="">Choose database</option>
          <option value="VideoPlatform">PostgreSQL (England)</option>
          <option value="mongo">MongoDB (Spain)</option>
        </select>
      </label>
      <br />
      <button onClick={handleDelete}>Delete User</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteUser;
