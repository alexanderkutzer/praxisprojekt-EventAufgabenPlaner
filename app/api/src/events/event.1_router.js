import { Router } from "express";
import {
    createEventController,
    deleteEventController,
    getAllEventsController,
    getEventByIdController,
    updateEventController,
} from "./event.2_controller.js";

const router = Router();

router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
router.post("/", createEventController);
router.put("/", updateEventController);
router.delete("/", deleteEventController);

export default router;
