import { Router } from "express";
import {
    createUserController,
    deleteUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
} from "./user.2_controller.js";
export class UserRouter {
    constructor(userController) {
        this.userController = userController;
        return this.router();
    }
    router() {
        const router = Router();
        router.get("/", this.userController.getAllUsersController);
        router.get("/:id", this.userController.getUserByIdController);
        router.post("/", this.userController.createUserController);
        router.put("/", this.userController.updateUserController);
        router.delete("/", this.userController.deleteUserController);
        return router;
    }
}
const router = Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.post("/", createUserController);
router.put("/", updateUserController);
router.delete("/", deleteUserController);

export default router;
