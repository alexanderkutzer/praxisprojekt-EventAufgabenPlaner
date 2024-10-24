import React, { useEffect } from "react";
import Calendar from "../../../Calendar";
import Button from "../../../components/Button";

function CalendarOwn({ selectedDate, setSelectedDate, events }) {
    const [date, setDate] = React.useState(new Date());
    const [day, setDay] = React.useState(new Date().getDay());
    const [dayName, setDayName] = React.useState(new Date().toLocaleString("de-DE", { weekday: "short" }));
    const [month, setMonth] = React.useState(new Date().getMonth());
    const [monthName, setMonthName] = React.useState(new Date().toLocaleString("de-DE", { month: "long" }));
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [calBoxes, setCalBoxes] = React.useState([]);
    const colors = [
        { normal: "#ef4444", light: "#fecaca" },
        { normal: "#f97316", light: "#fed7aa" },
        { normal: "#f59e0b", light: "#fde68a" },
        { normal: "#eab308", light: "#fef08a" },
        { normal: "#84cc16", light: "#d9f99d" },
        { normal: "#22c55e", light: "#bbf7d0" },
        { normal: "#10b981", light: "#a7f3d0" },
        { normal: "#14b8a6", light: "#99f6e4" },
        { normal: "#06b6d4", light: "#a5f3fc" },
        { normal: "#0ea5e9", light: "#bae6fd" },
        { normal: "#3b82f6", light: "#bfdbfe" },
        { normal: "#6366f1", light: "#c7d2fe" },
        { normal: "#8b5cf6", light: "#ddd6fe" },
        { normal: "#a855f7", light: "#e9d5ff" },
        { normal: "#d946ef", light: "#f5d0fe" },
        { normal: "#ec4899", light: "#fbcfe8" },
        { normal: "#f43f5e", light: "#fecdd3" },
    ];

    useEffect(() => {
        setPlacesInCalenderFromMonth(date);
    }, [events]);

    useEffect(() => {
        setDay(date.getDay());
        setDayName(date.toLocaleString("de-DE", { weekday: "short" }));
        setMonth(date.getMonth());
        setMonthName(date.toLocaleString("de-DE", { month: "long" }));
        setYear(date.getFullYear());
        setPlacesInCalenderFromMonth(date);
    }, [date]);
    useEffect(() => {
        calBoxes.forEach((calBox) => {
            if (new Date(calBox.year, calBox.month - 1, calBox.day).setHours(0, 0, 0, 0) == new Date(selectedDate).setHours(0, 0, 0, 0)) {
                calBox.active2 = true;
            }
        });
    }, [selectedDate]);
    function getWeekNumber(date) {
        let targetDate = new Date(date.valueOf());
        let dayNr = (date.getDay() + 6) % 7; // Montag = 0, Sonntag = 6
        targetDate.setDate(targetDate.getDate() - dayNr + 3); // Auf Donnerstag der aktuellen Woche setzen
        let firstThursday = new Date(targetDate.getFullYear(), 0, 4); // 4. Januar ist immer der erste Donnerstag im Jahr
        let timeDiff = targetDate - firstThursday;
        let dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return 1 + Math.floor(dayDiff / 7);
    }
    function setPlacesInCalenderFromMonth(date) {
        let firstDayPlace = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        let daysBeforMonth = firstDayPlace - 1;
        let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let daysAfterMonth = 48 - daysInMonth - daysBeforMonth;
        let dayAfterMonth = 1;
        let dayInMonth = 1;
        let calBoxes = [];
        for (let i = 0; i < 48; i++) {
            calBoxes.push({ id: i, text: "", day: null, active: false, active2: false, events: [] });
        }
        for (let i = 0; i < 48; i++) {
            if (i % 8 == 0) {
                //Weeknumber here
                calBoxes[i].text = getWeekNumber(new Date(date.getFullYear(), date.getMonth(), dayInMonth)) + 1;

                calBoxes[i].active = true;
            } else {
                if (daysBeforMonth > 0) {
                    calBoxes[i].day = new Date(date.getFullYear(), date.getMonth(), 0).getDate() - daysBeforMonth + 1;
                    calBoxes[i].month = new Date(date.getFullYear(), date.getMonth(), 0).getMonth() + 1;
                    calBoxes[i].year = new Date(date.getFullYear(), date.getMonth(), 0).getFullYear();
                    calBoxes[i].unix = new Date(calBoxes[i].year, calBoxes[i].month - 1, calBoxes[i].day).setHours(0, 0, 0, 0);
                    calBoxes[i].text = calBoxes[i].day;
                    calBoxes[i].active = false;
                    daysBeforMonth--;
                } else if (dayInMonth <= daysInMonth) {
                    calBoxes[i].day = new Date(date.getFullYear(), date.getMonth(), dayInMonth).getDate();
                    calBoxes[i].month = new Date(date.getFullYear(), date.getMonth(), 1).getMonth() + 1;
                    calBoxes[i].year = new Date(date.getFullYear(), date.getMonth(), 1).getFullYear();
                    calBoxes[i].unix = new Date(calBoxes[i].year, calBoxes[i].month - 1, calBoxes[i].day).setHours(0, 0, 0, 0);
                    calBoxes[i].text = calBoxes[i].day;
                    calBoxes[i].active = true;
                    if (new Date(date.getFullYear(), date.getMonth(), dayInMonth).getTime() == new Date().setHours(0, 0, 0, 0)) {
                        calBoxes[i].today = true;
                    }
                    dayInMonth++;
                } else {
                    calBoxes[i].day = new Date(date.getFullYear(), date.getMonth() + 1, dayAfterMonth).getDate();
                    calBoxes[i].month = new Date(date.getFullYear(), date.getMonth() + 1, dayAfterMonth).getMonth() + 1;
                    calBoxes[i].year = new Date(date.getFullYear(), date.getMonth() + 1, dayAfterMonth).getFullYear();
                    calBoxes[i].unix = new Date(calBoxes[i].year, calBoxes[i].month - 1, calBoxes[i].day).setHours(0, 0, 0, 0);
                    calBoxes[i].text = calBoxes[i].day;
                    calBoxes[i].active = false;
                    dayAfterMonth++;
                }
                if (calBoxes[i].unix == selectedDate) {
                    calBoxes[i].active2 = true;
                }
            }
        }
        calBoxes = setEventsInCalenderFromMonth(calBoxes, events);
        setCalBoxes(calBoxes);
    }
    function setEventsInCalenderFromMonth(calBoxes, events) {
        let index = 0;
        events.forEach((event) => {
            let date = new Date(event.start);
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getFullYear();
            event.taskpercent = getEventTasksDone(event);
            calBoxes.forEach((calBox) => {
                if (calBox.day == day && calBox.month - 1 == month && calBox.year == year) {
                    event.color = colors[calBox.events.length % colors.length];
                    calBox.events.push(event);
                }
            });
        });
        return calBoxes;
    }
    function getEventTasksDone(event) {
        // let doneTasks = 0;
        // let allTasks = 0;
        // event.tasks.forEach((task) => {
        //     if (task.done) {
        //         doneTasks++;
        //     }
        //     allTasks++;
        // });
        // return (doneTasks / allTasks) * 100;
        return 100;
    }
    return (
        <div className="w-full p-2">
            <div className="w-full flex-col flex gap-2 ">
                <div className="flex justify-between">
                    <div className="whitespace-nowrap">
                        <Button
                            className={"rounded-e-[0]"}
                            onClick={() => {
                                setDate(new Date(date.setMonth(date.getMonth() - 1)));
                            }}
                        >
                            {"<"}
                        </Button>
                        <Button
                            className={"rounded-s-[0] rounded-e-[0]"}
                            onClick={() => {
                                setDate(new Date(date.setMonth(date.getMonth() + 1)));
                            }}
                        >
                            {">"}
                        </Button>
                        <Button className={"rounded-s-[0]"}>{monthName}</Button>
                    </div>
                    <div className="whitespace-nowrap">
                        <Button
                            onClick={() => {
                                setDate(new Date());
                                setSelectedDate(new Date().setHours(0, 0, 0, 0));
                            }}
                        >
                            {new Date(Date.now()).getDay() + "." + (new Date(Date.now()).getMonth() + 1) + "." + new Date(Date.now()).getFullYear()}
                        </Button>
                    </div>
                    <div className="whitespace-nowrap">
                        <Button className={"rounded-e-[0]"}>{year}</Button>
                        <Button
                            className={"rounded-s-[0] rounded-e-[0]"}
                            onClick={() => {
                                setDate(new Date(date.setYear(date.getFullYear() + -1)));
                            }}
                        >
                            {"<"}
                        </Button>
                        <Button
                            className={"rounded-s-[0]"}
                            onClick={() => {
                                setDate(new Date(date.setYear(date.getFullYear() + 1)));
                            }}
                        >
                            {">"}
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-8 border border-gray-500 rounded">
                    <div className=" select-none border border-gray-500 w-full justify-center flex">KW</div>
                    <div className=" select-none border border-gray-500 w-full justify-center flex">Mo</div>
                    <div className=" select-none border border-gray-500 w-full justify-center flex">Di</div>
                    <div className=" select-none border border-gray-500 w-full justify-center flex">Mi</div>
                    <div className=" select-none border border-gray-500 w-full justify-center flex">Do</div>
                    <div className=" select-none border border-gray-500 w-full justify-center flex">Fr</div>
                    <div className=" select-none border border-gray-500 w-full justify-center flex">Sa</div>
                    <div className=" select-none border border-gray-500 w-full justify-center flex">So</div>

                    {calBoxes.map((calBox, index) => {
                        return index % 8 == 0 ? (
                            <div
                                key={index}
                                className="flex items-center justify-center border border-gray-500 w-full select-none aspect-square text-gray-500 text-sm  "
                            >
                                {calBox.text}
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    setSelectedDate(calBox.unix);
                                    calBoxes.forEach((calBox) => {
                                        calBox.active2 = false;
                                    });
                                    calBox.active2 = true;
                                    setCalBoxes([...calBoxes]);
                                }}
                                key={index}
                                className={
                                    " flex flex-col justify-between select-none cursor-pointer border border-gray-500 aspect-square" +
                                    (calBox.active == false ? " text-gray-400 " : "") +
                                    (calBox.active2 == true ? " bg-orange-300 " : "")
                                }
                            >
                                {calBox.today && <div className="bg-blue-600 rounded-full w-6 h-6 text-center">{calBox.text}</div>}
                                {!calBox.today && <div>{calBox.text}</div>}
                                <div className="h-[1.5rem] flex">
                                    {calBox.events.map((event, index) => {
                                        return (
                                            <div key={index} style={{ backgroundColor: event.color.light }} className="flex items-end w-full h-full ">
                                                <div style={{ backgroundColor: event.color.normal, height: event.taskpercent + "%" }} className="w-full"></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default CalendarOwn;
