import React from "react";
import Button from "../../../../components/Button";

function TaskDetail({ inputValues, handleInputChange, events, errorMessage, saveTask, switchContent, formatDate, formatTime }) {
    // console.log(JSON.stringify(inputValues));
    return (
        <>
            <div>
                <h1>Aufgabe bearbeiten</h1>
                <select name="id_event" value={inputValues.id_event} onChange={handleInputChange}>
                    {events.map((event) => {
                        return (
                            <option key={event.id} value={event.id}>
                                {event.title} : {formatDate(event.start)} {formatTime(event.start)}
                            </option>
                        );
                    })}
                </select>
                <p className="mt-3">Title</p>
                <input type="text" name="title" value={inputValues.title} onChange={handleInputChange} className="p-2 border rounded text-gray-500" />
                <p className="mt-3">Beschreibung</p>
                <textarea
                    type="text"
                    name="description"
                    value={inputValues.description}
                    onChange={handleInputChange}
                    placeholder="Details"
                    className="p-2 border rounded h-32"
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
                <p>
                    <Button onClick={saveTask}>Änderungen speichern</Button>
                    <Button onClick={() => switchContent("Details")}>Abbrechen</Button>
                </p>
            </div>
        </>
    );
}

export default TaskDetail;
