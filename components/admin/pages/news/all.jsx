"use client";

import { useState } from "react";
import {Table, Card, Button, Image, Modal, Input, Upload} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const RichTextEditor = ({ value, onChange }) => {
    return (
        <div className="border p-2 rounded bg-white">
            <JoditEditor
                value={value}
                onBlur={(newContent) => onChange(newContent)}
            />
        </div>
    );
};

const NewsListComponent = () => {
    const [newsList, setNewsList] = useState([
        {
            key: "1",
            amTitle: "Առաջին լուր",
            geTitle: "პირველი ამბავი",
            avatar: "https://www.alekspizza.ru/_next/image?url=https%3A%2F%2Finterior.dahk.am%2Fuploads%2F1739533846_avatar.jpg&w=640&q=75",
            amContent: "Content in Armenian",
            geContent: "Content in Georgian",
        },
        {
            key: "2",
            amTitle: "Երկրորդ լուր",
            geTitle: "მეორე ამბავი",
            avatar: "https://www.alekspizza.ru/_next/image?url=https%3A%2F%2Finterior.dahk.am%2Fuploads%2F1739533846_avatar.jpg&w=640&q=75",
            amContent: "Content in Armenian",
            geContent: "Content in Georgian",
        }
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);

    const handleDelete = (key) => {
        setNewsList(newsList.filter((item) => item.key !== key));
    };

    const handleEdit = (record) => {
        setCurrentNews(record);
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setNewsList(newsList.map(item =>
            item.key === currentNews.key ? currentNews : item
        ));
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleFieldChange = (key, value) => {
        setCurrentNews(prev => ({ ...prev, [key]: value }));
    };

    const columns = [
        {
            title: "Armenian Title",
            dataIndex: "amTitle",
            key: "amTitle",
        },
        {
            title: "Georgian Title",
            dataIndex: "geTitle",
            key: "geTitle",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar) => <Image src={avatar} alt="Avatar" width={50} height={50} />,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={() => handleDelete(record.key)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Card title="All News" className="shadow-lg rounded-lg">
                <Table columns={columns} dataSource={newsList} pagination={false} />
            </Card>

            <Modal
                title="Edit News"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                footer={null}
                width={800}
            >
                <div className="my-3">
                    <Input
                        placeholder="Armenian Title"
                        value={currentNews?.amTitle}
                        onChange={(e) => handleFieldChange("amTitle", e.target.value)}
                        className="mb-3"
                    />
                </div>
                <div className="my-3">
                    <Input
                        placeholder="Georgian Title"
                        value={currentNews?.geTitle}
                        onChange={(e) => handleFieldChange("geTitle", e.target.value)}
                        className="mb-3"
                    />
                </div>
                <p className="mb-1">Armenian Content</p>
                <RichTextEditor
                    value={currentNews?.amContent}
                    onChange={(value) => handleFieldChange("amContent", value)}
                />
                <p className="mb-1 mt-3">Georgian Content</p>
                <RichTextEditor
                    value={currentNews?.geContent}
                    onChange={(value) => handleFieldChange("geContent", value)}
                />
                <div className="my-3">
                    <Upload beforeUpload={() => false} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                    {currentNews?.avatar && (
                        <Image src={currentNews.avatar} alt="Avatar" width={128} height={128} className="mt-3 object-cover rounded" />
                    )}
                </div>
                <div className="mt-4 text-right">
                    <Button type="primary" onClick={handleModalOk}>
                        Save Changes
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default NewsListComponent;
