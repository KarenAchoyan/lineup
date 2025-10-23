"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const ForgotPassword = ({ dict, lang }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: values.email
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setEmailSent(true);
                message.success('Password reset email sent successfully!');
            } else {
                setError(data.error || "Something went wrong!");
                message.error(data.error || "Something went wrong!");
            }
        } catch (error) {
            setError(error.message || "Something went wrong!");
            message.error(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (emailSent) {
        return (
            <div className="bg-[#211d1dfc] signIn-background min-h-screen py-[120px] sm:py-[150px] lg:py-[180px]">
                <div className="flex items-center justify-center px-4">
                    <div className="container bg-[#4d4c4c2b] min-h-[400px] max-h-[600px] pt-[50px] rounded-lg shadow-xl p-6 sm:p-8">
                        <div className="text-center text-[#C7C7C7]">
                            <div className="mb-6">
                                <MailOutlined className="text-6xl text-[#BF3206] mb-4" />
                            </div>
                            
                            <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold mb-4">
                                Check Your Email
                            </h1>
                            
                            <p className="text-[16px] sm:text-[18px] lg:text-[20px] mb-6 leading-relaxed">
                                We've sent a password reset link to your email address. 
                                Please check your inbox and follow the instructions to reset your password.
                            </p>
                            
                            <p className="text-[14px] sm:text-[16px] text-[#C7C7C7] mb-8">
                                Didn't receive the email? Check your spam folder or try again.
                            </p>
                            
                            <div className="space-y-4">
                                <Link href={`/${lang}/auth/signIn`}>
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        className="bg-[#BF3206] hover:bg-[#a02a05] border-none text-white px-8 py-3 h-auto text-[16px] sm:text-[18px] font-semibold"
                                    >
                                        <ArrowLeftOutlined className="mr-2" />
                                        Back to Sign In
                                    </Button>
                                </Link>
                                
                                <div>
                                    <Button 
                                        type="link" 
                                        onClick={() => setEmailSent(false)}
                                        className="text-[#BF3206] hover:text-[#a02a05] text-[14px] sm:text-[16px]"
                                    >
                                        Try Different Email
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#211d1dfc] signIn-background min-h-screen py-[120px] sm:py-[150px] lg:py-[180px]">
            <div className="flex items-center justify-center px-4">
                <div className="container bg-[#4d4c4c2b] min-h-[400px] max-h-[600px] pt-[50px] rounded-lg shadow-xl p-6 sm:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] text-[#C7C7C7] font-bold mb-4">
                            Forgot Password?
                        </h1>
                        <p className="text-[16px] sm:text-[18px] text-[#C7C7C7] leading-relaxed">
                            No worries! Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <div className="signIn-form w-full max-w-[400px] mx-auto">
                        <Form
                            name="forgotPassword"
                            onFinish={onFinish}
                            className="space-y-4"
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Please enter your email!" },
                                    { type: 'email', message: "Please enter a valid email!" }
                                ]}
                            >
                                <Input
                                    placeholder={dict?.email || "Email address"}
                                    prefix={<MailOutlined className="text-[#BF3206]" />}
                                    className="p-3 rounded-lg h-[50px] border border-gray-300 focus:border-[#BF3206] text-[16px]"
                                />
                            </Form.Item>

                            {error && (
                                <div className="text-red-500 text-center text-[14px] sm:text-[16px]">
                                    {error}
                                </div>
                            )}

                            <Form.Item className="mb-4">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    disabled={loading}
                                    className="bg-[#BF3206] hover:bg-[#a02a05] border-none w-full h-[50px] text-[16px] sm:text-[18px] font-semibold rounded-lg"
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="text-center mt-6">
                            <Link href={`/${lang}/auth/signIn`}>
                                <Button 
                                    type="link" 
                                    className="text-[#C7C7C7] hover:text-[#BF3206] text-[14px] sm:text-[16px]"
                                >
                                    <ArrowLeftOutlined className="mr-2" />
                                    Back to Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
