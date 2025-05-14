"use client";
import React, {useState} from "react";
import {Form, Input, Button, message} from "antd";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useApp} from "@/providers/AppProvider";

async function sendMailHandler() {
    const DEFAULT_RECEIVER = "geeklabdevelopment@gmail.com"; // Replace with a valid email


}

const SignUp = ({dict}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorData, setErrorData] = useState(null);

    // Function to validate English characters only
    const validateEnglishOnly = (_, value) => {
        if (!value) return Promise.resolve();
        const armenianRegex = /^[\u0531-\u0556\u0561-\u0587\s]*$/;
        if (!armenianRegex.test(value)) {
            return Promise.reject(new Error('Խնդրում ենք օգտագործել միայն հայերեն տառեր'));
        }
        return Promise.resolve();
    };

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    studentName: values.studentName,
                    parent_name: values.parentName,
                    parent_phone: values.parentPhone,
                    email: values.email,
                    parent_id: values.parentId,
                    password: values.password,
                    password_confirmation: values.confirmPassword,
                }),
            });
            const data = await response.json();
            const DEFAULT_RECEIVER = "geeklabdevelopment@gmail.com";

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
                router.push("/profile");
            } else {
                setErrorData(data.errors || { general: data.error });
            }
        } catch (err) {
            console.error("Error during registration:", err);
            setErrorData({ general: "Registration failed. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="bg-[#211d1dfc] signIn-background h-screen py-[180px]">
            <div className="flex items-center justify-center">
                <div className="container bg-[#4d4c4c2b] min-h-[70vh] pt-[50px] rounded-lg shadow-xl p-8">
                    <h1 className="text-[24px] sm:text-[40px] text-[#C7C7C7] text-center">{dict.welcome_to_lineup}</h1>
                    <h2 className="text-center text-[#C7C7C7] text-[20px] sm:text-[24px]">{dict.create_an_account}</h2>

                    <div className="signIn-form w-full sm:w-[350px] mt-[70px] m-auto">
                        {errorData && (
                            <div className="text-red-500">
                                {errorData.general && <p>{errorData.general}</p>}
                                {Object.entries(errorData).map(([field, errors]) => {
                                    if (field !== 'general' && Array.isArray(errors)) {
                                        return errors.map((error, index) => (
                                            <p key={`${field}-${index}`}>{error}</p>
                                        ));
                                    }
                                    return null;
                                })}
                            </div>
                        )}
                        <Form
                            name="signup"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="space-y-4"
                        >
                            <Form.Item
                                name="studentName"
                                rules={[
                                    {required: true, message: "Please enter student's full name!"},
                                    {validator: validateEnglishOnly}
                                ]}
                            >
                                <Input placeholder={dict.full_name_of_student} className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"/>
                            </Form.Item>

                            <Form.Item
                                name="parentName"
                                rules={[
                                    {required: true, message: "Please enter parent's full name!"},
                                    {validator: validateEnglishOnly}
                                ]}
                            >
                                <Input placeholder={dict.full_name_of_parent} className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"/>
                            </Form.Item>

                            <Form.Item
                                name="parentPhone"
                                rules={[{required: true, message: "Please enter parent's phone number!"}]}
                            >
                                <Input placeholder={dict.parents_phone_number} className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"/>
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {required: true, type: 'email', message: "Please enter a valid email address!"}
                                ]}
                            >
                                <Input placeholder={dict.email_address} className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"/>
                            </Form.Item>

                            <Form.Item
                                name="parentId"
                                rules={[{required: true, message: "Please enter Parent ID!"}]}
                            >
                                <Input placeholder={dict.parent_id} className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {required: true, message: "Please enter your password!"},
                                    {min: 6, message: "Password must be at least 6 characters!"}
                                ]}
                            >
                                <Input.Password placeholder={dict.password} className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"/>
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                dependencies={["password"]}
                                rules={[
                                    {required: true, message: "Please confirm your password!"},
                                    ({getFieldValue}) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Passwords do not match!"));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder={dict.confirm_password} className="p-2 rounded-md h-[45px] border border-gray-300 focus:border-red-500"/>
                            </Form.Item>

                            <div className="text-center text-[#BBBBBB] mt-4">
                                <Link href="/refund_return" className="text-[#BBBBBB] link-term">
                                    {dict.terms_and_conditions || 'Refund & Return Policy'}
                                </Link>
                            </div>

                            <div>
                                <Form.Item>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#F15A2B] w-full text-[18px] sm:text-[25px] text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:bg-[#FF6347]"
                                    >
                                        {loading ? dict.sign_up+"..." : dict.sign_up}
                                    </button>
                                </Form.Item>
                            </div>
                        </Form>

                        <div className="text-center text-gray-400 mt-2">
                            {dict.already_have_an_account_sign_in}<Link href={`/auth/signIn`}
                                                           className="text-[#F15A2B] hover:text-[#F15A2B]">{dict.sign_in}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
