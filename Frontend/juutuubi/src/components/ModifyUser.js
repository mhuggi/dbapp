import React, { useState } from 'react';
import axios from 'axios';

const ModifyUser = () => {
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    subscriptioncount: 0,
    joindate: '',
    password: '',
    profilepicture: '',
  });
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [message, setMessage] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDatabaseChange = (e) => {
    setSelectedDatabase(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !selectedDatabase) {
      setMessage('Please select a database and provide a User ID.');
      return;
    }

    try {
      if (selectedDatabase === 'mongo') {
        // Update user in MongoDB
        const response = await axios.put(`http://127.0.0.1:5000/update/user/mongo/${userId}`, formData);
        setMessage(response.data.message || 'User updated in MongoDB successfully!');
      } else {
        // Update user in PostgreSQL
        const response = await axios.put(`http://127.0.0.1:5000/update/user/${userId}`, formData);
        setMessage(response.data.message || 'User updated in PostgreSQL successfully!');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user.');
    }
  };

  return (
    <div>
      <h2>Modify User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={handleUserIdChange} required />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Subscription Count:
          <input
            type="number"
            name="subscriptioncount"
            value={formData.subscriptioncount}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Join Date:
          <input type="date" name="joindate" value={formData.joindate} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Profile Picture URL:
          <input type="text" name="profilepicture" value={formData.profilepicture} onChange={handleChange} />
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
        <button type="submit">Modify User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ModifyUser;
