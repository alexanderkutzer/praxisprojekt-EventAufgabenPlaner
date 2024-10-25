import React from "react";
import Button from "../../../../components/Button";

function TaskNew({
    inputValues,
    saveTask,
    handleInputChange,
    switchContent,
    errorMessage,
    events,
    selectedEventForTask,
    handleEventSelectChange,
    formatDate,
    formatTime,
}) {
    return (
        <>
            <div className="flex flex-col space-y-4">
                <h1 className="text-2xl font-semibold">Neue Aufgabe hinzufügen</h1>
                <select id="event-select" value={selectedEventForTask} onChange={handleEventSelectChange} className="p-2 border rounded">
                    <option value="" disabled>
                        -- Wähle ein Event --
                    </option>
                    {events.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.title} (Start: {formatDate(event.start)} {formatTime(event.start)})
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
        </>
    );
}

export default TaskNew;
