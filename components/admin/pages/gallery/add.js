"use client";
import React, { useState } from 'react';
import { Button, message, Upload, Space, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const GalleryAdd = () => {
    const [image, setImage] = useState(null); // Holds the selected image
    const [previewUrl, setPreviewUrl] = useState(null); // Holds the image preview URL
    const [uploading, setUploading] = useState(false); // To track if the image is being uploaded
    const [uploadSuccess, setUploadSuccess] = useState(false); // To track upload success

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreviewUrl(fileReader.result); // Set the preview URL once the image is loaded
            };
            fileReader.readAsDataURL(file); // Read the file as a data URL for preview
        }
    };

    // Handle image upload
    const handleUpload = async () => {
        if (!image) return; // No image selected

        setUploading(true);
        const formData = new FormData();
        formData.append('image', image); // Append the image file to the form data

        try {
            // Example URL - replace with the actual URL for image upload
            const response = await fetch('https://example.com/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadSuccess(true);
                // Optionally, you can reset the form or preview
                setImage(null);
                setPreviewUrl(null);
            } else {
                setUploadSuccess(false);
                alert('Upload failed!');
            }
        } catch (error) {
            setUploadSuccess(false);
            alert('Error uploading image!');
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add Image to Gallery</h2>

            <div className="mb-4">
                <Upload
                    beforeUpload={(file) => {
                        handleImageChange({ target: { files: [file] } });
                        return false; // Prevent automatic upload
                    }}
                    showUploadList={false}
                    accept="image/*"
                >
                    <Button
                        icon={<UploadOutlined />}
                        type="primary"
                        className="w-full"
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Select Image'}
                    </Button>
                </Upload>
            </div>

            {previewUrl && (
                <div className="mb-6 text-center">
                    <h3 className="text-lg font-medium mb-2">Image Preview</h3>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="rounded-lg max-w-full h-auto shadow-lg"
                        style={{ maxWidth: '300px', maxHeight: '300px' }}
                    />
                </div>
            )}

            <div className="flex justify-center mb-4">
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={uploading || !image}
                    className="w-full max-w-xs"
                    loading={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
            </div>

            {uploadSuccess && (
                <div className="text-green-600 text-center mt-4">
                    <p>Image uploaded successfully!</p>
                </div>
            )}
        </div>
    );
};

export default GalleryAdd;
