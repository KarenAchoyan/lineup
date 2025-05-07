"use client"
import React, {useContext, useState} from 'react';
import {Form, Input, message} from "antd";
import {useRouter} from "next/navigation";
import {CollaborationContext} from "@/providers/CollaborationProvider";

const VolRegistration = ({loading, onFinish, error, onFinishFailed, dict}) => {

    return (
        <div className="signIn-form w-[350px] mt-[70px] m-auto">
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <Form
                name="signup"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="space-y-4"
            >
               <Form.Item
                    name="subject"
                    rules={[{required: true, message: "Խնդրում ենք լրացնել վերնագիրը։"}]}
                >
                    <Input placeholder={dict.full_name + "..."} className="p-2 rounded-md h-[45px]" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    rules={[{required: true, message: "Խնդրում ենք նշել հեռախոսահամարը։"}]}
                >
                    <Input placeholder={dict.phone_number + "..."} className="p-2 rounded-md h-[45px]" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{
                        required: true,
                        type: 'email',
                        message: "Խնդրում ենք նշել վավեր էլ․ փոստ։"
                    }]}
                >
                    <Input placeholder={dict.email_address_c + "..."} className="p-2 rounded-md h-[45px]" />
                </Form.Item>

                <Form.Item
                    name="message"
                    rules={[{required: true, message: "Խնդրում ենք լրացնել նամակը։"}]}
                >
                    <Input.TextArea placeholder={dict.cover_letter + "..."} className="p-2 rounded-md" rows={4} />
                </Form.Item>


                <div>
                    <Form.Item>
                        <button
                            type="submit"
                            className="bg-[#F15A2B] hover:bg-[#4D4C4C] cursor-pointer  text-[25px] w-full text-white py-2 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 "
                            disabled={loading}
                        >
                            {loading ? dict.button_text_col+"..." : dict.button_text_col}
                        </button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};

export default VolRegistration;