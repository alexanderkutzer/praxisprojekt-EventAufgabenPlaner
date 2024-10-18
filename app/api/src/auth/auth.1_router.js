import { Router } from "express";

export class AuthRouter {
    constructor(authController) {
        this.authController = authController;
        return this.router();
    }
    router() {
        const router = Router();
        router.post("/login", this.authController.loginController);
        router.get("/logout/:token", this.authController.logoutController);
        router.post("/register", this.authController.registerController);
        router.get("/:token", this.authController.userByTokenController);

        return router;
    }
}
