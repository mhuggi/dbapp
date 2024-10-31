// src/components/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = ({database}) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!database) return;

        axios.get(`http://127.0.0.1:5000/notifications?database=${database}`)
            .then(response => {
                console.log('Fetched Notifications:', response.data);
                setNotifications(response.data);
            })
            .catch(error => console.error('Error fetching nots:', error));
        }, [database]);
    return (
        <div>
            <h2>Notifications</h2>
            <table>
                <thead>
                    <tr>
                        <th>NotiID</th>
                        <th>Text</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(notification => (
                        <tr key={notification.NotiID}>
                            <td>{notification.NotiID}</td>
                            <td>{notification.Text}</td>
                            <td>{notification.Date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Notifications;
