"use client";
import React, { useState } from "react";
import { Form, Button, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useApp } from "@/providers/AppProvider";

const SignIn = ({dict}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { lang } = useApp();
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const cookieData = JSON.stringify({
                    user_id: data.user.id,
                    token: data.token,
                    name: data.user.name,
                    parent_name: data.user.parent_name,
                    email: data.user.email
                });
                const expires = new Date();
                expires.setDate(expires.getDate() + 7); // 7 days expiry
                
                document.cookie = `authToken=${encodeURIComponent(cookieData)}; path=/; expires=${expires.toUTCString()}; Secure; SameSite=Strict`;
                window.location='/profile';
            } else {
                setError(data.error || "Invalid credentials")
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
                <div className="container bg-[#4d4c4c2b] min-h-[70vh] pt-[50px] rounded-lg shadow-xl p-8">
                    <h1 className="text-[24px] sm:text-[40px] text-[#C7C7C7] text-center">{dict.welcome_to_lineup}</h1>
                    <h2 className="text-center text-[#C7C7C7] text-[20px]  sm:text-[24px]">{dict.log_in_to_your_account}</h2>

                    <div className="signIn-form w-full  sm:w-[350px] mt-[70px] m-auto">
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
                                    placeholder={dict.email}
                                    className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please enter your password!" }]}
                            >
                                <Input.Password
                                    placeholder={dict.password}
                                    className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"
                                />
                            </Form.Item>
                            {error && <p className='text-red-500'>{error}</p>}

                            <div>
                                <Form.Item>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#F15A2B] w-full  text-[18px]  sm:text-[25px]  text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:bg-[#FF6347]"
                                    >
                                        {loading ? dict.sign_in+"..." : dict.sign_in}
                                    </button>
                                </Form.Item>
                            </div>
                        </Form>

                        <div className="text-center text-gray-400 mt-2">
                            {dict.dont_have_an_account_sign_up}
                            <a href={"/auth/signUp"} className="text-blue-400 hover:text-blue-500">
                                { dict.sign_up}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
