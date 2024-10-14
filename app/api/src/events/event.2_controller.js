export class EventController {
    constructor(EventService) {
        this.eventService = EventService;
        if (!this.eventService) {
            console.error("EventController: eventService is null");
        }
        this.getAllEventsController = this.getAllEventsController.bind(this);
        this.getEventByIdController = this.getEventByIdController.bind(this);
        this.createEventController = this.createEventController.bind(this);
        this.updateEventController = this.updateEventController.bind(this);
        this.deleteEventController = this.deleteEventController.bind(this);
    }

    async getAllEventsController(req, res) {
        res.json((await this.eventService.getAll()) ?? []);
    }
    async getEventByIdController(req, res) {
        const id = req.params.id;
        res.json((await this.eventService.getOne(id)) ?? {});
    }
    async createEventController(req, res) {
        let newEvent = req.body;
        res.json((await this.eventService.create(newEvent)) ?? {});
    }
    async updateEventController(req, res) {
        let updateEvent = req.body;
        res.json((await this.eventService.update(updateEvent)) ?? {});
    }
    async deleteEventController(req, res) {
        let deleteEvent = req.body;
        res.json((await this.eventService.delete(deleteEvent)) ?? {});
    }
}
