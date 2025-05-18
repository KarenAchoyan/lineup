"use client"
import React, {useContext, useState} from 'react';
import VolRegistration from "@/components/supports/volRegistration";
import {useRouter} from "next/navigation";
import {message} from "antd";
import {CollaborationContext} from "@/providers/CollaborationProvider";

const Registration = ({dict}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);
    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/submitContactForm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject: values.subject,
                    phone: values.phone,
                    email: values.email,
                    message: values.message,
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
            <VolRegistration loading={loading}  onFinish={onFinish} error={error} dict={dict} onFinishFailed={onFinishFailed} />
        </div>
    );
};

export default Registration;