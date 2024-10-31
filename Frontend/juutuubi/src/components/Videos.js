// src/components/Videos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Videos = ({database}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (!database) return;

        axios.get(`http://127.0.0.1:5000/videos?database=${database}`)
            .then(response => {
                console.log('Fetched videos:', response.data);
                setVideos(response.data);
            })
            .catch(error => console.error('Error fetching videos:', error));
        }, [database]);

    return (
        <div>
            <h2>Videos</h2>
            <table>
                <thead>
                    <tr>
                        <th>VideoID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>UploadDate</th>
                        <th>LikesCount</th>
                        <th>ViewsCount</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map(video => (
                        <tr key={video.VideoID}>
                            <td>{video.VideoID}</td>
                            <td>{video.Title}</td>
                            <td>{video.Description}</td>
                            <td>{video.UploadDate}</td>
                            <td>{video.LikesCount}</td>
                            <td>{video.ViewsCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Videos;
