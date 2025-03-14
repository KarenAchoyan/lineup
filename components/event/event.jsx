"use client"
import { DatePicker } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import CustomCalendar from "@/components/event/customCalendar";

const CalendarEvent = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="h-[800px] my-5 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/back.png')" }}>
            <div className="flex gap-10 p-10 bg-opacity-50 rounded-2xl text-white">
                <div
                    className="h-[700px] p-5 rounded-xl border-[5px] border-[#F15A2B] shadow-[2px_16px_19px_0px_#00000017] backdrop-blur-[80px]"
                >
                    <CustomCalendar />
                </div>



                {/* Event Details */}
                <div className="p-5 rounded-xl border border-orange-500 shadow-lg w-96">
                    <img
                        src="/dance-event.jpg"
                        alt="Event"
                        className="rounded-xl mb-5"
                    />
                    <h3 className="text-lg font-semibold mb-3">{selectedDate?.format('MMMM DD, YYYY')}</h3>
                    <p className="text-sm text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a href="#" className="text-orange-400 mt-5 block hover:underline">Read more...</a>
                </div>
            </div>
        </div>
    );
};

export default CalendarEvent;
