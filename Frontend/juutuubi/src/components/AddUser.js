// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDatabaseChange = (e) => {
    setSelectedDatabase(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDatabase) {
      alert('Please select a database!');
      return;
    }

    try {
      if (selectedDatabase === 'mongo') {
        // Insert into MongoDB
        await axios.post('http://127.0.0.1:5000/insert/user/mongo', formData);
        alert('User added to MongoDB successfully!');
      } else {
        // Insert into PostgreSQL
        await axios.post('http://127.0.0.1:5000/insert/user', formData);
        alert('User added to PostgreSQL successfully!');
      }
    } catch (error) {
      console.error('Error inserting user:', error);
      alert('Failed to add user.');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
