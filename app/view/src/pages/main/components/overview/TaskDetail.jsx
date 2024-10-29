import React, { useState } from "react";
import Button from "../../../../components/Button";
import { apiDeleteTask, apiUpdateTask } from "../../../../service/api_calls";

function TaskDetail({
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
    selectedTime,
    setSelectedTime,
}) {
    const [task, setTask] = useState(selectedTasks[0]);
    const [deleteTaskMenu, setDeleteTaskMenu] = useState(false);
    return (
        <>
            <div className="flex flex-col md:gap-2">
                <div className="font-bold">Event auswahl</div>
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
                <div className="font-bold">Title</div>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={(e) => setTask({ ...task, title: e.target.value })}
                    className="p-2 border rounded text-gray-500"
                />
                {/* <div className="font-bold">Beschreibung</div>
                <textarea
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    placeholder="Details"
                    className="p-2 border rounded h-32"
                /> */}
                <div className="font-bold">Status</div>
                <div className="flex flex-col gap-2 my-4">
                    {/* <div className="flex">
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
                    </div> */}
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

                    <div className="flex justify-between">
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
                                    in_progress: task.in_progress,
                                    done: task.done,
                                };
                                await apiUpdateTask(task.id, updatedTask);
                                setUpdate(!update);
                                switchContent("EventOverview");
                                setMenuSensitive("date");
                            }}
                            className="text-nowrap"
                        >
                            Änderungen speichern
                        </Button>
                        {!deleteTaskMenu && (
                            <Button onClick={() => setDeleteTaskMenu(true)} className="">
                                Löschen
                            </Button>
                        )}
                        {deleteTaskMenu && (
                            <div className="flex w-full justify-between px-1">
                                <Button
                                    className=" bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
                                    onClick={() => setDeleteTaskMenu(false)}
                                >
                                    Nein
                                </Button>
                                <Button
                                    className="px-5  bg-red-500 hover:bg-red-600  dark:bg-red-500 dark:hover:bg-red-600"
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
                            className="text-nowrap"
                        >
                            Abbrechen
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TaskDetail;
