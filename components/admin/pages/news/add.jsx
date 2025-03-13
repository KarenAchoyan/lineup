"use client";

import { useState } from "react";
import { Input, Button, Card, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import Image from "next/image";

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

const NewsAddComponent = () => {
    const [newsData, setNewsData] = useState({
        amTitle: "",
        geTitle: "",
        amContent: "",
        geContent: "",
        avatar: null,
    });

    const handleChange = (key, value) => {
        setNewsData((prev) => ({ ...prev, [key]: value }));
    };

    const handleUpload = (info) => {
        const file = info.file.originFileObj;
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                handleChange("avatar", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        console.log("News Data Submitted:", newsData);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Card title="Add News" className="shadow-lg rounded-lg">
               <div className='my-3'>
                   <Input
                       placeholder="Armenian Title"
                       value={newsData.amTitle}
                       onChange={(e) => handleChange("amTitle", e.target.value)}
                       className="mb-3"
                   />
               </div>
                <div className='my-3'>
                    <Input
                        placeholder="Georgian Title"
                        value={newsData.geTitle}
                        onChange={(e) => handleChange("geTitle", e.target.value)}
                        className="mb-3"
                    />
                </div>
                <p className="mb-1">Armenian Content</p>
                <RichTextEditor
                    value={newsData.amContent}
                    onChange={(value) => handleChange("amContent", value)}
                />
                <p className="mb-1 mt-3">Georgian Content</p>
                <RichTextEditor
                    value={newsData.geContent}
                    onChange={(value) => handleChange("geContent", value)}
                />
                <div className='my-3'>
                    <Upload beforeUpload={() => false} onChange={handleUpload} showUploadList={false}>
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                    {newsData.avatar && (
                        <Image src={newsData.avatar} alt="Avatar" width={128} height={128} className="mt-3 object-cover rounded" />
                    )}
                </div>
                <Button type="primary" onClick={handleSubmit} block className="mt-4">
                    Submit News
                </Button>
            </Card>
        </div>
    );
};

export default NewsAddComponent;