"use client";
import React, {useState} from "react";
import {Form, Input, Button, message} from "antd";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useApp} from "@/providers/AppProvider";
import {sendMail} from "@/lib/send-mail";

async function sendMailHandler() {
    const DEFAULT_RECEIVER = "geeklabdevelopment@gmail.com"; // Replace with a valid email

    const responseMail = await sendMail({
        email: 'geeklabdevelopment@gmail.com' || DEFAULT_RECEIVER,
        subject: "New Contact Form Submission",
        text: 'Դուք հաջողությամբ գրանցվեցիք',
    });
}

const SignUp = ({dict}) => {
    const [loading, setLoading] = useState(false);
    const [errorData, setErrorData] = useState({});

    const router = useRouter();

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
            const DEFAULT_RECEIVER = "geeklabdevelopment@gmail.com"; // Replace with a valid email

            if (response.ok) {
                document.cookie = `authToken=${JSON.stringify({user_id:data.user.id, token:data.token, name: data.user.name, parent_name: data.user.parent_name, email:data.user.email })}; path=/; Secure; SameSite=Strict`;

                await sendMail({
                    email: values.email || DEFAULT_RECEIVER,
                    subject: "New Contact Form Submission",
                    html: `
                        <h2>Հարգելի Karen դուք հաջողությամբ գրանցվեցիք</h2>
                        <h3>Մեր մասնագետները կապ կհաստատեն Ձեզ հետ</h3>                    
                `,
                });

                router.push("/profile");
            } else {
                setErrorData(data.errors)
            }

        } catch (err) {
            console.error("Error during registration:", err);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="bg-[#211d1dfc] signIn-background py-[180px] pb-[50px]">
            <div className="flex items-center justify-center">
                <div className="container bg-[#4d4c4c2b] mb-[50px] pt-[30px] rounded-lg shadow-xl p-8">
                    <h1 className="text-[24px] sm:text-[40px] text-[#C7C7C7] text-center">{dict.welcome_to_lineup}</h1>

                    <div className="signIn-form w-full sm:w-[350px] mt-[70px] m-auto">
                            <div className="text-red-500 text-center mb-4">{errorData['email']}</div>
                        <Form
                            name="signup"
                            initialValues={{remember: true}}
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
                                <Input placeholder={dict.full_name_of_student} className="p-2 rounded-md h-[45px]"/>
                            </Form.Item>

                            <Form.Item
                                name="parentName"
                                rules={[
                                    {required: true, message: "Please enter parent's full name!"},
                                    {validator: validateEnglishOnly}
                                ]}
                            >
                                <Input placeholder={dict.full_name_of_parent} className="p-2 rounded-md h-[45px]"/>
                            </Form.Item>

                            <Form.Item
                                name="parentPhone"
                                rules={[{required: true, message: "Please enter parent's phone number!"}]}
                            >
                                <Input placeholder={dict.parents_phone_number} className="p-2 rounded-md h-[45px]"/>
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[{
                                    required: true,
                                    type: 'email',
                                    message: "Please enter a valid email address!"
                                }]}
                            >
                                <Input placeholder={dict.email_address} className="p-2 rounded-md h-[45px]"/>
                            </Form.Item>

                            <Form.Item
                                name="parentId"
                                rules={[{required: true, message: "Please enter Parent ID!"}]}
                            >
                                <Input placeholder={dict.parent_id} className="p-2 rounded-md h-[45px]"/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{required: true, message: "Please enter your password!"}]}
                            >
                                <Input.Password placeholder={dict.password} className="p-2 rounded-md h-[45px]"/>
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
                                <Input.Password placeholder={dict.confirm_password} className="p-2 rounded-md h-[45px]"/>
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
                                        className="bg-[#F15A2B] cursor-pointer w-full  text-[18px]  sm:text-[25px]  text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 hover:bg-[#FF6347]"
                                        disabled={loading}
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
