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
        try {
            res.json((await this.taskService.getAll()) ?? []);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - f64386ca-fb06-4ae4-8aac-ce940d34dea9",
            });
        }
    }
    async getTaskByIdController(req, res) {
        try {
            const id = req.params.id;
            res.json((await this.taskService.getOne(id)) ?? {});
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 0f12a2aa-763e-425d-a484-ee7a12c794e8",
            });
        }
    }
    async createTaskController(req, res) {
        try {
            let newTask = req.body;
            res.json((await this.taskService.create(newTask)) ?? {});
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 957031ff-aafe-423f-aa43-723d16d84da4",
            });
        }
    }
    async updateTaskController(req, res) {
        try {
            const id = req.params.id;
            const updateTask = req.body;
            res.json((await this.taskService.update(updateTask)) ?? {});
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 1acb096b-5bc9-4156-a4ff-c25051002fa3",
            });
        }
    }
    async deleteTaskController(req, res) {
        try {
            let id = req.params.id;
            const result = await this.taskService.delete(id);
            if (!result) {
                res.status(404).json({ delete: false, id: id });
                return;
            }
            res.json({ delete: true, id: id });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - e9d4df66-29df-4e8a-a02c-8f9cf1ed354c",
            });
        }
    }
}
