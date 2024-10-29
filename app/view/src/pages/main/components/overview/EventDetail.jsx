import React, { useEffect, useInsertionEffect, useLayoutEffect, useState } from "react";
import Button from "../../../../components/Button";
import { apiDeleteEvent, apiUpdateEvent } from "../../../../service/api_calls";
import Input from "../../../../components/Input";
import TimeViewSelector from "./components/TimeViewSelector";
import ColorPicker from "./components/ColorPicker";

function EventDetail({
    selectedDate,
    selectedEvent,
    setSelectedDate,
    setSelectedEvent,
    selectedDateForInputs,
    saveEvent,
    handleInputChange,
    switchContent,
    errorMessage,
    formatDate,
    formatTime,
    update,
    setUpdate,
    menuSesitive,
    setMenuSensitive,
    selectedTime,
    setSelectedTime,
}) {
    const [event, setEvent] = useState(selectedEvent);
    const [deleteEventMenu, setDeleteEventMenu] = useState(false);
    const [color, setColor] = useState(event.colors?.normal ?? "#ff0000");
    setSelectedEvent(selectedEvent);
    useEffect(() => {
        setEvent({ ...selectedEvent, start: selectedDate });
    }, [selectedDate]);
    return (
        <>
            <div className="flex flex-col gap-1 p-2 border border-gray-300 rounded-lg shadow-lg">
                <div>Title</div>
                <Input type="text" name="title" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} placeholder="Event Titel" />
                <div className="flex flex-row items-center gap-2">
                    <div>Datum</div>
                    <div>{formatDate(event.start)}</div>
                    <div>Uhrzeit</div>
                    <TimeViewSelector
                        getTime={event.startTime ?? { hour: 12, minute: 0 }}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                    ></TimeViewSelector>
                </div>
                <div>
                    <ColorPicker color={color} setColor={setColor}></ColorPicker>
                </div>
                <div>Aufgaben</div>
                {/* <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                <input
                    type="text"
                    name="endDate"
                    value={formatDate(event.end)}
                    onChange={(e) => setEvent({ ...event, endDate: e.target.value })}
                    className="p-2 border rounded resize-none w-1/2 text-gray-500"
                /> */}
                <div className="mt-3">Details zu deinem Event</div>
                <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                    placeholder="Details"
                    className="p-2 border rounded"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div className="flex justify-between">
                    <Button
                        className="text-nowrap"
                        onClick={() => {
                            event.startDateTime = event.start;
                            event.endDateTime = event.end;
                            let updatedEvent = {
                                id: event.id,
                                id_user: event.id_user,
                                title: event.title,
                                description: event.description,
                                startDateTime: event.start,
                                startTime: JSON.stringify(selectedTime),
                                endDateTime: event.end,
                                color: color,
                            };
                            apiUpdateEvent(updatedEvent.id, updatedEvent);
                            setUpdate(!update);
                            switchContent("EventOverview");
                            setMenuSensitive("date");
                        }}
                    >
                        Event updaten
                    </Button>
                    {!deleteEventMenu && (
                        <Button onClick={() => setDeleteEventMenu(true)} className="">
                            Löschen
                        </Button>
                    )}
                    {deleteEventMenu && (
                        <div className="flex w-full justify-between px-1">
                            <Button
                                className=" bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
                                onClick={() => setDeleteEventMenu(false)}
                            >
                                Nein
                            </Button>
                            <Button
                                className="px-5 bg-red-500 hover:bg-red-600  dark:bg-red-500 dark:hover:bg-red-600"
                                onClick={() => {
                                    apiDeleteEvent(event.id);
                                    setUpdate(!update);
                                    switchContent("EventOverview");
                                    setMenuSensitive("date");
                                }}
                            >
                                Ja
                            </Button>
                        </div>
                    )}
                    <Button
                        className="text-nowrap"
                        onClick={() => {
                            switchContent("EventOverview");
                            setMenuSensitive("date");
                        }}
                    >
                        Abbrechen
                    </Button>
                </div>
            </div>
        </>
    );
}

export default EventDetail;
