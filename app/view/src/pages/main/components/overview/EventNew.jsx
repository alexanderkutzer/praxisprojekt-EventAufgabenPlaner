import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { apiCreateEvent } from "../../../../service/api_calls";
import TimeViewSelector from "./components/TimeViewSelector";
import ColorPicker from "./components/ColorPicker";

function EventNew({
    selectedDate,
    selectedEvent,
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
    const [event, setEvent] = useState({
        title: "",
        start: "",
        startTime: "",
        description: "",
    });
    const [color, setColor] = useState("#ff0000");

    useEffect(() => {
        setEvent({ ...(selectedEvent ?? event), start: selectedDate ?? 0 });
    }, [selectedDate]);
    return (
        <>
            <div className="flex flex-col gap-1 p-2 border border-gray-300 rounded-lg shadow-lg">
                <div>Title</div>
                <Input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={(e) => {
                        setEvent({ ...event, title: e.target.value });
                    }}
                    placeholder="Event Titel"
                    className="p-2 border rounded resize-none w-1/2"
                />
                <div className="flex items-center gap-2">
                    <div className="">Datum</div>
                    <div>{formatDate(event.start)}</div>
                    <div>Uhrzeit</div>
                    <TimeViewSelector getTime={{ hour: null, minute: null }} selectedTime={selectedTime} setSelectedTime={setSelectedTime}></TimeViewSelector>
                </div>
                <div>
                    <ColorPicker color={color} setColor={setColor}></ColorPicker>
                </div>
                <div>Aufgaben</div>
                {/* <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                <input
                    type="text"
                    name="endDate"
                    onChange={handleInputChange}
                    className="p-2 border rounded resize-none w-1/2 text-gray-500"
                /> */}
                <div className="mt-3">Details zu deinem Event</div>
                <textarea
                    name="description"
                    value={event.description}
                    onChange={(e) => {
                        setEvent({ ...event, description: e.target.value });
                    }}
                    placeholder="Details"
                    className="p-2 border rounded h-32"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button
                    className="resize-none w-1/2"
                    onClick={async () => {
                        const newEvent = {
                            title: event.title,
                            description: event.description,
                            startDateTime: selectedDate,
                            startTime: JSON.stringify(selectedTime),
                            color: color != "#ff0000" ? color : null,
                        };
                        await apiCreateEvent(newEvent);
                        setUpdate(!update);
                        setMenuSensitive("date");
                        switchContent("EventOverview");
                    }}
                >
                    Event erstellen
                </Button>
                <Button
                    className="resize-none w-1/2"
                    onClick={() => {
                        switchContent("EventOverview");
                        setMenuSensitive("date");
                    }}
                >
                    Abbrechen
                </Button>
            </div>
        </>
    );
}

export default EventNew;
