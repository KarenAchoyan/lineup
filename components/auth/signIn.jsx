"use client";
import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useApp } from "@/providers/AppProvider";

const SignIn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { lang } = useApp();
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch("https://lineup.dahk.am/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                document.cookie = `authToken=${JSON.stringify({
                    user_id: data.user.id,
                    token: data.token,
                    name: data.user.name,
                    parent_name: data.user.parent_name,
                    email: data.user.email
                })}; path=/; Secure; SameSite=Strict`;
                router.push("/profile");
            } else {
                setError(data.message || "Invalid credentials")
            }
        } catch (error) {
            setError(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#211d1dfc] signIn-background h-screen py-[180px]">
            <div className="flex items-center justify-center">
                <div className="container bg-[#4d4c4c2b] h-[70vh] pt-[50px] rounded-lg shadow-xl p-8">
                    <h1 className="text-[40px] text-[#C7C7C7] text-center">Welcome to Lineup</h1>
                    <h2 className="text-center text-[#C7C7C7] text-[24px]">Log in to your account</h2>

                    <div className="signIn-form w-[350px] mt-[70px] m-auto">
                        <Form
                            name="signin"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            className="space-y-4"
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: "Please enter your email!" }]}
                            >
                                <Input
                                    placeholder="Email"
                                    className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please enter your password!" }]}
                            >
                                <Input.Password
                                    placeholder="Password"
                                    className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"
                                />
                            </Form.Item>
                            {error && <p className='text-red-500'>{error}</p>}

                            <div className="text-center text-gray-400 mt-4">
                                <a href="#" className="text-blue-400 hover:text-blue-500">
                                    Forgot password?
                                </a>
                            </div>

                            <div className="mt-[180px]">
                                <Form.Item>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#F15A2B] hover:bg-[#4D4C4C] cursor-pointer text-[25px] w-full text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 "
                                    >
                                        {loading ? "Signing In..." : "Sign In"}
                                    </button>
                                </Form.Item>
                            </div>
                        </Form>

                        <div className="text-center text-gray-400 mt-2">
                            Don't have an account?{" "}
                            <a href={"/auth/signUp"} className="text-blue-400 hover:text-blue-500">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
