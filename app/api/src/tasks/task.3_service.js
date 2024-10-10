let tasks = [];
export function getAllTasksService() {
    return tasks;
}
export function getTaskByIdService(id) {
    return tasks.find((Task) => Task.id === id);
}
export function createTaskService(newTask) {
    newTask.id = crypto.randomUUID();
    tasks.push(newTask);
    return { create: true, Task: newTask };
}
export function updateTaskService(updateTask) {
    const index = tasks.findIndex((task) => task.id === updateTask.id);
    tasks[index] = updateTask;
    return { update: true, task: updateTask };
}
export function deleteTaskService(deleteTask) {
    tasks = tasks.filter((Task) => Task.id !== deleteTask.id);
    return { delete: true, task: deleteTask };
}
