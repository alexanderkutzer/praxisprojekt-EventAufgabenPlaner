import React from "react";
import Button from "../../../../components/Button";

function EventDetail({ saveEvent, switchContent, inputValues, handleInputChange, errorMessage }) {
    return (
        <>
            <div className="dark:text-[#D5CDB8]">
                <h1 className="text-xl">Event bearbeiten</h1>
                <p className="mt-3">Event Titel</p>
                <input
                    type="text"
                    name="title"
                    value={inputValues.title}
                    onChange={handleInputChange}
                    placeholder="Event-Titel eingeben"
                    className="p-2 border rounded"
                />
                <p className="mt-3">Eventbeginn</p>
                <input type="date" name="startDate" value={inputValues.startDate} onChange={handleInputChange} className="p-2 border rounded text-gray-500" />
                <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                <input type="date" name="endDate" value={inputValues.endDate} onChange={handleInputChange} className="p-2 border rounded text-gray-500" />
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
        </>
    );
}

export default EventDetail;
