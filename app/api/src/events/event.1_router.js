import { Router } from "express";
import { authTokenMiddleware } from "../common/authTokenMiddleware.js";

export class EventRouter {
    constructor(EventController, UserService) {
        this.eventController = EventController;
        this.userService = UserService;
        return this.router();
    }
    router() {
        const router = Router();
        router.get("/", authTokenMiddleware(this.userService), this.eventController.getAllEventsController);
        router.get("/:id", authTokenMiddleware(this.userService), this.eventController.getEventByIdController);
        router.post("/", authTokenMiddleware(this.userService), this.eventController.createEventController);
        router.put("/:id", authTokenMiddleware(this.userService), this.eventController.updateEventController);
        router.delete("/:id", authTokenMiddleware(this.userService), this.eventController.deleteEventController);
        return router;
    }
}
