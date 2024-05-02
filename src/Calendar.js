import React, { useState, useEffect } from 'react';
import './calendar.css';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function Calendar({ initialYear, initialMonth }) {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const startDay = new Date(year, month - 1, 1).getDay();

    const daysArray = [];
    for (let i = 0; i < startDay; i++) {
      daysArray.push(undefined);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }

    setDays(daysArray);
  }, [month, year]);

  const handlePrevMonth = () => {
    setMonth(prevMonth => (prevMonth === 1 ? 12 : prevMonth - 1));
    setYear(prevYear => (month === 1 ? prevYear - 1 : prevYear));
  };

  const handleNextMonth = () => {
    setMonth(prevMonth => (prevMonth === 12 ? 1 : prevMonth + 1));
    setYear(prevYear => (month === 12 ? prevYear + 1 : prevYear));
  };

  return (
    <div className="calendar">
     <div className="navigation">
       <button onClick={handlePrevMonth} aria-label="Previous Month">&laquo; Prev</button>
       <span>{`${year} - ${months[month - 1]}`}</span>
       <button onClick={handleNextMonth} aria-label="Next Month">Next &raquo;</button>
     </div>
           
      <div className="header">
        {daysOfWeek.map(day => (
          <div key={day} className="header-day">{day}</div>
        ))}
      </div>
      <div className="days">
        {days.map((day, index) => (
          <div key={index} className={`day ${day ? '' : 'empty'}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;

