export class EventService {
    constructor(dbService) {
        this.dbService = dbService;
        this.table = "events";
    }
    async getAll() {
        let data = await this.dbService.getAll(this.table);
        return data;
    }
    getOne(id) {
        return this.dbService.getOne(this.table, id);
    }
    create(newEvent) {
        newEvent.id = crypto.randomUUID();
        let dbNewEvent = this.dbService.create(this.table, data);
        if (!dbNewEvent) {
            return { create: false, event: {} };
        }
        return { create: true, event: newEvent };
    }
    update(data) {
        return this.dbService.update(this.table, data);
    }
    delete(data) {
        return this.dbService.delete(this.table, data);
    }
}
