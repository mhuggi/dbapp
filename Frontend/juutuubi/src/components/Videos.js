import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Videos = ({ database }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (!database) return;

        const fetchVideos = async () => {
            try {
                let response;
                if (database === 'mongo') {
                    // Fetch videos from MongoDB
                    response = await axios.get(`http://127.0.0.1:5000/videos/mongo`);
                } else {
                    // Fetch videos from PostgreSQL
                    response = await axios.get(`http://127.0.0.1:5000/videos?database=${database}`);
                }
                console.log('Fetched Videos:', response.data);
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching Videos:', error);
            }
        };

        fetchVideos();
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
                        <th>Views</th>
                        <th>Likes</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map((video) => (
                        <tr key={video.VideoID || video._id}>
                            <td>{video.VideoID || video._id}</td>
                            <td>{video.Title || video.title}</td>
                            <td>{video.Description || video.description}</td>
                            <td>{video.Views || video.viewscount}</td>
                            <td>{video.Likes || video.likescount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Videos;
