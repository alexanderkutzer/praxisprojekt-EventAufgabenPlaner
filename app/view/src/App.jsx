import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Button from "./components/Button";
import Calendar from "./Calendar.jsx";
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';

export function App() {
    const [count, setCount] = useState(0);

    const events = [
        { title: 'Event 1', date: '2024-10-14' },
        { title: 'Event 2', date: '2024-10-15' },
        { title: 'Event 3', date: '2024-10-20' },
    ];

    return (
        <div className="mx-16 ..."><div className="flex flex-col items-center mt-8">
            <h1 className="text-2xl font-bold mb-8">
                viteReactEmptyTest Project
            </h1>
            <img src={viteLogo} alt="Vite logo" />

            <img src={reactLogo} alt="React logo" />

            <Button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </Button>
           
        </div>
        <div className="flex flex-col items-start w-full mt-8">  
         <div className="w-full max-w-[50%]">
            <Calendar
         events={events}
        plugins={[dayGridPlugin, multiMonthPlugin]}
    />
    </div>
    </div>
    </div>
    );
}
export default App;
