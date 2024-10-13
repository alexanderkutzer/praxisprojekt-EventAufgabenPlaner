import { Router } from "express";

export class TaskRouter {
    constructor(taskController) {
        this.taskController = taskController;
        return this.router();
    }
    router() {
        const router = Router();
        router.get("/", this.taskController.getAllTasksController);
        router.get("/:id", this.taskController.getTaskByIdController);
        router.post("/", this.taskController.createTaskController);
        router.put("/", this.taskController.updateTaskController);
        router.delete("/", this.taskController.deleteTaskController);
        return router;
    }
}
