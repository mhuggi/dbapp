// src/components/AllUsers.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/users/all`);
        console.log('Fetched All Users:', response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div>
      <h2>All Users (PostgreSQL + MongoDB)</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Country</th>
            <th>Subscription Count</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>{user.subscriptioncount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
