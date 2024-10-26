import React, { useEffect, useInsertionEffect, useLayoutEffect, useState } from "react";
import Button from "../../../../components/Button";
import { apiDeleteEvent, apiUpdateEvent } from "../../../../service/api_calls";

function EventDetail({
    selectedDate,
    selectedEvent,
    selectedDateForInputs,
    inputValues,
    setInputValues,
    saveEvent,
    handleInputChange,
    switchContent,
    errorMessage,
    formatDate,
    formatTime,
    update,
    setUpdate,
}) {
    const [event, setEvent] = useState(selectedEvent);
    const [deleteEventMenu, setDeleteEventMenu] = useState(false);
    useEffect(() => {
        console.log(123, selectedEvent);
        setEvent({ ...selectedEvent, start: selectedDate, end: selectedDate });
    }, [selectedDate]);
    return (
        <>
            <div className="flex flex-col space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold">Neues Event hinzufügen</h1>
                <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                    placeholder="Event Titel"
                    className="p-2 border rounded resize-none w-1/2"
                />
                <p className="mt-3">Eventbeginn</p>
                <input
                    type="text"
                    name="startDate"
                    value={formatDate(event.start)}
                    onChange={(e) => setEvent({ ...event, startDate: e.target.value })}
                    className="p-2 border rounded resize-none w-1/2 text-gray-500"
                />
                <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                <input
                    type="text"
                    name="endDate"
                    value={formatDate(event.end)}
                    onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
                    className="p-2 border rounded resize-none w-1/2 text-gray-500"
                />
                <p className="mt-3">Details zu deinem Event</p>
                <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                    placeholder="Details"
                    className="p-2 border rounded h-32"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button
                    className="resize-none w-1/2"
                    onClick={() => {
                        event.startDateTime = event.start;
                        event.endDateTime = event.end;
                        let updatedEvent = {
                            id: event.id,
                            id_user: event.id_user,
                            title: event.title,
                            description: event.description,
                            startDateTime: event.start,
                            endDateTime: event.end,
                        };

                        apiUpdateEvent(updatedEvent.id, updatedEvent);
                        setUpdate(!update);
                        switchContent("EventOverview");
                    }}
                >
                    Event updaten
                </Button>
                {!deleteEventMenu && (
                    <Button onClick={() => setDeleteEventMenu(true)} className="resize-none w-1/2">
                        Löschen
                    </Button>
                )}
                {deleteEventMenu && (
                    <div className="flex justify-between">
                        <Button
                            className="resize-none w-1/4 bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
                            onClick={() => setDeleteEventMenu(false)}
                        >
                            Nein
                        </Button>
                        <Button
                            className="resize-none w-1/4 bg-red-500 hover:bg-red-600  dark:bg-red-500 dark:hover:bg-red-600"
                            onClick={() => {
                                apiDeleteEvent(event.id);
                                setUpdate(!update);
                                switchContent("EventOverview");
                            }}
                        >
                            Ja
                        </Button>
                    </div>
                )}
                <Button className="resize-none w-1/2" onClick={() => switchContent("EventOverview")}>
                    Abbrechen
                </Button>
            </div>
        </>
    );
}

export default EventDetail;
