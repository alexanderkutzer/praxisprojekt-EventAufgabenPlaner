import React from "react";
import Calendar from "../../Calendar";

import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";

function PageMain() {
    const events = [
        { title: "Event 1", date: "2024-10-14" },
        { title: "Event 2", date: "2024-10-15" },
        { title: "Event 3", date: "2024-10-20" },
    ];
    return (
        <>
            <div className="flex flex-col items-start w-full mt-8">
                <div className="w-full max-w-[50%]">
                    <Calendar
                        events={events}
                        plugins={[dayGridPlugin, multiMonthPlugin]}
                    />
                </div>
            </div>
        </>
    );
}

export default PageMain;
