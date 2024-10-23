export class EventService {
    constructor(dbService) {
        this.dbService = dbService;
        this.table = "events";
    }
    async getAll(id_user) {
        const filter = { id_user };
        let data = await this.dbService.getAll(this.table, filter);
        return data;
    }
    async getOne(id_user, id) {
        const filter = { id_user };
        return await this.dbService.getOne(this.table, id, filter);
    }
    async create(id_user, newEvent) {
        const filter = { id_user };
        let dbnewEvent = newEvent;
        dbnewEvent.id = crypto.randomUUID();
        let dbCreate = await this.dbService.create(this.table, dbnewEvent, filter);
        if (!dbCreate) {
            return { create: false, event: {} };
        }
        return { create: true, event: dbnewEvent };
    }
    async update(id_user, id, data) {
        const filter = { id_user };
        return await this.dbService.update(this.table, id, data, filter);
    }
    async delete(id_user, id) {
        const filter = { id_user };
        return await this.dbService.delete(this.table, id, filter);
    }
}
