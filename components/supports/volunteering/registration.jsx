"use client"
import React, {useState} from 'react';
import VolRegistration from "@/components/supports/volRegistration";
import {useRouter} from "next/navigation";
import {message} from "antd";

const Registration = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);
    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://lineup.dahk.am/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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

            if (response.ok) {
                document.cookie = `authToken=${data.token}; path=/; Secure; SameSite=Strict`; // Store in cookies
                message.success("Registration successful! Redirecting...");
                router.push("/profile");
            } else {
                message.error(data.message || "Registration failed!");
            }

        } catch (err) {
            console.error("Error during registration:", err);
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <div className="bg-[#211d1dfc] signIn-background py-[180px] pb-[50px]">
                <div className="flex items-center justify-center">
                    <div className="container bg-[#4d4c4c2b] mb-[50px] pt-[30px] rounded-lg shadow-xl p-8">
                        <h1 className="text-[40px] text-[#C7C7C7] text-center">Volunteering</h1>
                        <VolRegistration loading={loading} onFinish={onFinish} error={error}
                                         onFinishFailed={onFinishFailed}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;