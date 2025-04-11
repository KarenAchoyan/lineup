import React from 'react';
import {PhoneOutlined} from "@ant-design/icons";
import parse from "html-react-parser";

const RefundReturn = ({dict, about, lang}) => {
    const content = (lang.toLowerCase() === "hy") ? about.refund_text_hy : lang.toLowerCase() === "ge" ? about.refund_text_ge : lang.toLowerCase() === "ru" ? about.refund_text_ru : about.refund_text_en;

    return (
        <div className="bg-[#211d1dfc] py-[180px]">
            <div className='flex items-center justify-center'>
                <div className="container bg-[#4d4c4c2b] min-h-[70vh] pt-[50px] rounded-lg shadow-xl p-8 text-white">
                    {parse(content)}
                </div>
            </div>
        </div>
    );
};

export default RefundReturn;