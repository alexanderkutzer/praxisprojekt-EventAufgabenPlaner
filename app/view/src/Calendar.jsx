import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // You must initialize your calendar with at least one plugin that provides a view!
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar({ events, onDateClick, onEventClick, onDateSelect }) {
    const calendarRef = useRef(null);

    const handleDateClick = (info) => {
        if (onDateClick) {
            onDateClick(info.dateStr); // Pass the selected date string to the parent component
        }
    };
    const handleSelect = (info) => {
        onDateSelect({ start: info.startStr, end: info.endStr });
    };
    const handleEventClick = (info) => {
        console.log(info.event);
        if (onEventClick) {
            onEventClick(info);
        }
    };

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, multiMonthPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            aspectRatio={1.5} // passt die höhe in relation zur weite an
            firstDay={1} // 1 = Montag
            headerToolbar={{
                left: "prev,next today", // Buttons für vorherige, nächste und heute
                // center: 'KalenderWoche',
                right: "title", //ansicht 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            footerToolbar={{
                left: "dayGridDay,dayGridWeek,dayGridMonth,multiMonthYear",
            }}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            select={handleSelect}
            selectable={true}
            themeSystem="Flatly"
        />
    );
}
