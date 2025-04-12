"use client";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const CustomCalendar = ({ dates,onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleDateClick = (day) => {
        const isEvent = dates.some((eventDate) =>
            dayjs(eventDate, "DD-MM-YYYY").isSame(day, "date")
        );

        if (isEvent) {
            onDateChange(day.format("YYYY-MM-DD"))
        }
        setSelectedDate(day);
    };

    const handleNextMonth = () => {
        setSelectedDate(selectedDate.add(1, "month").startOf("month"));
    };

    const handlePrevMonth = () => {
        setSelectedDate(selectedDate.subtract(1, "month").startOf("month"));
    };

    const generateDays = () => {
        const startOfMonth = selectedDate.startOf("month");
        const endOfMonth = selectedDate.endOf("month");

        const days = [];

        // Add empty slots before the first day of the month
        for (let i = 0; i < startOfMonth.day(); i++) {
            days.push(<div key={`empty-${i}`} className="text-gray-400"></div>);
        }

        // Generate actual days
        for (let day = 1; day <= endOfMonth.date(); day++) {
            const currentDay = selectedDate.date(day);
            const isSelected = currentDay.isSame(selectedDate, "day");
            const isEvent = dates.some((eventDate) =>
                dayjs(eventDate, "DD-MM-YYYY").isSame(currentDay, "date")
            );

            days.push(
                <div
                    key={day}
                    className={`text-white flex items-center justify-center cursor-pointer w-10 h-10 rounded-full 
            ${isSelected ? "bg-[#82181a] text-white" : isEvent ? "bg-[#F15A2B] text-white" : "hover:bg-gray-200"}`}
                    onClick={() => handleDateClick(currentDay)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="p-1 rounded-xl w-72 border-0">
            <div className="flex justify-between items-center mb-5">
                <button onClick={handlePrevMonth} className="text-[#82181a] hover:text-orange-700">
                    ◀
                </button>
                <h2 className="text-white text-2xl font-bold">{selectedDate.format("MMMM YYYY")}</h2>
                <button onClick={handleNextMonth} className="text-[#82181a] hover:text-orange-700">
                    ▶
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
                {"SUN MON TUE WED THU FRI SAT".split(" ").map((day) => (
                    <div key={day} className="font-bold text-sm text-white">
                        {day}
                    </div>
                ))}
                {generateDays()}
            </div>
        </div>
    );
};

export default CustomCalendar;
