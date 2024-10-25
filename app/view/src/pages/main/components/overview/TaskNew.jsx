import React, { useEffect } from "react";
import Button from "../../../../components/Button";

function TaskNew({ inputValues, saveTask, handleInputChange, switchContent, errorMessage, events, selectedEventForTask, formatDate, formatTime }) {
    useEffect(() => {
        events.forEach((e, i) => {
            if (i == 0) {
                inputValues.id_event = e.id;
                handleInputChange({ target: { name: "id_event", value: e.id } });
            }
        });
    }, []);
    return (
        <>
            <div className="flex flex-col space-y-4">
                <h1 className="text-2xl font-semibold">Neue Aufgabe hinzufügen</h1>
                <select id="event-select" name="id_event" value={inputValues.id_event} onChange={handleInputChange} className="p-2 border rounded">
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
                <p>Status</p>
                <div className="flex flex-col gap-2 my-4">
                    <div className="flex">
                        <label className="flex w-1/4">Todo:</label>
                        <input className="w-6" type="checkbox" name="todo" checked={inputValues.todo} onChange={handleInputChange} />
                    </div>
                    <div className="flex">
                        <label className="flex w-1/4">In Arbeit:</label>
                        <input className="w-6" type="checkbox" name="inProgress" checked={inputValues.inProgress} onChange={handleInputChange} />
                    </div>
                    <div className="flex">
                        <label className="flex w-1/4">Fertig:</label>
                        <input className="w-6" type="checkbox" name="done" checked={inputValues.done} onChange={handleInputChange} />
                    </div>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button onClick={saveTask}>Aufgabe erstellen</Button>
                <Button onClick={() => switchContent("EventOverview")}>Abbrechen</Button>
            </div>
        </>
    );
}

export default TaskNew;
