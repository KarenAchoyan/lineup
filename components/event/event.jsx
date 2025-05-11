"use client"
import {useContext, useEffect, useState} from 'react';
import CustomCalendar from "@/components/event/customCalendar";
import {MainContext} from "@/providers/HomeProvider";
import parse from "html-react-parser";
import {parseHTMLToText, truncateText} from "@/utils/utils";

const CalendarEvent = () => {
    const {events, dict, lang} = useContext(MainContext);

    const [selectedDate, setSelectedDate] = useState();
    const [nextTicket, setNextTicket] = useState(null);

    const [dates] = useState(function () {
        return events.map((ticket) => {
            const date = new Date(ticket?.event_date);
            const formattedDate = date.toLocaleDateString('en-GB'); // 'en-GB' provides the 'DD/MM/YYYY' format
            const formattedDateWithDash = formattedDate.replace(/\//g, '-');
            return formattedDateWithDash;
        });
    });

    useEffect(() => {
        if (!selectedDate) return;

        const fetchTicket = async () => {
            try {
                const res = await fetch(`/api/events?date=${selectedDate}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setNextTicket(data);
            } catch (error) {
                console.error('Error fetching ticket:', error);
                setNextTicket(null);
            }
        };

        fetchTicket();
    }, [selectedDate]);

    useEffect(() => {
        setSelectedDate(events[0]?.event_date);
    },[events])

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    const content = (lang.toLowerCase() === "hy") ? parseHTMLToText(nextTicket?.content) : lang.toLowerCase() === "ge" ? parseHTMLToText(nextTicket?.content_ge) : lang.toLowerCase() === "ru" ? parseHTMLToText(nextTicket?.content_ru) : parseHTMLToText(nextTicket?.content_en);

    return (
        <div className='bg-[#232222] pb-[50px]'>
            <div
                className="container m-auto  bg-cover bg-center bg-[#4D4C4C] p-[20px] pb-[80px] rounded-2xl border-t-2 border-[#BF3206]">
                <h1 className='text-[#C7C7C7] font-bold mb-6 text-center text-[30px] md:text-[45px]'>{dict.events}</h1>
                <div
                    className="w-full lg:w-[max-content] m-auto flex flex-wrap gap-10 bg-opacity-50 rounded-2xl text-white">
                    <div
                        className="w-full h-auto lg:w-[340px] lg:h-[700px] p-5 rounded-xl border-[5px] bg-[#4d5457] border-[#434343] shadow-[2px_16px_19px_0px_#00000017] backdrop-blur-[80px] mb-10 sm:mb-0">
                        <CustomCalendar onDateChange={onDateChange} dates={dates}/>
                    </div>

                    <div
                        className="p-5 rounded-xl border-[#434343] bg-[#4d5457] border-[5px] px-[60px] shadow-lg w-full lg:w-[630px]">

                        { nextTicket?.avatar  &&
                                <img
                                    src={process.env.IMAGE_URL + nextTicket?.avatar}
                                    alt="Event"
                                    className="rounded-xl mb-5 w-full"
                                />
                           }
                        <h3 className="text-lg font-semibold mb-3">{ nextTicket?.event_date}</h3>
                        <p className="text-sm text-gray-300">
                            {content}
                        </p>
                        {/*<a href="#"*/}
                        {/*   className="text-orange-400 mt-5 block hover:underline text-right">{dict.read_more}...</a>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarEvent;
