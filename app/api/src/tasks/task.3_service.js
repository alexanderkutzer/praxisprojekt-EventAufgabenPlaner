let tasks = [];
export class TaskService {
    constructor(dbService) {
        this.dbService = dbService;
        this.table = "tasks";
    }
    async getAll(id_user) {
        const filter = { id_user };
        return this.dbService.getAll(this.table, filter);
    }
    async getOne(id_user, id) {
        const filter = { id_user };
        return this.dbService.getOne(this.table, id, filter);
    }
    async create(id_user, newTask) {
        const filter = { id_user };
        newTask.id = crypto.randomUUID();
        let dbNewTask = this.dbService.create(this.table, newTask, filter);
        if (!dbNewTask) {
            return { create: false, Task: {} };
        }
        return { create: true, Task: newTask };
    }
    async update(id_user, id, data) {
        const filter = { id_user };
        return this.dbService.update(this.table, id, data, filter);
    }
    async delete(id_user, id) {
        const filter = { id_user };
        return this.dbService.delete(this.table, id, filter);
    }
}
