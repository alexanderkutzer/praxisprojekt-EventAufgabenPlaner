let tasks = [];
export class TaskService {
    constructor(dbService) {
        this.table = "tasks";
    }
    getAll() {
        return dbService.getAll(this.table);
    }
    getOne(id) {
        return dbService.getOne(this.table, id);
    }
    create(newTask) {
        newTask.id = crypto.randomUUID();
        let dbNewTask = dbService.create(this.table, data);
        if (!dbNewTask) {
            return { create: false, Task: {} };
        }
        return { create: true, Task: newTask };
    }
    update(data) {
        return dbService.update(this.table, data);
    }
    delete(data) {
        return dbService.delete(this.table, data);
    }
}
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
