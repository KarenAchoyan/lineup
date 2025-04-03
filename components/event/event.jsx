"use client"
import {DatePicker} from 'antd';
import {useContext, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import CustomCalendar from "@/components/event/customCalendar";
import {MainContext} from "@/providers/HomeProvider";

const CalendarEvent = () => {
    const {events} = useContext(MainContext);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [firstTicket, setFirstTicket] = useState();
    const [dates] = useState(function (){
        return events.map((ticket)=>{
            const date = new Date(ticket.event_date);
            const formattedDate = date.toLocaleDateString('en-GB'); // 'en-GB' provides the 'DD/MM/YYYY' format
            const formattedDateWithDash = formattedDate.replace(/\//g, '-');
            return formattedDateWithDash;
        });
    });

    useEffect(() => {
        setFirstTicket(events[0])
    },[events])


    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className='bg-[#232222] pb-[50px]'>
            <div
                className="container m-auto  bg-cover bg-center bg-[#4D4C4C] p-[20px] pb-[80px] rounded-2xl border-t-2 border-[#BF3206]">
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[30px] md:text-[45px]'>Events</h1>
                <div className="w-full sm:w-[max-content] m-auto flex flex-wrap gap-10  bg-opacity-50 rounded-2xl text-white">
                    <div
                        className="w-full h-auto sm:w-[340px] sm:h-[700px] p-5 rounded-xl border-[5px] bg-[#4d5457] border-[#434343] shadow-[2px_16px_19px_0px_#00000017] backdrop-blur-[80px] mb-10 sm:mb-0">
                        <CustomCalendar dates={dates}/>
                    </div>

                    <div
                        className="p-5 rounded-xl border-[#434343] bg-[#4d5457] border-[5px] px-[60px] shadow-lg w-full sm:w-[630px]">

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
