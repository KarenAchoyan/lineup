"use client";
import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { useRouter } from "next/navigation";
import {useApp} from "@/providers/AppProvider";

const SignIn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {lang} = useApp();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                document.cookie = `authToken=${data.token}; path=/; Secure; SameSite=Strict`;
                message.success("Login successful! Redirecting...");
                router.push("/"+lang.toLowerCase()+"/profile");
            } else {
                message.error(data.message || "Invalid credentials");
            }
        } catch (error) {
            message.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="bg-[#211d1dfc] signIn-background h-screen py-[180px]">
            <div className='flex items-center justify-center'>
                <div className="container bg-[#4d4c4c2b] h-[70vh] pt-[50px] rounded-lg shadow-xl p-8">
                    <h1 className='text-[40px] text-[#C7C7C7] text-center'>Welcome to Lineup</h1>
                    <h2 className='text-center text-[#C7C7C7] text-[24px]'>Log in to your account</h2>

                    <div className='signIn-form w-[350px] mt-[70px] m-auto'>
                        <Form
                            name="signin"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="space-y-4"
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: "Please enter your email!" }]}
                            >
                                <Input placeholder="Email" className="p-2 rounded-md h-[45px]" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please enter your password!" }]}
                            >
                                <Input.Password placeholder="Password" className="p-2 rounded-md h-[45px]" />
                            </Form.Item>
                            <div className="text-center text-gray-400 mt-4">
                                <a href="#" className="text-blue-400 hover:text-blue-500">Forgot password?</a>
                            </div>

                            <div className='mt-[180px]'>
                                <Form.Item>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#F15A2B] w-[270px] text-[25px] w-full text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:bg-[#FF6347]"
                                    >
                                        {loading ? "Signing In..." : "Sign In"}
                                    </button>
                                </Form.Item>
                            </div>
                        </Form>

                        <div className="text-center text-gray-400 mt-2">
                            Don't have an account? <a href={"/"+lang.toLowerCase()+"/auth/signUp"} className="text-blue-400 hover:text-blue-500">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
