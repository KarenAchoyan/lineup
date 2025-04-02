"use client"
import React, {useState} from 'react';
import {Form, Input, message} from "antd";
import {useRouter} from "next/navigation";

const VolRegistration = ({loading, onFinish, error, onFinishFailed}) => {

    return (
        <div className="signIn-form w-[350px] mt-[70px] m-auto">
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <Form
                name="signup"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="space-y-4"
            >
                <Form.Item
                    name="studentName"
                    rules={[{required: true, message: "Please enter student's full name!"}]}
                >
                    <Input placeholder="Full name..." className="p-2 rounded-md h-[45px]"/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{required: true, message: "Please enter phone number!"}]}
                >
                    <Input placeholder="Phone number..." className="p-2 rounded-md h-[45px]"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{
                        required: true,
                        type: 'email',
                        message: "Please enter a valid email address!"
                    }]}
                >
                    <Input placeholder="Email address..." className="p-2 rounded-md h-[45px]"/>
                </Form.Item>
                <Form.Item
                    name="cover"
                    rules={[{
                        required: true,
                        type: 'email',
                        message: "Please enter !"
                    }]}
                    style={{
                        height: '100px'
                    }}
                >
                    <Input.TextArea placeholder="Cover letter..." className="p-2 rounded-md h-[45px]"/>
                </Form.Item>

                <div>
                    <Form.Item>
                        <button
                            type="submit"
                            className="bg-[#F15A2B] hover:bg-[#4D4C4C] cursor-pointer  text-[25px] w-full text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 "
                            disabled={loading}
                        >
                            {loading ? "Become a volunteer..." : "Become a volunteer"}
                        </button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default VolRegistration;