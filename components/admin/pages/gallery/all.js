"use client"
import React, { useState, useEffect } from 'react';
import { Table, Button, message, Space } from 'antd';

const GalleryAll = () => {
    const [galleries, setGalleries] = useState([]); // State to hold gallery data
    const [loading, setLoading] = useState(false); // Loading state for fetch operation

    // Fetch galleries data from API
    useEffect(() => {
        const fetchGalleries = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://example.com/api/galleries'); // Replace with your actual API
                const data = await response.json();
                setGalleries(data);
            } catch (error) {
                message.error('Error fetching galleries!');
            } finally {
                setLoading(false);
            }
        };

        fetchGalleries();
    }, []);

    // Handle delete functionality
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://example.com/api/galleries/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                message.success('Gallery deleted successfully!');
                // Refresh the gallery list after deletion
                setGalleries(galleries.filter((gallery) => gallery.id !== id));
            } else {
                message.error('Error deleting gallery!');
            }
        } catch (error) {
            message.error('Error deleting gallery!');
        }
    };

    // Define columns for the table
    const columns = [
        {
            title: 'Gallery Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="danger"
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h2>Gallery List</h2>
            <Table
                columns={columns}
                dataSource={galleries}
                loading={loading}
                rowKey="id" // Assuming each gallery has a unique id
                pagination={false} // You can add pagination if necessary
            />
        </div>
    );
};

export default GalleryAll;
