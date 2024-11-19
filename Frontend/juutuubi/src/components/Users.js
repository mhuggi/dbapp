import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = ({ database }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!database) return;

        const fetchUsers = async () => {
            try {
                let response;
                if (database === 'mongo') {
                    // Fetch users from MongoDB
                    response = await axios.get(`http://127.0.0.1:5000/users/mongo`);
                } else {
                    // Fetch users from PostgreSQL
                    response = await axios.get(`http://127.0.0.1:5000/users?database=${database}`);
                }
                console.log('Fetched Users:', response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching Users:', error);
            }
        };

        fetchUsers();
    }, [database]);

    return (
        <div>
            <h2>Users</h2>
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
                    {users.map((user) => (
                        <tr key={user.UserID || user._id}>
                            <td>{user.UserID || user._id}</td>
                            <td>{user.Username || user.username}</td>
                            <td>{user.Email || user.email}</td>
                            <td>{user.Country || user.country}</td>
                            <td>{user.SubscriptionCount || user.subscriptioncount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
