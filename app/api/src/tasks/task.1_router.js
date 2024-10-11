import { Router } from "express";
import {
    createTaskController,
    deleteTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
} from "./task.2_controller.js";

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

const router = Router();

router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.post("/", createTaskController);
router.put("/", updateTaskController);
router.delete("/", deleteTaskController);

export default router;
