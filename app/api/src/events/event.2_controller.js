import {
    createEventService,
    deleteEventService,
    getAllEventsService,
    getEventByIdService,
    updateEventService,
} from "./event.3_service.js";

export function getAllEventsController(req, res) {
    res.json(getAllEventsService() ?? []);
}
export function getEventByIdController(req, res) {
    const id = req.params.id;
    res.json(getEventByIdService(id) ?? {});
}
export function createEventController(req, res) {
    let newEvent = req.body;
    res.json(createEventService(newEvent) ?? {});
}
export function updateEventController(req, res) {
    let updateEvent = req.body;
    res.json(updateEventService(updateEvent) ?? {});
}
export function deleteEventController(req, res) {
    let deleteEvent = req.body;
    res.json(deleteEventService(deleteEvent) ?? {});
}
