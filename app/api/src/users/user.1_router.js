import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
} from "./user.2_controller.js";

const router = Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);
router.put("/", updateUserController);
router.delete("/", deleteUserController);

export default router;
