import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../service/authStatus.jsx";
import { apiGetEvents, apiGetTasks, apiCreateEvent, apiCreateTask, apiUpdateEvent, apiDeleteEvent } from "../../service/api_calls.js";
import CalendarOwn from "./components/CalenderOwn.jsx";
import EventNew from "./components/overview/EventNew.jsx";
import TaskNew from "./components/overview/TaskNew.jsx";
import EventDetail from "./components/overview/EventDetail.jsx";
import EventList from "./components/overview/EventList.jsx";
import TaskDetail from "./components/overview/TaskDetail.jsx";
import SelectedEventMenu from "./components/overview/SelectedEventMenu";
import SelectedDateMenu from "./components/overview/SelectedDateMenu";
import SelectedTaskMenu from "./components/overview/SelectedTaskMenu";

function PageMain({ setTop }) {
    const { isLoggedIn_AuthService, setIsLoggedIn_AuthService, token_AuthService, setToken_AuthService } = useAuth();
    const [testpercentage, setTestPercentage] = useState(50);
    const [selectedDate, setSelectedDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0 });
    const [selectedDateForInputs, setSelectedDateForInputs] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [update, setUpdate] = useState(false);
    const [id_user, setIdUser] = useState("");
    const [selectedEventForTask, setSelectedEventForTask] = useState(""); // Für das Dropdown der Events
    const [menuSesitive, setMenuSensitive] = useState("");
    const [events, setEvents] = useState([]);
    const [tasks, setTask] = useState([]);
    const [eventTaskShow, setEventTaskShow] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [activeContent, setActiveContent] = useState("EventOverview");

    const [errorMessage, setErrorMessage] = useState("");

    const containerRef = useRef(null);
    const [boxHight, setBoxHight] = useState(0);

    const positionBoxAtBottom = () => {
        let boxNewHeight = 0;
        if (containerRef.current) {
            const windowHeight = window.innerHeight;
            const boxTop = containerRef.current.getBoundingClientRect().top;
            const extra = window.innerWidth < 780 ? 0 : 16;
            boxNewHeight = windowHeight - boxTop - extra;
            containerRef.current.style.height = `${boxNewHeight}px`;
            setBoxHight(boxNewHeight);
        }
    };

    useLayoutEffect(() => {
        setTimeout(() => positionBoxAtBottom(), 10);
        window.addEventListener("resize", positionBoxAtBottom);
        return () => {
            window.removeEventListener("resize", positionBoxAtBottom);
        };
    }, []);
    const fetch = async () => {
        await fetchEvents();
        await fetchTasks();
    };
    const fetchEvents = async () => {
        try {
            const response = await apiGetEvents();
            if (response.error) {
                if (response.error === "Invalid token") {
                    console.error("Token abgelaufen");
                    setToken_AuthService(null);
                    setIsLoggedIn_AuthService(false);
                    return;
                }
                console.error("Fehler beim Abrufen der Events", response.error);
                return;
            }
            const events = response;

            events.forEach((event) => {
                event.start = event.startDateTime;
                event.end = event.endDateTime;
                //try catch in onliner

                try {
                    event.startTime = JSON.parse(event.startTime);
                } catch (error) {
                    event.startTime = { hour: 12, minute: 0 };
                }
                delete event.startDateTime;
                delete event.endDateTime;
                delete event.description;
            });

            setEvents(events);
        } catch (error) {
            console.error("Fehler beim Abrufen der Events", error);
        }
    };
    const fetchTasks = async () => {
        try {
            const response = await apiGetTasks();
            if (response.error) {
                return;
            }
            const tasks = response;

            tasks.forEach((task) => {
                task.in_progress = task.in_progress == 1 ? true : false;
                task.todo = task.todo == 1 ? true : false;
                task.done = task.done == 1 ? true : false;
            });
            setTask(tasks);
        } catch (error) {}
    };
    useEffect(() => {
        fetch();
    }, [update]);
    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.removeAllEvents();
            calendarApi.addEventSource(events); // Füge die aktualisierte Eventliste hinzu
        }
        sortEvents(events);
    }, [events]);
    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        let date = new Date(parseInt(selectedDate));
        let inputDate = date.getDate().toString().padStart(2, "0") + "." + (date.getMonth() + 1).toString().padStart(2, "0") + "." + date.getFullYear();
        setSelectedDateForInputs(inputDate);

        setMenuSensitive("date");
    }, [selectedDate]);
    const [updateTask, setUpdateTask] = useState(null);
    useEffect(() => {
        let list = [];

        events.forEach((event) => {
            let status = {
                id: event.id,
                show: updateTask?.id_event == event.id,
            };
            list.push(status);
        });
        setEventTaskShow(list);
    }, [events]);

    useEffect(() => {
        events.forEach((event) => {
            let percentage = 100;
            let tasks2 = tasks?.filter((task) => task.id_event == event.id);
            let hasEventTasks = tasks2?.length > 0;

            if (hasEventTasks) {
                let done = tasks2.filter((task) => task.done == true).length;
                let in_progress = tasks2.filter((task) => task.in_progress == true).length;
                let todo = tasks2.filter((task) => task.todo == true).length;

                let donePercentage = (done / tasks2.length) * 100;
                event.taskpercent = donePercentage;
            } else {
                event.taskpercent = percentage;
            }
            event.hasTasks = hasEventTasks;
        });
        setEvents([...events]);
    }, [tasks]);
    useEffect(() => {
        //
    }, [eventTaskShow]);
    useEffect(() => {
        selectedTasks.length == 0 && setMenuSensitive("date");
        selectedTasks.length == 1 && setMenuSensitive("task");
        selectedTasks.length == 2 && setMenuSensitive("tasks");
    }, [selectedTasks]);
    useEffect(() => {
        setMenuSensitive("event");
        selectedEvent && setSelectedDate(selectedEvent.start);
    }, [selectedEvent]);

    const sortEvents = (events) => {
        //date .start = 1620000000000
        //time .startTime = {hour: 12, minute: 0}
        events.sort((a, b) => {
            if (a.start < b.start) {
                return -1;
            }
            if (a.start > b.start) {
                return 1;
            }
            if (a.startTime.hour < b.startTime.hour) {
                return -1;
            }
            if (a.startTime.hour > b.startTime.hour) {
                return 1;
            }
            if (a.startTime.minute < b.startTime.minute) {
                return -1;
            }
            if (a.startTime.minute > b.startTime.minute) {
                return 1;
            }
            return 0;
        });
    };
    const onClickDelete = async (event) => {
        let response = await apiDeleteEvent(event.id);
        if (response.error) {
            console.error("Fehler beim Löschen des Events", response.error);
            return;
        }
        events.splice(events.indexOf(event), 1);
        setEvents([...events]);
        switchContent("EventOverview");
    };
    const handleEventSelectChange = (event) => {
        setSelectedEventForTask(event.target.value);
    };

    const toggleTaskSelection = (task) => {
        if (!task) {
            setSelectedTasks([]);
            return;
        }
        if (selectedTasks.filter((t) => t.id == task.id).length == 1) {
            setSelectedTasks([]);
        } else {
            setSelectedTasks([task]);
        }
    };

    const isTaskSelected = (task) => selectedTasks.filter((t) => t.id == task.id).length == 1;

    const calendarRef = useRef(null);

    const onDateClick = (date) => {
        setSelectedDate(date);
    };

    const onDateSelect = ({ start, end }) => {};

    const handleEventClick = ({ event }) => {
        if (selectedEvent) {
            if (selectedEvent.id === event.id) {
                setSelectedEvent(null);
                return;
            }
        }
        setSelectedEvent(event);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    };

    const switchContent = (content) => {
        setActiveContent(content);
        if (content === "AddEvent") {
            setErrorMessage("");
        } else if (content === "EventOverview") {
        } else if (content === "AddTask") {
            setErrorMessage("");
        }
    };

    const startEditing = () => {
        if (selectedEvent) {
            setActiveContent("Bearbeiten");
        }
    };

    const saveEvent = async (typeOfEvent) => {};

    const saveTask = async () => {};

    // Aktualisiere den Kalender, wenn sich die Events ändern

    function formatDate(dateInput) {
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        let text = new Date(parseInt(dateInput)).toLocaleDateString("de-DE", options);
        return text;
    }
    function formatDateOwn(dateInput) {
        let date = new Date(dateInput);
        let inputDate = date.getDay().toString().padStart(2, "0") + "." + (date.getMonth() + 1).toString().padStart(2, "0") + "." + date.getFullYear();
        return inputDate;
    }
    function formatTimeOwn(dateString) {
        const options = { hour: "2-digit", minute: "2-digit", hour12: false };
        return new Date(parseInt(dateString)).toLocaleTimeString("de-DE", options);
    }

    function unixToDateTime(unix) {
        const day = new Date(parseInt(unix)).getDate();
        const month = new Date(parseInt(unix)).getMonth();
        const year = new Date(parseInt(unix)).getFullYear();
        return day + "." + (month + 1).toString().padStart(2, "0") + "." + year;
    }

    const formatTime = (time) => {
        return time.hour.toString().padStart(2, "0") + ":" + time.minute.toString().padStart(2, "0");
    };

    return (
        <>
            <div className="flex flex-col min-[880px]:flex-row items-center min-[880px]:items-start w-full  min-[880px]:gap-5">
                <div className="w-full min-[880px]:w-1/2 min-w-96 border border-gray-300 md:p-2 min-[880px]:p-4 rounded-lg shadow-lg bg-[#fafafa]">
                    <CalendarOwn
                        testPercentage={testpercentage}
                        setTestPercentage={setTestPercentage}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        events={events}
                        selectedEvent={selectedEvent}
                        setSelectedEvent={setSelectedEvent}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    ></CalendarOwn>
                    {/* <Calendar
                        key={JSON.stringify(events)} // Neurendering bei Änderung
                        events={events}
                        onDateClick={onDateClick}
                        onEventClick={handleEventClick}
                        onDateSelect={onDateSelect}
                        ref={calendarRef}
                    /> */}
                </div>

                <div
                    ref={containerRef}
                    className="bottom-0 w-full min-[880px]:w-1/2  min-w-96 border border-gray-300 md:p-2 min-[880px]:p-4 rounded-lg shadow-lg bg-[#fafafa]"
                >
                    <div className="lg:text-base flex gap-2 w-full justify-between md:mb-2">
                        <Button
                            onClick={() => {
                                setMenuSensitive("date");
                                setActiveContent("EventOverview");
                                setSelectedTasks([]);
                            }}
                        >
                            {"<<"}
                        </Button>
                        {menuSesitive == "date" && (
                            <>
                                <SelectedDateMenu
                                    switchContent={switchContent}
                                    selectedEvent={selectedEvent}
                                    setSelectedEvent={setSelectedEvent}
                                    activeContent={activeContent}
                                    events={events}
                                    tasks={tasks}
                                ></SelectedDateMenu>
                            </>
                        )}
                        {menuSesitive == "event" && (
                            <SelectedEventMenu
                                switchContent={switchContent}
                                selectedEvent={selectedEvent}
                                setSelectedEvent={setSelectedEvent}
                                activeContent={activeContent}
                                events={events}
                                tasks={tasks}
                            ></SelectedEventMenu>
                        )}
                        {menuSesitive == "task" && (
                            <>
                                <SelectedTaskMenu
                                    switchContent={switchContent}
                                    selectedEvent={selectedEvent}
                                    setSelectedEvent={setSelectedEvent}
                                    activeContent={activeContent}
                                    events={events}
                                    tasks={tasks}
                                ></SelectedTaskMenu>
                            </>
                        )}
                        {menuSesitive == "tasks" && (
                            <div className="flex w-full justify-between">
                                {/* Menu */}
                                {/* Status-Buttons */}
                                <div className="relative inline-block group">
                                    <button className="bg-red-700 hover:bg-red-200 text-gray-200 hover:text-gray-600 h-6 w-6 rounded-full">s</button>
                                    <div className="invisible absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 mt-2 group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                                        ToDo
                                    </div>
                                </div>
                                <div className="relative inline-block group">
                                    <button className="bg-yellow-500 hover:bg-yellow-200 text-gray-200 hover:text-gray-600 h-6 w-6 rounded-full">s</button>
                                    <div className="invisible absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 mt-2 group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                                        In Progress
                                    </div>
                                </div>
                                <div className="relative inline-block group">
                                    <button className="bg-green-600 hover:bg-green-200 text-gray-200 hover:text-gray-600 h-6 w-6 rounded-full">s</button>
                                    <div className="invisible absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 mt-2 group-hover:visible group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                                        Done!
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {activeContent === "Details" ? (
                        <div className="p-4 border border-gray-300 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                            <p>Start Datum: {selectedEvent.start}</p>
                            <p>End Datum: {selectedEvent.end}</p>
                            <p>{selectedEvent.description}</p>
                            <Button onClick={startEditing}>Bearbeiten</Button>
                            <Button onClick={() => switchContent("EventOverview")}>Zurück</Button>
                            <Button onClick={() => onClickDelete(selectedEvent)}>Löschen</Button>
                        </div>
                    ) : activeContent === "AddEvent" ? (
                        <EventNew
                            selectedDate={selectedDate}
                            selectedDateForInputs={selectedDateForInputs}
                            selectedEvent={selectedEvent}
                            formatDate={formatDate}
                            formatTime={formatTime}
                            saveEvent={saveEvent}
                            handleInputChange={handleInputChange}
                            switchContent={switchContent}
                            errorMessage={errorMessage}
                            boxHight={boxHight}
                            update={update}
                            setUpdate={setUpdate}
                            menuSesitive={menuSesitive}
                            setMenuSensitive={setMenuSensitive}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                        ></EventNew>
                    ) : activeContent === "EditEvent" ? (
                        <EventDetail
                            selectedDate={selectedDate}
                            selectedDateForInputs={selectedDateForInputs}
                            selectedEvent={selectedEvent}
                            setSelectedEvent={setSelectedEvent}
                            setSelectedDate={setSelectedDate}
                            formatDate={formatDate}
                            formatTime={formatTime}
                            saveEvent={saveEvent}
                            handleInputChange={handleInputChange}
                            switchContent={switchContent}
                            errorMessage={errorMessage}
                            boxHight={boxHight}
                            update={update}
                            setUpdate={setUpdate}
                            menuSesitive={menuSesitive}
                            setMenuSensitive={setMenuSensitive}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                        ></EventDetail>
                    ) : activeContent === "AddTask" ? (
                        <TaskNew
                            saveTask={saveTask}
                            handleInputChange={handleInputChange}
                            switchContent={switchContent}
                            errorMessage={errorMessage}
                            events={events}
                            selectedEvent={selectedEvent}
                            selectedEventForTask={selectedEventForTask}
                            formatDate={formatDate}
                            formatTime={formatTime}
                            boxHight={boxHight}
                            update={update}
                            setUpdate={setUpdate}
                            menuSesitive={menuSesitive}
                            setMenuSensitive={setMenuSensitive}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                        ></TaskNew>
                    ) : activeContent === "EditTask" ? (
                        <TaskDetail
                            saveTask={saveTask}
                            handleInputChange={handleInputChange}
                            switchContent={switchContent}
                            errorMessage={errorMessage}
                            events={events}
                            selectedEvent={selectedEvent}
                            selectedEventForTask={selectedEventForTask}
                            selectedTasks={selectedTasks}
                            formatDate={formatDate}
                            formatTime={formatTime}
                            boxHight={boxHight}
                            update={update}
                            setUpdate={setUpdate}
                            menuSesitive={menuSesitive}
                            setMenuSensitive={setMenuSensitive}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                        ></TaskDetail>
                    ) : null}

                    {activeContent === "EventOverview" && (
                        <EventList
                            testpercentage={testpercentage}
                            events={events}
                            selectedEvent={selectedEvent}
                            setSelectedEvent={setSelectedEvent}
                            handleEventClick={handleEventClick}
                            formatDate={formatDate}
                            formatTime={formatTime}
                            eventTaskShow={eventTaskShow}
                            setEventTaskShow={setEventTaskShow}
                            tasks={tasks}
                            toggleTaskSelection={toggleTaskSelection}
                            isTaskSelected={isTaskSelected}
                            boxHight={boxHight}
                            selectedDate={selectedDate}
                            setTop={setTop}
                            update={update}
                            setUpdate={setUpdate}
                            menuSesitive={menuSesitive}
                            setMenuSensitive={setMenuSensitive}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                            setTasks={setTask}
                            updateTask={updateTask}
                            setUpdateTask={setUpdateTask}
                        ></EventList>
                    )}
                </div>
            </div>
            <div className="text-xs hidden">
                <div>selectedDate:{selectedDate}</div>
                <div>selectedDateForInputs:{selectedDateForInputs}</div>
                <div>menuSesitive:{menuSesitive}</div>
                <div>activeContent:{activeContent}</div>
                <div>selectedEvent:{JSON.stringify(selectedEvent)}</div>
                <Button onClick={() => setMenuSensitive(menuSesitive != "date" ? "date" : "")}>Select a Date</Button>
                <Button onClick={() => setMenuSensitive(menuSesitive != "task" ? "task" : "")}>Select a Task</Button>
                <Button onClick={() => setMenuSensitive(menuSesitive != "tasks" ? "tasks" : "")}>Selected Tasks</Button>

                <Button onClick={() => setTestPercentage(testpercentage <= 0 ? 0 : testpercentage - 5)}>Percentage -</Button>
                <Button onClick={() => setTestPercentage(testpercentage >= 100 ? 100 : testpercentage + 5)}>Percentage +</Button>
            </div>
        </>
    );
}

export default PageMain;
