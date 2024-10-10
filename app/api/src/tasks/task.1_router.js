import { Router } from "express";
import {
    createTaskController,
    deleteTaskController,
    getAllTasksController,
    getTaskByIdController,
    updateTaskController,
} from "./task.2_controller.js";

const router = Router();

router.get("/", getAllTasksController);
router.get("/:id", getTaskByIdController);
router.post("/", createTaskController);
router.put("/", updateTaskController);
router.delete("/", deleteTaskController);

export default router;
