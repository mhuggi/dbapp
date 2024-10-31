import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = ({ database }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!database) return;

        axios.get(`http://127.0.0.1:5000/users?database=${database}`)
            .then(response => {
                console.log('Fetched users:', response.data);
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, [database]);

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>JoinDate</th>
                        <th>Country</th>
                        <th>SubscriptionCount</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.UserID}>
                                <td>{user.UserID}</td>
                                <td>{user.Username}</td>
                                <td>{user.Email}</td>
                                <td>{user.JoinDate}</td>
                                <td>{user.Country}</td>
                                <td>{user.SubscriptionCount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
