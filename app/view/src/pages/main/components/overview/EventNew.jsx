import React from "react";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";

function EventNew({ selectedDate, selectedDateForInputs, inputValues, saveEvent, handleInputChange, switchContent, errorMessage }) {
    inputValues.startDate = selectedDateForInputs;
    inputValues.endDate = selectedDateForInputs;
    inputValues.startDateUnix = selectedDate;
    inputValues.endDateUnix = selectedDate;
    return (
        <>
            <div className="flex flex-col gap-1 p-2 border border-gray-300 rounded-lg shadow-lg">
                <div>Title</div>
                <Input
                    type="text"
                    name="title"
                    value={inputValues.title}
                    onChange={handleInputChange}
                    placeholder="Event Titel"
                    className="p-2 border rounded resize-none w-1/2"
                />
                <div className="mt-3">Datum</div>
                <Input
                    type="text"
                    name="startDate"
                    value={inputValues.startDate}
                    onChange={handleInputChange}
                    className="p-2 border rounded resize-none w-1/2 text-gray-500"
                />
                <div>Uhrzeit</div>
                <div>Farbe</div>
                <div>Aufgaben</div>
                {/* <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                <input
                    type="text"
                    name="endDate"
                    value={inputValues.endDate}
                    onChange={handleInputChange}
                    className="p-2 border rounded resize-none w-1/2 text-gray-500"
                /> */}
                <div className="mt-3">Details zu deinem Event</div>
                <textarea
                    name="description"
                    value={inputValues.description}
                    onChange={handleInputChange}
                    placeholder="Details"
                    className="p-2 border rounded h-32"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button
                    className="resize-none w-1/2"
                    onClick={() => {
                        saveEvent("new");
                    }}
                >
                    Event erstellen
                </Button>
                <Button className="resize-none w-1/2" onClick={() => switchContent("EventOverview")}>
                    Abbrechen
                </Button>
            </div>
        </>
    );
}

export default EventNew;
