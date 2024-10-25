import React, { useState } from "react";
import Overview from "./components/Overview";
import CalendarOwn from "./components/CalenderOwn";

function PageMain2() {
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <div className="flex flex-col md:flex-row w-full gap-4 mt-3 px-5">
            <div className="flex w-full md:w-1/2  justify-center border border-gray-500 rounded shadow-lg shadow-gray-500 dark:shadow-gray-800 ">
                <CalendarOwn selectedDate={selectedDate} setSelectedDate={setSelectedDate}></CalendarOwn>
            </div>
            <div className="flex w-full md:w-1/2 justify-center border border-gray-500 rounded shadow-lg shadow-gray-500 dark:shadow-gray-800 ">
                <Overview selectedDate={selectedDate} setSelectedDate={setSelectedDate}></Overview>
            </div>
        </div>
    );
}

export default PageMain2;
