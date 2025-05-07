"use client"
import React, {useContext, useState} from 'react';
import VolRegistration from "@/components/supports/volRegistration";
import {useRouter} from "next/navigation";
import {message} from "antd";
import {VolunteeringContext} from "@/providers/Volunteering";

const Registration = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {dict} = useContext(VolunteeringContext);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch("https://lineup.dahk.am/api/contact", {
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
                setSubmitted(true);
            } else {
                message.error(data.message || "Ուղարկման սխալ։");
            }
    
        } catch (err) {
            console.error("Error during contact form submission:", err);
            setError("Ուղարկման սխալ։");
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
                        {!submitted ? (
                            <>
                                <h1 className="text-[40px] text-[#C7C7C7] text-center">{dict.volunteering}</h1>
                                <VolRegistration 
                                    loading={loading} 
                                    onFinish={onFinish} 
                                    dict={dict} 
                                    error={error}
                                    onFinishFailed={onFinishFailed}
                                />
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <h2 className="text-[40px] text-[#F15A2B] mb-4">Շնորհակալություն</h2>
                                <p className="text-[#C7C7C7] text-xl">գրանցվելու համար</p>
                                <div className="mt-8">
                                    <svg className="mx-auto h-16 w-16 text-[#F15A2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;