import { Router } from "express";

export class AuthRouter {
    constructor(authController) {
        this.authController = authController;
        return this.router();
    }
    router() {
        const router = Router();
        router.post("/login", this.authController.loginController);

        return router;
    }
}
