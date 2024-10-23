const sqls = [
    `CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        id_user TEXT,
        title TEXT,
        description TEXT,
        startDateTime TEXT,
        endDateTime TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        id_user TEXT,
        id_event TEXT,
        id_tasks_parent TEXT,
        title TEXT,
        description TEXT,
        importancy INTEGER,
        urgency INTEGER,
        timetrack BOOLEAN,
        timetrackstart TEXT,
        timetrackestimate INTEGER,
        user_id TEXT,
        todo BOOLEAN,
        in_progress BOOLEAN,
        done BOOLEAN
    )`,
    `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT,
        username TEXT,
        passwordHash TEXT,
        dateCreated TEXT,
        isActive BOOLEAN,
        isAdmin BOOLEAN, 
        token TEXT
    )`,
];

export class DBService {
    constructor(dbServiceSystem) {
        this.dbServiceSystem = dbServiceSystem;
        if (!this.dbServiceSystem) {
            console.error("76b5b9ec-89fc-4c63-8a5b-64db2a6259bb: DBService: dbServiceSystem is null");
        }
        //wait for the tables to be created
    }
    async init() {
        await this.dbServiceSystem.checkAndCreateTables(sqls);
        return true;
    }
    async getAll(table, filter) {
        return await this.dbServiceSystem.getAll(table, filter);
    }
    async getOne(table, id, filter) {
        return await this.dbServiceSystem.getOne(table, id, filter);
    }
    async create(table, data, filter) {
        return await this.dbServiceSystem.create(table, data, filter);
    }
    async update(table, id, data, filter) {
        return await this.dbServiceSystem.update(table, id, data, filter);
    }
    async delete(table, id, filter) {
        return await this.dbServiceSystem.delete(table, id, filter);
    }
}
