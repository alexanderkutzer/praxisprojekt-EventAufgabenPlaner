import React, { useState } from "react";
import Button from "../../../../components/Button";
import { apiDeleteTask, apiUpdateTask } from "../../../../service/api_calls";

function TaskDetail({
    inputValues,
    handleInputChange,
    events,
    errorMessage,
    saveTask,
    switchContent,
    selectedTasks,
    formatDate,
    formatTime,
    update,
    setUpdate,
    menuSesitive,
    setMenuSensitive,
}) {
    const [task, setTask] = useState(selectedTasks[0]);
    const [deleteTaskMenu, setDeleteTaskMenu] = useState(false);
    return (
        <>
            <div>
                <h1>Aufgabe bearbeiten</h1>
                <select
                    name="id_event"
                    value={task.id_event}
                    onChange={(e) => {
                        setTask(tasks.filter((t) => t.id == e.target.value));
                    }}
                >
                    {events.map((event) => {
                        return (
                            <option key={event.id} value={event.id}>
                                {event.title} ({formatDate(event.start)})
                            </option>
                        );
                    })}
                </select>
                <p className="mt-3">Title</p>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="p-2 border rounded text-gray-500"
                />
                <p className="mt-3">Beschreibung</p>
                <textarea
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    placeholder="Details"
                    className="p-2 border rounded h-32"
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
                            name="inProgress"
                            checked={task.inProgress}
                            onChange={(e) => {
                                setTask({ ...task, inProgress: e.target.checked });
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

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <Button
                        onClick={async () => {
                            let updatedTask = {
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
                                in_progress: task.inProgress,
                                done: task.done,
                            };
                            await apiUpdateTask(task.id, updatedTask);
                            setUpdate(!update);
                            switchContent("EventOverview");
                            setMenuSensitive("date");
                        }}
                        className="resize-none w-1/2"
                    >
                        Änderungen speichern
                    </Button>
                    {!deleteTaskMenu && (
                        <Button onClick={() => setDeleteTaskMenu(true)} className="resize-none w-1/2">
                            Löschen
                        </Button>
                    )}
                    {deleteTaskMenu && (
                        <div className="flex justify-between">
                            <Button
                                className="resize-none w-1/4 bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
                                onClick={() => setDeleteTaskMenu(false)}
                            >
                                Nein
                            </Button>
                            <Button
                                className="resize-none w-1/4 bg-red-500 hover:bg-red-600  dark:bg-red-500 dark:hover:bg-red-600"
                                onClick={async () => {
                                    await apiDeleteTask(task.id);
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
                        onClick={() => {
                            switchContent("EventOverview");
                            setMenuSensitive("date");
                        }}
                        className="resize-none w-1/2"
                    >
                        Abbrechen
                    </Button>
                </div>
            </div>
        </>
    );
}

export default TaskDetail;
