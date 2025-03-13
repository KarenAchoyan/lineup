"use client"
import { useState } from "react";
import { Input, Button, Card } from "antd";
import { YoutubeOutlined } from "@ant-design/icons";

const VideoAdminPanel = () => {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoId, setVideoId] = useState(null);

    const extractVideoId = (url) => {
        const match = url.match(/[?&]v=([^&#]+)/);
        return match ? match[1] : null;
    };

    const handleAddVideo = () => {
        const id = extractVideoId(videoUrl);
        setVideoId(id);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <Card title="Add YouTube Video" className="shadow-lg rounded-lg">
                <Input
                    placeholder="Enter YouTube video URL"
                    prefix={<YoutubeOutlined className="text-red-500" />}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="mb-4"
                />
                <Button type="primary" onClick={handleAddVideo} block>
                    Add Video
                </Button>
                {videoId && (
                    <div className="mt-4">
                        <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default VideoAdminPanel;
