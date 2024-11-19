// src/components/Channels.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Channels = ({ database }) => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        if (!database) return;

        const fetchChannels = async () => {
            try {
                let response;
                if (database === 'mongo') {
                    // Fetch channels from the MongoDB endpoint
                    response = await axios.get(`http://127.0.0.1:5000/channels/mongo`);
                } else {
                    // Fetch channels from the PostgreSQL endpoint
                    response = await axios.get(`http://127.0.0.1:5000/channels?database=${database}`);
                }
                console.log('Fetched Channels:', response.data);
                setChannels(response.data);
            } catch (error) {
                console.error('Error fetching Channels:', error);
            }
        };

        fetchChannels();
    }, [database]);

    return (
        <div>
            <h2>Channels</h2>
            <table>
                <thead>
                    <tr>
                        <th>ChannelID</th>
                        <th>ChannelName</th>
                        <th>Description</th>
                        <th>SubscriberCount</th>
                    </tr>
                </thead>
                <tbody>
                    {channels.map((channel) => (
                        <tr key={channel.ChannelID || channel._id}>
                            <td>{channel.ChannelID || channel._id}</td>
                            <td>{channel.ChannelName || channel.channelname}</td>
                            <td>{channel.Description || channel.description}</td>
                            <td>{channel.SubscriberCount || channel.subscribercount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Channels;
