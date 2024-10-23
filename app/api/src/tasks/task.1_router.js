import { Router } from "express";
import { authTokenMiddleware } from "../common/authTokenMiddleware.js";

export class TaskRouter {
    constructor(taskController, userService) {
        this.taskController = taskController;
        this.userService = userService;
        return this.router();
    }
    router() {
        const router = Router();
        router.get("/", authTokenMiddleware(this.userService), this.taskController.getAllTasksController);
        router.get("/:id", authTokenMiddleware(this.userService), this.taskController.getTaskByIdController);
        router.post("/", authTokenMiddleware(this.userService), this.taskController.createTaskController);
        router.put("/:id", authTokenMiddleware(this.userService), this.taskController.updateTaskController);
        router.delete("/:id", authTokenMiddleware(this.userService), this.taskController.deleteTaskController);
        return router;
    }
}
