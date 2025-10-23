"use client";
import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockOutlined, CheckCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const ResetPassword = ({ dict, lang, token }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [passwordReset, setPasswordReset] = useState(false);
    const [error, setError] = useState(null);
    const [tokenValid, setTokenValid] = useState(true);

    useEffect(() => {
        if (!token) {
            setTokenValid(false);
            setError("Invalid or missing reset token");
        }
    }, [token]);

    const onFinish = async (values) => {
        if (!token) {
            setError("Invalid reset token");
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    token: token,
                    password: values.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPasswordReset(true);
                message.success('Password reset successfully!');
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

    if (passwordReset) {
        return (
            <div className="bg-[#211d1dfc] signIn-background min-h-screen py-[120px] sm:py-[150px] lg:py-[180px]">
                <div className="flex items-center justify-center px-4">
                    <div className="container bg-[#4d4c4c2b] min-h-[400px] max-h-[600px] pt-[50px] rounded-lg shadow-xl p-6 sm:p-8">
                        <div className="text-center text-[#C7C7C7]">
                            <div className="mb-6">
                                <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
                            </div>
                            
                            <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold mb-4 text-green-500">
                                Password Reset Successful!
                            </h1>
                            
                            <p className="text-[16px] sm:text-[18px] lg:text-[20px] mb-8 leading-relaxed">
                                Your password has been successfully reset. You can now sign in with your new password.
                            </p>
                            
                            <div className="space-y-4">
                                <Link href={`/${lang}/auth/signIn`}>
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        className="bg-[#BF3206] hover:bg-[#a02a05] border-none text-white px-8 py-3 h-auto text-[16px] sm:text-[18px] font-semibold"
                                    >
                                        Go to Sign In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!tokenValid) {
        return (
            <div className="bg-[#211d1dfc] signIn-background min-h-screen py-[120px] sm:py-[150px] lg:py-[180px]">
                <div className="flex items-center justify-center px-4">
                    <div className="container bg-[#4d4c4c2b] min-h-[400px] max-h-[600px] pt-[50px] rounded-lg shadow-xl p-6 sm:p-8">
                        <div className="text-center text-[#C7C7C7]">
                            <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] font-bold mb-4 text-red-500">
                                Invalid Reset Link
                            </h1>
                            
                            <p className="text-[16px] sm:text-[18px] lg:text-[20px] mb-8 leading-relaxed">
                                This password reset link is invalid or has expired. Please request a new password reset.
                            </p>
                            
                            <div className="space-y-4">
                                <Link href={`/${lang}/auth/forgot-password`}>
                                    <Button 
                                        type="primary" 
                                        size="large"
                                        className="bg-[#BF3206] hover:bg-[#a02a05] border-none text-white px-8 py-3 h-auto text-[16px] sm:text-[18px] font-semibold"
                                    >
                                        Request New Reset Link
                                    </Button>
                                </Link>
                                
                                <div>
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
            </div>
        );
    }

    return (
        <div className="bg-[#211d1dfc] signIn-background min-h-screen py-[120px] sm:py-[150px] lg:py-[180px]">
            <div className="flex items-center justify-center px-4">
                <div className="container bg-[#4d4c4c2b] min-h-[400px] max-h-[600px] pt-[50px] rounded-lg shadow-xl p-6 sm:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-[24px] sm:text-[32px] lg:text-[40px] text-[#C7C7C7] font-bold mb-4">
                            Reset Your Password
                        </h1>
                        <p className="text-[16px] sm:text-[18px] text-[#C7C7C7] leading-relaxed">
                            Enter your new password below. Make sure it's secure and easy to remember.
                        </p>
                    </div>

                    <div className="signIn-form w-full max-w-[400px] mx-auto">
                        <Form
                            name="resetPassword"
                            onFinish={onFinish}
                            className="space-y-4"
                        >
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: "Please enter your new password!" },
                                    { min: 6, message: "Password must be at least 6 characters!" }
                                ]}
                            >
                                <Input.Password
                                    placeholder="New Password"
                                    prefix={<LockOutlined className="text-[#BF3206]" />}
                                    className="p-3 rounded-lg h-[50px] border border-gray-300 focus:border-[#BF3206] text-[16px]"
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: "Please confirm your password!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    placeholder="Confirm New Password"
                                    prefix={<LockOutlined className="text-[#BF3206]" />}
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
                                    {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
