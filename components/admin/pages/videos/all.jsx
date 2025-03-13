"use client"
import { useState } from "react";
import { Table, Card, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const AllVideosPage = () => {
    const [videos, setVideos] = useState([
        { key: "1", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
        { key: "2", url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" },
    ]);

    const extractVideoId = (url) => {
        const match = url.match(/[?&]v=([^&#]+)/);
        return match ? match[1] : null;
    };

    const handleDelete = (key) => {
        setVideos(videos.filter(video => video.key !== key));
    };

    const columns = [
        {
            title: "Video",
            dataIndex: "url",
            key: "url",
            render: (url) => (
                <iframe
                    width="200"
                    height="100"
                    src={`https://www.youtube.com/embed/${extractVideoId(url)}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
            ),
        },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Card title="All Videos" className="shadow-lg rounded-lg">
                <Table columns={columns} dataSource={videos} pagination={false} />
            </Card>
        </div>
    );
};

export default AllVideosPage;
