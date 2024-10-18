let tasks = [];
export class TaskService {
    constructor(dbService) {
        this.dbService = dbService;
        this.table = "tasks";
    }
    async getAll() {
        return this.dbService.getAll(this.table);
    }
    async getOne(id) {
        return this.dbService.getOne(this.table, id);
    }
    async create(newTask) {
        newTask.id = crypto.randomUUID();
        let dbNewTask = this.dbService.create(this.table, newTask);
        if (!dbNewTask) {
            return { create: false, Task: {} };
        }
        return { create: true, Task: newTask };
    }
    async update(id, data) {
        return this.dbService.update(this.table, id, data);
    }
    async delete(id) {
        return this.dbService.delete(this.table, id);
    }
}
