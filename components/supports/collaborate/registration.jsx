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
            <VolRegistration loading={loading} onFinish={onFinish} error={error} onFinishFailed={onFinishFailed} />
        </div>
    );
};

export default Registration;