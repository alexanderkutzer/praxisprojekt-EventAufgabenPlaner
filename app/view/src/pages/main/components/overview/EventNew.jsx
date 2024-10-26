import React from "react";
import Button from "../../../../components/Button";

function EventNew({ selectedDate, selectedDateForInputs, inputValues, saveEvent, handleInputChange, switchContent, errorMessage }) {
    inputValues.startDate = selectedDateForInputs;
    inputValues.endDate = selectedDateForInputs;
    inputValues.startDateUnix = selectedDate;
    inputValues.endDateUnix = selectedDate;
    return (
        <>
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
