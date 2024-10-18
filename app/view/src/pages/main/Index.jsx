import React, { useState, useRef, useEffect } from "react";
import Calendar from "../../Calendar.jsx";
import Button from "../../components/Button.jsx";

function PageMain() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([
        { id: 1, title: "Event 1", start: "2024-10-25", end: "2024-10-28", extendedProps: { description: "Description for Event 1" } },
        { id: 2, title: "Event 2", start: "2024-10-15", extendedProps: { description: "Description for Event 2" } },
        { id: 3, title: "Event 3", start: "2024-10-20", extendedProps: { description: "Description for Event 3" } },
    ]);
    const [activeContent, setActiveContent] = useState("EventOverview");
    const [inputValues, setInputValues] = useState({
        title: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const calendarRef = useRef(null);

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
                if (event.id == selectedEvent.id) {
                    event = {
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

    return (
        <>
            <div>
                <Button onClick={() => switchContent("EventOverview")}>Event Übersicht</Button>
                <Button onClick={() => switchContent("AddEvent")}>Neues Event</Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start w-full mt-8">
                <div className="w-full sm:w-1/2 max-w-[50%]">
                    <Calendar
                        key={JSON.stringify(events)} // Neurendering bei Änderung
                        events={events}
                        onEventClick={handleEventClick}
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
                            <input type="date" name="startDate" value={inputValues.startDate} onChange={handleInputChange} className="p-2 border rounded" />
                            <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                            <input type="date" name="endDate" value={inputValues.endDate} onChange={handleInputChange} className="p-2 border rounded" />
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
                            <input type="date" name="startDate" value={inputValues.startDate} onChange={handleInputChange} className="p-2 border rounded" />
                            <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                            <input type="date" name="endDate" value={inputValues.endDate} onChange={handleInputChange} className="p-2 border rounded" />
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
                                        {event.title}
                                        {event.start} {event.end && ` bis ${event.end}`}
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
