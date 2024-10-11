import {
    createTaskService,
    deleteTaskService,
    getAllTasksService,
    getTaskByIdService,
    updateTaskService,
} from "./task.3_service.js";

export function getAllTasksController(req, res) {
    res.json(getAllTasksService() ?? []);
}
export function getTaskByIdController(req, res) {
    const id = req.params.id;
    res.json(getTaskByIdService(id) ?? {});
}
export function createTaskController(req, res) {
    let newTask = req.body;
    res.json(createTaskService(newTask) ?? {});
}
export function updateTaskController(req, res) {
    let updateTask = req.body;
    res.json(updateTaskService(updateTask) ?? {});
}
export function deleteTaskController(req, res) {
    let deleteTask = req.body;
    res.json(deleteTaskService(deleteTask) ?? {});
}
