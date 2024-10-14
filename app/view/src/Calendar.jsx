import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // You must initialize your calendar with at least one plugin that provides a view!
import multiMonthPlugin from '@fullcalendar/multimonth';

export default function Calendar({ events }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, multiMonthPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={events} 
      aspectRatio={1.5} // passt die höhe in relation zur weite an
      firstDay={1} // 1 = Montag
      headerToolbar={{
        left: 'prev,next today', // Buttons für vorherige, nächste und heute
        center: 'title', // MOnat Jahr
        right: 'dayGridMonth, multiMonthYear' //ansicht 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      
    />
  );
}
