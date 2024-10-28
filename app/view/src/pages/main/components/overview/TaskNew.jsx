import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import { apiCreateTask } from "../../../../service/api_calls";

function TaskNew({
    saveTask,
    handleInputChange,
    switchContent,
    errorMessage,
    events,
    selectedEvent,
    selectedEventForTask,
    formatDate,
    formatTime,
    update,
    setUpdate,
    menuSesitive,
    setMenuSensitive,
    selectedTime,
    setSelectedTime,
}) {
    const [task, setTask] = useState({
        title: "",
        description: "",
        id_event: selectedEvent?.id ?? events[0].id,
        todo: false,
        in_progress: false,
        done: false,
    });

    return (
        <>
            <div className="flex flex-col space-y-4">
                <h1 className="text-2xl font-semibold">Neue Aufgabe hinzufügen</h1>

                <select
                    id="event-select"
                    name="id_event"
                    value={task.id_event}
                    onChange={(e) => {
                        setTask({ ...task, id_event: e.target.value });
                    }}
                    className="p-2 border rounded"
                >
                    {events.map((event) => {
                        return (
                            <option key={event.id} value={event.id}>
                                {event.title} ({formatDate(event.start)})
                            </option>
                        );
                    })}
                </select>

                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={(e) => {
                        setTask({ ...task, title: e.target.value });
                    }}
                    placeholder="Aufgabe eingeben"
                    className="p-2 border rounded"
                />
                <p className="mt-3">Details zur Aufgabe</p>
                <input
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={(e) => {
                        setTask({ ...task, description: e.target.value });
                    }}
                    placeholder="Aufgaben Details"
                    className="p-2 border rounded"
                />
                <p>Status</p>
                <div className="flex flex-col gap-2 my-4">
                    <div className="flex">
                        <label className="flex w-1/4">Todo:</label>
                        <input
                            className="w-6"
                            type="checkbox"
                            name="todo"
                            checked={task.todo}
                            onChange={(e) => {
                                setTask({ ...task, todo: e.target.checked });
                            }}
                        />
                    </div>
                    <div className="flex">
                        <label className="flex w-1/4">In Arbeit:</label>
                        <input
                            className="w-6"
                            type="checkbox"
                            name="in_progress"
                            checked={task.in_progress}
                            onChange={(e) => {
                                setTask({ ...task, in_progress: e.target.checked });
                            }}
                        />
                    </div>
                    <div className="flex">
                        <label className="flex w-1/4">Fertig:</label>
                        <input
                            className="w-6"
                            type="checkbox"
                            name="done"
                            checked={task.done}
                            onChange={(e) => {
                                setTask({ ...task, done: e.target.checked });
                            }}
                        />
                    </div>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button
                    onClick={async () => {
                        let newTask = {
                            id: task.id,
                            id_user: task.id_user,
                            id_event: task.id_event,
                            id_tasks_parent: null,
                            title: task.title,
                            description: task.description,
                            importancy: null,
                            urgency: null,
                            timetrack: null,
                            timetrackstart: null,
                            timetrackestimate: null,
                            user_id: null,
                            todo: task.todo,
                            in_progress: task.in_progress,
                            done: task.done,
                        };
                        await apiCreateTask(newTask);
                        switchContent("EventOverview");
                        setMenuSensitive("date");
                        setUpdate(!update);
                    }}
                >
                    Aufgabe erstellen
                </Button>
                <Button
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

export default TaskNew;
