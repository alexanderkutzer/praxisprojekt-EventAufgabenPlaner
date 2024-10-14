import sqlite3 from "sqlite3";
export class DBServiceSqlite3 {
    constructor(path) {
        this.dbConnector = new DBConnectorSQLite3(path);
        if (!this.dbConnector) {
            console.error("DBServiceSqlite3: dbConnector is null");
        }
        this.dbConnector.connect();
    }
    async checkAndCreateTables(sqls) {
        for (let sql of sqls) {
            await this.dbConnector.exec(sql);
        }
    }
    async getAll(table) {
        let sql = `SELECT * FROM ${table}`;
        let data = await this.dbConnector.query(sql);
        return data;
    }
    async getOne(table, id) {
        let sql = `SELECT * FROM ${table} WHERE id = ${id}`;
        return await this.dbConnector.query(sql);
    }
    async create(table, data) {
        console.log("DBService.create", table, data);
        let keys = Object.keys(data);
        let values = Object.values(data);
        let sql = `INSERT INTO ${table} ('${keys.join(
            "','"
        )}') VALUES ('${values.join("','")}')`;
        console.log("sql: ", sql);
        let result = await this.dbConnector.exec(sql);

        return result;
    }
    async update(table, data) {
        console.log("DBService.update", table, data);
        if (!data.id) {
            throw new Error("Die 'id' ist im Datenobjekt erforderlich.");
        }
        const { id, ...fieldsToUpdate } = data;
        if (Object.keys(fieldsToUpdate).length === 0) {
            throw new Error("Keine Felder zum Aktualisieren bereitgestellt.");
        }
        const setClause = Object.keys(fieldsToUpdate)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = Object.values(fieldsToUpdate);
        const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`;
        const queryValues = [...values, id];

        console.log("SQL:", sql);
        console.log("Werte:", queryValues);

        try {
            return await this.dbConnector.exec(sql, queryValues);
        } catch (error) {
            console.error("Fehler beim Aktualisieren der Daten:", error);
            throw error;
        }
    }

    async delete(table, data) {
        let sql = `DELETE FROM ${table} WHERE id = ${data.id}`;
        return await this.dbConnector.exec(sql);
    }
}
class DBConnectorSQLite3 {
    constructor(dbPath) {
        this.dbPath = dbPath;
        this.db = null;
    }
    async connect() {
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                console.error(`DBConnectorSQLite3: ${err.message}`);
                return;
            }
            console.log(`DBConnectorSQLite3: Connected to ${this.dbPath}`);
        });
        console.log("db: ", this.db);
    }
    async disconnect() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error(`DBConnectorSQLite3: ${err.message}`);
                    return;
                }
                console.log(
                    `DBConnectorSQLite3: Disconnected from ${this.dbPath}`
                );
            });
        }
    }
    async query(sql) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error(`DBConnectorSQLite3: ${err.message}`);
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
    /**
     * Führt eine SQL-Anweisung aus.
     * @param {*} sql
     * @param {*} params
     * @returns
     */
    async exec(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, async (err) => {
                if (err) {
                    console.error(`DBConnectorSQLite3: ${err.message}`);
                    reject(err);
                } else {
                    // 'this' bezieht sich auf das Statement-Kontextobjekt
                    resolve(true);
                }
            });
        });
    }
}
