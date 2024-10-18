import { Router } from "express";

export class EventRouter {
    constructor(EventController) {
        this.eventController = EventController;
        return this.router();
    }
    router() {
        const router = Router();
        router.get("/", this.eventController.getAllEventsController);
        router.get("/:id", this.eventController.getEventByIdController);
        router.post("/", this.eventController.createEventController);
        router.put("/:id", this.eventController.updateEventController);
        router.delete("/:id", this.eventController.deleteEventController);
        return router;
    }
}
