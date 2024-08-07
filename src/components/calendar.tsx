"use client"
import React, { useState } from 'react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const Calendar = () => {
    const currentDate = new Date();

    // State for selected date
    const [selectedDate, setSelectedDate] = useState(currentDate);

    // Function to handle date selection
    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
    };

    // Function to generate an array of dates for the current month
    const generateMonthDates = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const days = [];
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const date = new Date(year, month, i);
            days.push(date);
        }

        // Add empty slots for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            days.unshift(null);
        }

        return days;
    };

    // Generate the array of dates for the current month
    const monthDates = generateMonthDates();

    // Function to handle moving to the previous month
    const goToPreviousMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
    };

    // Function to handle moving to the next month
    const goToNextMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
    };

    // Format month and year with localization
    const monthYear = format(selectedDate, 'LLLL yyyy', { locale: enUS });

    return (
        <div className="calendar-component">
            <div className="grid w-[500px] h-[550px] max-[1342px]:w-full bg-white rounded-xl p-5">
                {/* Display month and year */}
                <div className="flex justify-between mb-7 items-center">
                    <button 
                        aria-label="Previous month" 
                        className="text-[23px] font-sans text-blue-500 p-2 rounded-lg border font-semibold"
                        onClick={goToPreviousMonth}
                    >
                        <svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="15 6 9 12 15 18" /></svg>
                    </button>
                    <h2 
                        aria-live="polite"
                        className="mb-3 font-sans text-gray-800 font-semibold"
                    >
                        {monthYear}
                    </h2>
                    <button 
                        aria-label="Next month" 
                        className="text-[23px] font-sans text-blue-500 p-2 rounded-lg border font-semibold"
                        onClick={goToNextMonth}
                    >
                        <svg className="h-6 w-6"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </div>
                {/* Display calendar */}
                {/* Day names */}
                <div className="grid grid-cols-7" role="row">
                    <div role="columnheader" className="font-sans text-gray-300 font-medium">SUN</div>
                    <div role="columnheader" className="font-sans text-gray-300 font-medium">MON</div>
                    <div role="columnheader" className="font-sans text-gray-300 font-medium">TUE</div>
                    <div role="columnheader" className="font-sans text-gray-300 font-medium">WED</div>
                    <div role="columnheader" className="font-sans text-gray-300 font-medium">THU</div>
                    <div role="columnheader" className="font-sans text-gray-300 font-medium">FRI</div>
                    <div role="columnheader" className="font-sans text-gray-300 font-medium">SAT</div>
                </div>
                <div className="grid grid-cols-7" role="grid">
                    {monthDates.map((date, index) => (
                        <div
                            key={index}
                            role="gridcell"
                            tabIndex={date ? 0 : -1}
                            aria-selected={date && date.getDate() === selectedDate.getDate() ? "true" : "false"}
                            aria-label={date ? format(date, 'MMMM d, yyyy') : ""}
                            className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold cursor-pointer ${
                                date ? 'hover:bg-blue-100 focus:bg-blue-300' : ''
                            } ${date && date.getDate() === selectedDate.getDate() ? 'bg-blue-500 text-white' : ''}`}
                            onClick={() => date && handleDateClick(date)}
                        >
                            {date ? date.getDate() : ''}
                        </div>
                    ))}
                </div>
                <div className='grid grid-cols-2 mt-4'>
                    <p className='font-sans text-gray-800 font-semibold'>Tuesday:</p>
                    <p className='font-sans text-gray-400 font-semibold'>
                        On Tuesday he comes to school and reads carefully. His activity is so good.
                    </p>
                    <p className='font-sans text-gray-800 font-semibold'>Homework:</p>
                    <p className='font-sans text-gray-400 font-semibold'>
                        He completed his homework. <br /> He is the most active student of the class.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
