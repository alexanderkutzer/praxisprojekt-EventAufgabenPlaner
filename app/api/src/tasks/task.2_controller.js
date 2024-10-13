export class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
        this.getAllTasksController = this.getAllTasksController.bind(this);
        this.getTaskByIdController = this.getTaskByIdController.bind(this);
        this.createTaskController = this.createTaskController.bind(this);
        this.updateTaskController = this.updateTaskController.bind(this);
        this.deleteTaskController = this.deleteTaskController.bind(this);
    }
    async getAllTasksController(req, res) {
        res.json((await this.taskService.getAll()) ?? []);
    }
    async getTaskByIdController(req, res) {
        const id = req.params.id;
        res.json((await this.taskService.getOne(id)) ?? {});
    }
    async createTaskController(req, res) {
        let newTask = req.body;
        res.json((await this.taskService.create(newTask)) ?? {});
    }
    async updateTaskController(req, res) {
        let updateTask = req.body;
        res.json((await this.taskService.update(updateTask)) ?? {});
    }
    async deleteTaskController(req, res) {
        let deleteTask = req.body;
        res.json((await this.taskService.delete(deleteTask)) ?? {});
    }
}
