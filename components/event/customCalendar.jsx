"use client"
import { useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);


const CustomCalendar = ({dates }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    console.log(dates)
    const handleDateClick = (day) => {
        const dayName = day.format('D');
        const isEvent =dates.filter(eventDate =>  eventDate.split('-')[0]===dayName).length>0;
        if (isEvent) {
            alert(`Event on ${day.format('DD-MM-YYYY')}`);
        }
        setSelectedDate(day);
    };

    const handleNextMonth = () => {
        setSelectedDate(selectedDate.add(1, 'month'));
    };

    const handlePrevMonth = () => {
        setSelectedDate(selectedDate.subtract(1, 'month'));
    };

    const generateDays = () => {
        const startOfMonth = dayjs(selectedDate).startOf('month');
        const endOfMonth = dayjs(selectedDate).endOf('month');

        const days = [];

        for (let i = 0; i < startOfMonth.day(); i++) {
            days.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
        }

        // Add actual days
        for (let day = 1; day <= endOfMonth.date(); day++) {
            const currentDay = dayjs(selectedDate).set('date', day);
            const isSelected = currentDay.isSame(selectedDate, 'day');
            const isEvent = dates.filter(eventDate =>  +eventDate.split('-')[0]===day).length>0;
            days.push(
                <div
                    key={day}
                    className={`text-black flex items-center justify-center cursor-pointer w-10 h-10 rounded-full ${isSelected ? 'bg-[#82181a] text-white' : isEvent ? 'bg-green-500 text-white' : 'hover:bg-gray-200'}`}
                    onClick={() => handleDateClick(currentDay)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="p-1 rounded-xl  w-72 border-0">
            <div className="flex justify-between items-center mb-5 ">
                <button onClick={handlePrevMonth} className="text-[#82181a] hover:text-orange-700">◀</button>
                <h2 className="text-black text-2xl font-bold">{selectedDate.format('MMMM YYYY')}</h2>
                <button onClick={handleNextMonth} className="text-[#82181a] hover:text-orange-700">▶</button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {"SUN MON TUE WED THU FRI SAT".split(" ").map((day) => (
                    <div key={day} className="font-bold text-sm text-black">{day}</div>
                ))}
                {generateDays()}
            </div>
        </div>
    );
};

export default CustomCalendar;
