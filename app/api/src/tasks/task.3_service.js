let tasks = [];
export class TaskService {
    constructor(dbService) {
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
        let dbNewTask = this.dbService.create(this.table, data);
        if (!dbNewTask) {
            return { create: false, Task: {} };
        }
        return { create: true, Task: newTask };
    }
    async update(data) {
        return this.dbService.update(this.table, data);
    }
    async delete(data) {
        return this.dbService.delete(this.table, data);
    }
}
