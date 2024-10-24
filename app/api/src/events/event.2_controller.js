import { getToken } from "../common/getToken.js";
export class EventController {
    constructor(EventService, UserService) {
        this.eventService = EventService;
        this.userService = UserService;
        if (!this.eventService) {
            console.error("b7211244-549b-4c3a-930c-c6f26df4a13b: EventController: eventService is null");
        }
        this.getAllEventsController = this.getAllEventsController.bind(this);
        this.getEventByIdController = this.getEventByIdController.bind(this);
        this.createEventController = this.createEventController.bind(this);
        this.updateEventController = this.updateEventController.bind(this);
        this.deleteEventController = this.deleteEventController.bind(this);
    }

    async getAllEventsController(req, res) {
        try {
            const token = getToken(req);
            const id_user = (await this.userService.getUserByToken(token)).id;
            res.json((await this.eventService.getAll(id_user)) ?? []);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - a62aac5a-7f8b-455f-98c8-7ee81af7a208",
            });
        }
    }
    async getEventByIdController(req, res) {
        try {
            const token = getToken(req);
            const id_user = (await this.userService.getUserByToken(token)).id;
            const id = req.params.id;
            res.json((await this.eventService.getOne(id_user, id)) ?? {});
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - d27c07d2-59f7-4745-a6ae-73d367ad6377",
            });
        }
    }
    async createEventController(req, res) {
        try {
            let newEvent = req.body;
            const token = getToken(req);
            const id_user = (await this.userService.getUserByToken(token)).id;
            newEvent.id_user = id_user;
            res.json((await this.eventService.create(id_user, newEvent)) ?? {});
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 45fa7f0d-73f2-4c56-a718-3ef31e707a3f",
            });
        }
    }
    async updateEventController(req, res) {
        try {
            const token = getToken(req);
            const id_user = (await this.userService.getUserByToken(token)).id;
            const id = req.params.id;
            const updateEvent = req.body;
            const updateStatus = await this.eventService.update(id_user, id, updateEvent);
            if (!updateStatus) {
                res.status(404).json({
                    update: false,
                    error: "Event not found",
                });
            }
            res.json({ update: true, event: updateEvent });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 56585750-3981-42ee-923d-171d4a4ebcb4",
            });
        }
    }
    async deleteEventController(req, res) {
        try {
            const token = getToken(req);
            const id_user = (await this.userService.getUserByToken(token)).id;
            let id = req.params.id;
            const result = await this.eventService.delete(id_user, id);
            if (!result) {
                res.status(404).json({ delete: false, id });
                return;
            }
            res.json({ delete: true, id });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - d30f85cd-a409-4c61-9223-2009459fc63d",
            });
        }
    }
}
