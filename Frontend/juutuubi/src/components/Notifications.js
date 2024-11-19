import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = ({ database }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!database) return;

        const fetchNotifications = async () => {
            try {
                let response;
                if (database === 'mongo') {
                    // Fetch notifications from MongoDB
                    response = await axios.get(`http://127.0.0.1:5000/notifications/mongo`);
                } else {
                    // Fetch notifications from PostgreSQL
                    response = await axios.get(`http://127.0.0.1:5000/notifications?database=${database}`);
                }
                console.log('Fetched Notifications:', response.data);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching Notifications:', error);
            }
        };

        fetchNotifications();
    }, [database]);

    return (
        <div>
            <h2>Notifications</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map((notification) => (
                        <tr key={notification.ID || notification._id}>
                            <td>{notification.ID || notification._id}</td>
                            <td>{notification.Text || notification.text}</td>
                            <td>{notification.Date || notification.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Notifications;
