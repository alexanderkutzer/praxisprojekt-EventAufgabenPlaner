import React, { useState, useRef, useEffect } from "react";
import Calendar from "../../Calendar.jsx";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../service/authStatus.jsx";
import {apiGetEvents, apiGetTasks} from "../../service/api_calls.js";

function PageMain() {
    const { isLoggedIn_AuthService, token_AuthService, setToken_AuthService } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([
        { id: 1, title: "Team Meeting", start: "2024-10-25", end: "2024-10-28T12:00:00", extendedProps: { description: "Description for Event 1" } },
        { id: 2, title: "Event 2", start: "2024-10-15", extendedProps: { description: "Description for Event 2" } },
        { id: 3, title: "Event 3", start: "2024-10-20", extendedProps: { description: "Description for Event 3" } },
        { id: 4, title: "Event 4", start: "2024-10-20", extendedProps: { description: "Description for Event 4" } },

    ]);
    const [tasks, setTask] = useState([
        { id: 1, id_event: 1, user_id: "", title: "TestTask 1", description: "Test Descripten Task 1", todo: 0, inProgress: 0, done: 0 },
        { id: 2, id_event: 1, user_id: "", title: "TestTask 2", description: "Test Descripten Task 2", todo: 0, inProgress: 0, done: 0 },
        { id: 3, id_event: 1, user_id: "", title: "TestTask 3", description: "Test Descripten Task 3", todo: 0, inProgress: 0, done: 0 },
        { id: 4, id_event: 2, user_id: "", title: "TestTask 3", description: "Test Descripten Task 3", todo: 0, inProgress: 0, done: 0 },
        { id: 5, id_event: 3, user_id: "", title: "TestTask 3", description: "Test Descripten Task 3", todo: 0, inProgress: 0, done: 0 },
        { id: 6, id_event: 3, user_id: "", title: "TestTask 3", description: "Test Descripten Task 3", todo: 0, inProgress: 0, done: 0 },
        { id: 7, id_event: 4, user_id: "", title: "TestTask 4", description: "Test Descripten Task 3", todo: 0, inProgress: 0, done: 0 },
    ]);


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await apiGetEvents();
                console.log("Events: ", events);
                setEvents(events); 
            } catch (error) {
                console.error("Fehler beim Abrufen der Events", error);
            }
        };
        fetchEvents();
    }, [])


    useEffect(() => {
        const fetchTasks = async () => {
            try{
                const tasks = await apiGetTasks();
                console.log("Tasks: ", tasks)
                setTask(tasks);
            } catch (error) {
                console.log("Fehler beim Abrufen der Tasks", error);
            }
        };
        fetchTasks();
    }, [])

    const [eventTaskShow, setEventTaskShow] = useState([]);
    useEffect(() => {
        let list = [];
        console.log(events.length);
        events.forEach((event) => {
            let status = {
                id: event.id,
                show: false,
            };
            list.push(status);
        });
        setEventTaskShow(list);
    }, [events]);

    useEffect(() => {
        console.log(eventTaskShow);
    }, [eventTaskShow]);



    const [selectedTasks, setSelectedTasks] = useState([]); 

    const toggleTaskSelection = (task) => {

        if (selectedTasks.includes(task)) {
            setSelectedTasks(selectedTasks.filter((t) => t.id !== task.id));
        } else {
            setSelectedTasks([...selectedTasks, task]);
        }
    };
    
    const isTaskSelected = (task) => (selectedTasks.filter((t) => t.id == task.id).length == 1)
    
    
    useEffect(() => {
        console.log("Markierte Tasks:", selectedTasks);
    }, [selectedTasks]);
    
    
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
        console.log(date);
        setSelectedDate(date);
    };
    const onDateSelect = ({ start, end }) => {
        console.log(start, end);
    };
    const handleEventClick = (info) => {
        setSelectedEvent({
            id: info.event.id,
            title: info.event.title,
            start: info.event.startStr,
            end: info.event.endStr,
            description: info.event.extendedProps.description,
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

    const saveEvent = () => {
        if (!inputValues.title || !inputValues.startDate) {
            setErrorMessage("Titel und Startdatum müssen angegeben werden.");
            return;
        }

        if (inputValues.endDate && inputValues.endDate < inputValues.startDate) {
            setErrorMessage("Das Enddatum kann nicht vor dem Startdatum liegen.");
            return;
        }

        if (selectedEvent) {
            const updatedEvents = events.map((event) => {
                if (event.id === selectedEvent.id) {
                    return {
                        ...event,
                        title: inputValues.title,
                        start: inputValues.startDate,
                        end: inputValues.endDate || null,
                        extendedProps: { description: inputValues.description || "" },
                    };
                }
                return event;
            });
            setEvents(updatedEvents);
        } else {
            const newEvent = {
                id: Date.now(),
                title: inputValues.title,
                start: inputValues.startDate,
                end: inputValues.endDate || null,
                extendedProps: { description: inputValues.description || "" },
            };
            setEvents([...events, newEvent]);
        }

        switchContent("EventOverview");
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
        inputValues.startDate = selectedDate + "T00:00:00";
        inputValues.endDate = selectedDate + "T00:00:00";
        setInputValues({ ...inputValues });
    }, [selectedDate]);

    return (
        <>
            <div>
                <Button onClick={() => switchContent("EventOverview")}>Event Übersicht</Button>
                <Button onClick={() => switchContent("AddEvent")}>Neues Event</Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start w-full mt-8">
                <div className="w-full sm:w-1/2 max-w-[50%] min-w-96">
                    <Calendar
                        key={JSON.stringify(events)} // Neurendering bei Änderung
                        events={events}
                        onDateClick={onDateClick}
                        onEventClick={handleEventClick}
                        onDateSelect={onDateSelect}
                        ref={calendarRef}
                    />
                </div>

                <div className="w-full sm:w-1/2 max-w-[50%] p-4">
                    {selectedEvent && activeContent === "Details" ? (
                        <div>
                            <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                            <p>Start Datum: {selectedEvent.start}</p>
                            <p>End Datum: {selectedEvent.end}</p>
                            <p>{selectedEvent.description}</p>
                            <Button onClick={startEditing}>Bearbeiten</Button>
                            <Button onClick={() => switchContent("EventOverview")}>Abbrechen</Button>
                        </div>
                    ) : activeContent === "AddEvent" ? (
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-2xl font-semibold">Neues Event hinzufügen</h1>
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
                                type="datetime-local"
                                name="startDate"
                                value={inputValues.startDate}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                            <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                            <input
                                type="datetime-local"
                                name="endDate"
                                value={inputValues.endDate}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                            <p className="mt-3">Details zu deinem Event</p>
                            <input
                                type="text"
                                name="description"
                                value={inputValues.description}
                                onChange={handleInputChange}
                                placeholder="Details"
                                className="p-2 border rounded"
                            />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <Button onClick={saveEvent}>Event erstellen</Button>
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
                                type="datetime-local"
                                name="startDate"
                                value={inputValues.startDate}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                            <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                            <input
                                type="datetime-local"
                                name="endDate"
                                value={inputValues.endDate}
                                onChange={handleInputChange}
                                className="p-2 border rounded"
                            />
                            <p className="mt-3">Details zu deinem Event</p>
                            <input
                                type="text"
                                name="description"
                                value={inputValues.description}
                                onChange={handleInputChange}
                                placeholder="Details"
                                className="p-2 border rounded"
                            />
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <Button onClick={saveEvent}>Änderungen speichern</Button>
                        </div>
                    ) : (
                        <p>Event auswählen, um Details anzuzeigen.</p>
                    )}

                    {activeContent === "EventOverview" && (
                        <div>
                            <h1>Anstehende Events</h1>
                            <p>Demnächst:</p>
                            <ul className="space-y-4">
                                {events.map((event) => (
                                    <li key={event.id}>
                                        <button
                                            onClick={() => handleEventClick({ event })} // Klickbares Element
                                            className="underline"
                                        >
                                            {event.title}
                                        </button>
                                        <p>
                                            {event.start} {event.end && ` bis ${event.end}`}
                                        </p>
                                        <button
                                            onClick={() => {
                                                let newShow =
                                                    eventTaskShow.length > 0 &&
                                                    eventTaskShow.map((e) => {
                                                        if (e.id === event.id) {
                                                            e.show = !e.show;
                                                        }
                                                        return e;
                                                    });
                                                setEventTaskShow(newShow);
                                            }}
                                        >
                                            {eventTaskShow.find((e) => e.id === event.id)?.show ? "-" : "+"}
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
                                                        onClick={() => toggleTaskSelection(t)}  // Beim Klick Task umschalten
                                                        style={{
                                                            cursor: "pointer",
                                                            color: isTaskSelected(t) ? "green" : "black",  // Ändere die Farbe, wenn markiert
                                                        }}
                                                        onMouseEnter={(e) => (e.target.style.color = "blue")}
                                                        onMouseLeave={(e) => (e.target.style.color = isTaskSelected(t) ? "green" : "black")}
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
