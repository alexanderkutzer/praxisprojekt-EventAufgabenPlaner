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

function PageMain() {
    const { isLoggedIn_AuthService, setIsLoggedIn_AuthService, token_AuthService, setToken_AuthService } = useAuth();
    const [testpercentage, setTestPercentage] = useState(50);
    const [selectedDate, setSelectedDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [selectedDateForInputs, setSelectedDateForInputs] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [id_user, setIdUser] = useState("");
    const [selectedEventForTask, setSelectedEventForTask] = useState(""); // Für das Dropdown der Events
    const [menuSesitive, setMenuSensitive] = useState("");
    const [events, setEvents] = useState([]);
    const [tasks, setTask] = useState([]);
    const [eventTaskShow, setEventTaskShow] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [activeContent, setActiveContent] = useState("EventOverview");
    const [inputValues, setInputValues] = useState({
        title: "",
        startDate: "",
        startDateUnix: "",
        startTime: "",
        endDate: "",
        endDateUnix: "",
        endTime: "",
        description: "",
        color: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const containerRef = useRef(null);
    const [boxHight, setBoxHight] = useState(0);

    const positionBoxAtBottom = () => {
        let boxNewHeight = 0;
        if (containerRef.current && window.innerWidth > 1024) {
            const windowHeight = window.innerHeight;
            const boxTop = containerRef.current.getBoundingClientRect().top;
            boxNewHeight = windowHeight - boxTop - 16;
            containerRef.current.style.height = `${boxNewHeight}px`;
            setBoxHight(boxNewHeight);
        } else {
            containerRef.current.style.height = "1024px";
            setBoxHight(1024 + 16);
        }
    };

    useLayoutEffect(() => {
        positionBoxAtBottom();
        window.addEventListener("resize", positionBoxAtBottom);
        return () => {
            window.removeEventListener("resize", positionBoxAtBottom);
        };
    }, []);
    useEffect(() => {
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
                    event.extendedProps = { description: event.description };
                    delete event.startDateTime;
                    delete event.endDateTime;
                    delete event.description;
                });

                setEvents(events);
            } catch (error) {
                console.error("Fehler beim Abrufen der Events", error);
            }
        };
        fetchEvents();
    }, []);
    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.removeAllEvents();
            calendarApi.addEventSource(events); // Füge die aktualisierte Eventliste hinzu
        }
        sortEvents(events);
    }, [events]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await apiGetTasks();
                if (response.error) {
                    return;
                }
                const task = response.tasks;

                setTask(tasks);
            } catch (error) {}
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        let date = new Date(parseInt(selectedDate));
        let inputDate = date.getDate().toString().padStart(2, "0") + "." + (date.getMonth() + 1).toString().padStart(2, "0") + "." + date.getFullYear();
        setSelectedDateForInputs(inputDate);
        inputValues.startDateUnix = selectedDateForInputs;
        inputValues.endDateUnix = selectedDateForInputs;
        setInputValues({ ...inputValues });
        setMenuSensitive("date");
    }, [selectedDate]);
    useEffect(() => {
        let list = [];

        events.forEach((event) => {
            let status = {
                id: event.id,
                show: false,
            };
            list.push(status);
        });
        setEventTaskShow(list);
    }, [events]);
    useEffect(() => {}, [tasks]);
    useEffect(() => {
        //
    }, [eventTaskShow]);
    useEffect(() => {
        setMenuSensitive("event");
    }, [selectedEvent]);

    const sortEvents = (events) => {
        events.sort((a, b) => {
            return a.start - b.start;
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
        if (selectedTasks.includes(task)) {
            setSelectedTasks(selectedTasks.filter((t) => t.id !== task.id));
        } else {
            setSelectedTasks([...selectedTasks, task]);
        }
    };

    const isTaskSelected = (task) => selectedTasks.filter((t) => t.id == task.id).length == 1;

    const calendarRef = useRef(null);

    const onDateClick = (date) => {
        setSelectedDate(date);
    };

    const onDateSelect = ({ start, end }) => {};

    const handleEventClick = ({ event }) => {
        console.log("Event clicked", event);
        if (selectedEvent) {
            if (selectedEvent.id === event.id) {
                setSelectedEvent(null);
                return;
            }
        }
        setSelectedEvent({
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setInputValues({
            ...inputValues,
            [name]: value == "on" || value == "off" ? event.target.checked : value,
        });
    };

    const switchContent = (content) => {
        setActiveContent(content);
        if (content === "AddEvent") {
            setInputValues({ title: "", startDate: "", endDate: "", description: "" });
            setErrorMessage("");
        } else if (content === "EventOverview") {
            setInputValues({ title: "", startDate: "", endDate: "", description: "" });
        } else if (content === "AddTask") {
            setInputValues({ title: "", description: "", id_event: "", todo: false, inProgress: false, done: false });
            setErrorMessage("");
        }
    };

    const startEditing = () => {
        if (selectedEvent) {
            setInputValues({
                title: selectedEvent.title,
                startDate: selectedEvent.start,
                endDate: selectedEvent.end || "",
                description: selectedEvent.description || "",
            });
            setActiveContent("Bearbeiten");
        }
    };

    const saveEvent = async () => {
        if (!inputValues.title || !inputValues.startDate) {
            setErrorMessage("Titel und Startdatum müssen angegeben werden.");
            return;
        }

        if (inputValues.endDate && inputValues.endDate < inputValues.startDate) {
            setErrorMessage("Das Enddatum kann nicht vor dem Startdatum liegen.");
            return;
        }

        try {
            // Falls ein Event ausgewählt wurde, wird es aktualisiert
            if (selectedEvent) {
                const updatedEvent = {
                    id: selectedEvent.id,
                    title: inputValues.title,
                    description: inputValues.description,
                    startDateTime: inputValues.startDateUnix,
                    endDateTime: inputValues.endDateUnix || null,
                    id_user: id_user, // Dieser Wert muss definiert sein
                };
                await apiUpdateEvent(updatedEvent.id, updatedEvent); // Sende das aktualisierte Event an die API
                setEvents(events.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)));
            } else {
                // Neues Event erstellen und an die API senden

                const newEvent = {
                    title: inputValues.title,
                    description: inputValues.description,
                    startDateTime: inputValues.startDateUnix,
                    endDateTime: inputValues.endDateUnix || inputValues.startDate,
                    id_user: id_user, // Dieser Wert muss definiert sein
                };

                let createdEvent = await apiCreateEvent(newEvent); // API-Call zum Erstellen eines neuen Events

                createdEvent.event.start = createdEvent.event.startDateTime;
                createdEvent.event.end = createdEvent.event.endDateTime;

                setEvents([...events, createdEvent.event]); // Das neue Event zur Eventliste hinzufügen
            }

            switchContent("EventOverview"); // Zur Eventübersicht wechseln
        } catch (error) {
            setErrorMessage("Fehler beim Speichern des Events.");
            console.error("Fehler beim Speichern des Events:", error);
        }
    };

    const saveTask = async () => {
        if (!inputValues.title || !inputValues.id_event) {
            setErrorMessage("Titel und Event müssen angegeben werden.");
            return;
        }

        try {
            const newTask = {
                id_event: inputValues.id_event, // Event-ID aus dem Dropdown
                title: inputValues.title,
                description: inputValues.description,
                todo: inputValues.todo,
                in_Progress: inputValues.inProgress,
                done: inputValues.done,
            };

            const createdTask = await apiCreateTask(newTask); // API-Call zum Erstellen einer neuen Aufgabe

            setTask([...tasks, createdTask.Task]); // Die neue Aufgabe zur Aufgabenliste hinzufügen
            switchContent("EventOverview"); // Zurück zur Eventübersicht
        } catch (error) {
            setErrorMessage("Fehler beim Erstellen der Aufgabe.");
            console.error("Fehler beim Erstellen der Aufgabe:", error);
        }
    };

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

    const formatTime = (dateString) => {
        const options = { hour: "2-digit", minute: "2-digit", hour12: false };
        return new Date(parseInt(dateString)).toLocaleTimeString("de-DE", options);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center md:items-start w-full mt-8 md:gap-5">
                <div className="w-full md:w-1/2 min-w-96 border border-gray-300 p-4 rounded-lg shadow-lg ">
                    <CalendarOwn
                        testPercentage={testpercentage}
                        setTestPercentage={setTestPercentage}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        events={events}
                        selectedEvent={selectedEvent}
                        setSelectedEvent={setSelectedEvent}
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

                <div ref={containerRef} className="bottom-0 w-full md:w-1/2  min-w-96 border border-gray-300 p-4 rounded-lg shadow-lg">
                    <div className="text-xs md:text-xs lg:text-base flex gap-2 w-full justify-between border border-gray-300 rounded-lg shadow-lg p-1">
                        {menuSesitive == "date" && (
                            <>
                                <SelectedDateMenu switchContent={switchContent} selectedEvent={selectedEvent} activeContent={activeContent}></SelectedDateMenu>
                            </>
                        )}
                        {menuSesitive == "event" && (
                            <SelectedEventMenu
                                switchContent={switchContent}
                                selectedEvent={selectedEvent == null ? true : false}
                                activeContent={activeContent}
                            ></SelectedEventMenu>
                        )}
                        {menuSesitive == "task" && (
                            <>
                                <SelectedTaskMenu></SelectedTaskMenu>
                                <div>
                                    <Button onClick={() => switchContent("EditTask")} activeContent={activeContent}>
                                        Aufgabe Bearbeiten
                                    </Button>
                                </div>
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
                            saveEvent={saveEvent}
                            inputValues={inputValues}
                            handleInputChange={handleInputChange}
                            switchContent={switchContent}
                            errorMessage={errorMessage}
                            boxHight={boxHight}
                        ></EventNew>
                    ) : activeContent === "AddTask" ? (
                        <TaskNew
                            inputValues={inputValues}
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
                        ></TaskNew>
                    ) : activeContent === "Bearbeiten" ? (
                        <EventDetail
                            saveEvent={saveEvent}
                            switchContent={switchContent}
                            inputValues={inputValues}
                            handleInputChange={handleInputChange}
                            errorMessage={errorMessage}
                            boxHight={boxHight}
                        ></EventDetail>
                    ) : activeContent === "EditTask" ? (
                        <TaskDetail
                            inputValues={inputValues}
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
                        ></TaskDetail>
                    ) : (
                        <div>
                            <h1 className="text-xl flex-col font-bold"></h1>
                            <p></p>
                        </div>
                    )}

                    {activeContent === "EventOverview" && (
                        <EventList
                            testpercentage={testpercentage}
                            events={events}
                            selectedEvent={selectedEvent}
                            handleEventClick={handleEventClick}
                            formatDate={formatDate}
                            formatTime={formatTime}
                            eventTaskShow={eventTaskShow}
                            setEventTaskShow={setEventTaskShow}
                            tasks={tasks}
                            toggleTaskSelection={toggleTaskSelection}
                            isTaskSelected={isTaskSelected}
                            boxHight={boxHight}
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
                <div>inputValues:{JSON.stringify(inputValues)}</div>
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
