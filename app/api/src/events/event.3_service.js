export class EventService {
    constructor(dbService) {
        this.dbService = dbService;
        this.table = "events";
    }
    async getAll() {
        let data = await this.dbService.getAll(this.table);
        return data;
    }
    async getOne(id) {
        return await this.dbService.getOne(this.table, id);
    }
    async create(newEvent) {
        let dbnewEvent = newEvent;
        dbnewEvent.id = crypto.randomUUID();
        let dbCreate = await this.dbService.create(this.table, dbnewEvent);
        if (!dbCreate) {
            return { create: false, event: {} };
        }
        return { create: true, event: dbnewEvent };
    }
    async update(id, data) {
        return await this.dbService.update(this.table, id, data);
    }
    async delete(id) {
        return await this.dbService.delete(this.table, id);
    }
}
