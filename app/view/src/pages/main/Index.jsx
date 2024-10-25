import React, { useState, useRef, useEffect } from "react";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../service/authStatus.jsx";
import { apiGetEvents, apiGetTasks, apiCreateEvent, apiCreateTask, apiUpdateEvent, apiDeleteEvent } from "../../service/api_calls.js";
import CalendarOwn from "./components/CalenderOwn.jsx";

function PageMain() {
    const { isLoggedIn_AuthService, setIsLoggedIn_AuthService, token_AuthService, setToken_AuthService } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date().setHours(0, 0, 0, 0));

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [id_user, setIdUser] = useState("");
    const [selectedEventForTask, setSelectedEventForTask] = useState(""); // Für das Dropdown der Events
    const [menuSesitive, setMenuSensitive] = useState("");
    const [events, setEvents] = useState([]);
    const [tasks, setTask] = useState([]);

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

    const [eventTaskShow, setEventTaskShow] = useState([]);
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

    const [selectedTasks, setSelectedTasks] = useState([]);

    const toggleTaskSelection = (task) => {
        if (selectedTasks.includes(task)) {
            setSelectedTasks(selectedTasks.filter((t) => t.id !== task.id));
        } else {
            setSelectedTasks([...selectedTasks, task]);
        }
    };

    const isTaskSelected = (task) => selectedTasks.filter((t) => t.id == task.id).length == 1;

    useEffect(() => {}, [selectedTasks]);

    const [activeContent, setActiveContent] = useState("EventOverview");
    const [inputValues, setInputValues] = useState({
        title: "",
        startDate: "",
        endDate: "",
        description: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const calendarRef = useRef(null);

    const onDateClick = (date) => {
        setSelectedDate(date);
    };

    const onDateSelect = ({ start, end }) => {};

    const handleEventClick = (info) => {
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            start: info.event.startStr,
            end: info.event.endStr,
        });
        setActiveContent("Details");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    const switchContent = (content) => {
        setActiveContent(content);
        if (content === "AddEvent") {
            setSelectedEvent(null);
            setInputValues({ title: "", startDate: "", endDate: "", description: "" });
            setErrorMessage("");
        } else if (content === "EventOverview") {
            setSelectedEvent(null);
            setInputValues({ title: "", startDate: "", endDate: "", description: "" });
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
                    startDateTime: inputValues.startDate,
                    endDateTime: inputValues.endDate || null,
                    id_user: id_user, // Dieser Wert muss definiert sein
                };
                await apiUpdateEvent(updatedEvent.id, updatedEvent); // Sende das aktualisierte Event an die API
                setEvents(events.map((event) => (event.id === selectedEvent.id ? updatedEvent : event)));
            } else {
                // Neues Event erstellen und an die API senden

                const newEvent = {
                    title: inputValues.title,
                    description: inputValues.description,
                    startDateTime: inputValues.startDate,
                    endDateTime: inputValues.endDate || inputValues.startDate,
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
        if (!inputValues.title || !selectedEventForTask) {
            setErrorMessage("Titel und Event müssen angegeben werden.");
            return;
        }

        try {
            const newTask = {
                id_event: selectedEventForTask, // Event-ID aus dem Dropdown
                title: inputValues.title,
                description: inputValues.description,
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
    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.removeAllEvents();
            calendarApi.addEventSource(events); // Füge die aktualisierte Eventliste hinzu
        }
    }, [events]);

    useEffect(() => {
        inputValues.startDate = unixToDateTime(selectedDate);
        inputValues.endDate = unixToDateTime(selectedDate);
        setInputValues({ ...inputValues });
    }, [selectedDate]);
    function unixToDateTime(unix) {
        const day = new Date(unix).getDate();
        const month = new Date(unix).getMonth();
        const year = new Date(unix).getFullYear();
        return day + "." + (month + 1).toString().padStart(2, "0") + "." + year;
    }
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("de-DE", options);
    };

    const formatTime = (dateString) => {
        const options = { hour: "2-digit", minute: "2-digit", hour12: false };
        return new Date(dateString).toLocaleTimeString("de-DE", options);
    };

    return (
        <>
            <div>
                <Button onClick={() => setMenuSensitive(menuSesitive != "date" ? "date" : "")}>Select a Date</Button>
                <Button onClick={() => setMenuSensitive(menuSesitive != "task" ? "task" : "")}>Select a Task</Button>
                <Button onClick={() => setMenuSensitive(menuSesitive != "tasks" ? "tasks" : "")}>Selected Tasks</Button>
            </div>
            <div className="flex flex-col md:flex-row items-center sm:items-start w-full mt-8 space-x-5">
                <div className="w-full sm:w-1/2 max-w-[50%] min-w-96 border border-gray-300 p-4 rounded-lg shadow-lg ">
                    <CalendarOwn selectedDate={selectedDate} setSelectedDate={setSelectedDate} events={events}></CalendarOwn>
                    {/* <Calendar
                        key={JSON.stringify(events)} // Neurendering bei Änderung
                        events={events}
                        onDateClick={onDateClick}
                        onEventClick={handleEventClick}
                        onDateSelect={onDateSelect}
                        ref={calendarRef}
                    /> */}
                </div>

                <div className="w-full sm:w-1/2 max-w-[50%] min-w-96 border border-gray-300 p-4 rounded-lg shadow-lg">
                    <div className="flex gap-2 w-full justify-between">
                        {menuSesitive == "date" && (
                            <div className="flex w-full justify-between">
                                <Button onClick={() => switchContent("EventOverview")}>Event Übersicht</Button>
                                <Button onClick={() => switchContent("AddEvent")}>Neues Event</Button>
                                <Button onClick={() => switchContent("AddTask")}>Neue Aufgabe</Button>
                            </div>
                        )}
                        {menuSesitive == "events" && "Events"}
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
                    {selectedEvent && activeContent === "Details" ? (
                        <div className="p-4 border border-gray-300 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                            <p>Start Datum: {selectedEvent.start}</p>
                            <p>End Datum: {selectedEvent.end}</p>
                            <p>Event Details: {selectedEvent.description}</p>
                            <Button onClick={startEditing}>Bearbeiten</Button>
                            <Button onClick={() => switchContent("EventOverview")}>Zurück</Button>
                            <Button onClick={() => onClickDelete(selectedEvent)}>Löschen</Button>
                        </div>
                    ) : activeContent === "AddEvent" ? (
                        <div className="flex flex-col space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg">
                            <h1 className="text-2xl font-semibold">Neues Event hinzufügen</h1>
                            <input
                                type="text"
                                name="title"
                                value={inputValues.title}
                                onChange={handleInputChange}
                                placeholder="Event Titel"
                                className="p-2 border rounded resize-none w-1/2"
                            />
                            <p className="mt-3">Eventbeginn</p>
                            <input
                                type="text"
                                name="startDate"
                                value={inputValues.startDate}
                                onChange={handleInputChange}
                                className="p-2 border rounded resize-none w-1/2 text-gray-500"
                            />
                            <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                            <input
                                type="text"
                                name="endDate"
                                value={inputValues.endDate}
                                onChange={handleInputChange}
                                className="p-2 border rounded resize-none w-1/2 text-gray-500"
                            />
                            <p className="mt-3">Details zu deinem Event</p>
                            <textarea
                                name="description"
                                value={inputValues.description}
                                onChange={handleInputChange}
                                placeholder="Details"
                                className="p-2 border rounded h-32"
                            />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <Button className="resize-none w-1/2" onClick={saveEvent}>
                                Event erstellen
                            </Button>
                            <Button className="resize-none w-1/2" onClick={() => switchContent("EventOverview")}>
                                Abbrechen
                            </Button>
                        </div>
                    ) : activeContent === "AddTask" ? (
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-2xl font-semibold">Neue Aufgabe hinzufügen</h1>
                            <select id="event-select" value={selectedEventForTask} onChange={handleEventSelectChange} className="p-2 border rounded">
                                <option value="" disabled>
                                    -- Wähle ein Event --
                                </option>
                                {events.map((event) => (
                                    <option key={event.id} value={event.id}>
                                        {event.title} (Start: {event.start})
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                name="title"
                                value={inputValues.title}
                                onChange={handleInputChange}
                                placeholder="Aufgabe eingeben"
                                className="p-2 border rounded"
                            />
                            <p className="mt-3">Details zur Aufgabe</p>
                            <input
                                type="text"
                                name="description"
                                value={inputValues.description}
                                onChange={handleInputChange}
                                placeholder="Aufgaben Details"
                                className="p-2 border rounded"
                            />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <Button onClick={saveTask}>Aufgabe erstellen</Button>
                            <Button onClick={() => switchContent("EventOverview")}>Abbrechen</Button>
                        </div>
                    ) : activeContent === "Bearbeiten" ? (
                        <div>
                            <h1>Event bearbeiten</h1>
                            <input
                                type="text"
                                name="title"
                                value={inputValues.title}
                                onChange={handleInputChange}
                                placeholder="Event-Titel eingeben"
                                className="p-2 border rounded"
                            />
                            <p className="mt-3">Eventbeginn</p>
                            <input
                                type="date"
                                name="startDate"
                                value={inputValues.startDate}
                                onChange={handleInputChange}
                                className="p-2 border rounded text-gray-500"
                            />
                            <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                            <input
                                type="date"
                                name="endDate"
                                value={inputValues.endDate}
                                onChange={handleInputChange}
                                className="p-2 border rounded text-gray-500"
                            />
                            <p className="mt-3">Details zu deinem Event</p>
                            <textarea
                                type="text"
                                name="description"
                                value={inputValues.description}
                                onChange={handleInputChange}
                                placeholder="Details"
                                className="p-2 border rounded h-32"
                            />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <p>
                                <Button onClick={saveEvent}>Änderungen speichern</Button>
                                <Button onClick={() => switchContent("Details")}>Abbrechen</Button>
                            </p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-xl flex-col font-bold"></h1>
                            <p></p>
                        </div>
                    )}

                    {activeContent === "EventOverview" && (
                        <div>
                            <h1 className="text-xl flex-col font-bold">Eventübersicht</h1>
                            <p className="text-sm">Event auswählen, um Details anzuzeigen.</p>
                            <p className="text-lg underline underline-offset-2">Demnächst:</p>
                            <ul className="space-y-4">
                                {events.map((event) => (
                                    <li key={event.id} className="p-4 border border-gray-300 rounded-lg shadow-md">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-lg cursor-pointer" onClick={() => handleEventClick({ event })}>
                                                {event.title}
                                            </span>
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-400 block">
                                            {formatDate(event.start)} {formatTime(event.start)}{" "}
                                            {event.end && `bis ${formatDate(event.end)} ${formatTime(event.end)}`}
                                        </span>

                                        
                                        <button
                                            onClick={() => {
                                                let newShow = eventTaskShow.map((e) => {
                                                    if (e.id === event.id) {
                                                        e.show = !e.show;
                                                    }
                                                    return e;
                                                });
                                                setEventTaskShow(newShow);
                                            }}
                                            className="ml-2"
                                        >
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${
                                                    eventTaskShow.find((e) => e.id === event.id)?.show ? "rotate-180" : "rotate-0"
                                                }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                                            </svg>
                                        </button>
                                        <div
                                            className={
                                                eventTaskShow.length > 0 && eventTaskShow.filter((ets) => ets.id === event.id)[0]?.show ? " " : " hidden "
                                            }
                                        >
                                            {tasks
                                                .filter((t) => t.id_event === event.id)
                                                .map((t) => (
                                                    <div
                                                        key={t.id}
                                                        onClick={() => toggleTaskSelection(t)} // Beim Klick Task umschalten
                                                        style={{
                                                            cursor: "pointer",
                                                            color: isTaskSelected(t) ? "green" : "gray-600 dark:gray-400", // Ändere die Farbe, wenn markiert
                                                        }}
                                                        onMouseEnter={(e) => (e.target.style.color = "blue")}
                                                        onMouseLeave={(e) => (e.target.style.color = isTaskSelected(t) ? "green" : "gray-600 dark:gray-400")}
                                                    >
                                                        {t.title}
                                                    </div>
                                                ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default PageMain;
