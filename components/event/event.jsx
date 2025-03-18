"use client"
import {DatePicker} from 'antd';
import {useState} from 'react';
import dayjs from 'dayjs';
import CustomCalendar from "@/components/event/customCalendar";

const CalendarEvent = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className='bg-[#232222] pb-[50px]'>
            <div className="container m-auto  bg-cover bg-center bg-[#4D4C4C] p-[20px] pb-[80px] rounded-2xl border-t-2 border-[#BF3206]">
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[45px]'>Events</h1>
                <div className="w-[max-content] m-auto flex gap-10  bg-opacity-50 rounded-2xl text-white">
                    <div
                        className="w-[340px] h-[700px] p-5 rounded-xl border-[5px] bg-[#4d5457] border-[#434343] shadow-[2px_16px_19px_0px_#00000017] backdrop-blur-[80px]"
                    >
                        <CustomCalendar/>
                    </div>


                    {/* Event Details */}
                    <div className="p-5 rounded-xl  border-[#434343] bg-[#4d5457] border-[5px] px-[60px] shadow-lg w-[630px]">
                        <img
                            src="/back.png"
                            alt="Event"
                            className="rounded-xl mb-5 w-full"
                        />
                        <h3 className="text-lg font-semibold mb-3">{selectedDate?.format('MMMM DD, YYYY')}</h3>
                        <p className="text-sm text-gray-300">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </p>
                        <a href="#" className="text-orange-400 mt-5 block hover:underline text-right">Read more...</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarEvent;
