// src/components/Channels.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Channels = ({database}) => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        if (!database) return;

        axios.get(`http://127.0.0.1:5000/channels?database=${database}`)
            .then(response => {
                console.log('Fetched Channels:', response.data);
                setChannels(response.data);
            })
            .catch(error => console.error('Error fetching Channels:', error));
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
                    {channels.map(channel => (
                        <tr key={channel.ChannelID}>
                            <td>{channel.ChannelID}</td>
                            <td>{channel.ChannelName}</td>
                            <td>{channel.Description}</td>
                            <td>{channel.SubscriberCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Channels;
