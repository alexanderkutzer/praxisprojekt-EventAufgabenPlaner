import { Router } from "express";
import { authTokenIsAdminMiddleware, authTokenMiddleware } from "../common/authTokenMiddleware.js";

export class UserRouter {
    constructor(userController, userService) {
        this.userController = userController;
        this.userService = userService;
        return this.router();
    }
    router() {
        const router = Router();

        router.get("/", authTokenMiddleware(this.userService), authTokenIsAdminMiddleware(this.userService), this.userController.getAllUsersController);
        router.get("/:id", authTokenMiddleware(this.userService), authTokenIsAdminMiddleware(this.userService), this.userController.getUserByIdController);
        router.post("/", authTokenMiddleware(this.userService), authTokenIsAdminMiddleware(this.userService), this.userController.createUserController);
        router.put("/:id", authTokenMiddleware(this.userService), authTokenIsAdminMiddleware(this.userService), this.userController.updateUserController);
        router.delete("/:id", authTokenMiddleware(this.userService), authTokenIsAdminMiddleware(this.userService), this.userController.deleteUserController);

        router.post("/update/email/:token", authTokenMiddleware(this.userService), this.userController.updateEmailController);
        router.post("/update/password/:token", authTokenMiddleware(this.userService), this.userController.updatePasswordController);
        router.post("/update/username/:token", authTokenMiddleware(this.userService), this.userController.updateUsernameController);
        return router;
    }
}
