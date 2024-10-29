import sqlite3 from "sqlite3";
import fs from "fs";
export class DBServiceSqlite3 {
    constructor(path) {
        this.dbConnector = new DBConnectorSQLite3(path);
        if (!this.dbConnector) {
            console.error("50a31dae-aa8c-4a38-b703-d80de75e43e1: DBServiceSqlite3: dbConnector is null");
        }
        this.dbConnector.connect();
    }
    async checkAndCreateTables(sqls) {
        for (let sql of sqls) {
            await this.dbConnector.exec(sql);
        }
    }
    async getAll(table, filter) {
        let sql = `SELECT * FROM ${table}`;
        if (filter) {
            let key = Object.keys(filter)[0];
            let value = Object.values(filter)[0];
            if (value === undefined) return;
            sql = `SELECT * FROM ${table} WHERE ${key} = '${value}'`;
        }
        let data = await this.dbConnector.query(sql);
        return data;
    }
    async getOne(table, id, filter) {
        let sql = `SELECT * FROM ${table} WHERE id = '${id}'`;
        if (filter) {
            let key = Object.keys(filter)[0];
            let value = Object.values(filter)[0];
            if (value === undefined) return;
            sql = `SELECT * FROM ${table} WHERE id = '${id}' AND ${key} = '${value}'`;
        }
        return (await this.dbConnector.query(sql))[0];
    }
    async create(table, data, filter) {
        let keys = Object.keys(data);
        let values = Object.values(data);
        if (filter) {
            let key = Object.keys(filter)[0];
            let value = Object.values(filter)[0];
            if (value === undefined) return;
            keys.push(key);
            values.push(value);
        }
        let sql = `INSERT INTO ${table} ('${keys.join("','")}') VALUES ('${values.join("','")}')`;
        let result = await this.dbConnector.exec(sql);

        return result;
    }
    async update(table, id, data, filter) {
        if (!id) {
            console.error(new Error("Die 'id' ist erforderlich."));
            return null;
        }
        const { ...fieldsToUpdate } = data;
        if (Object.keys(fieldsToUpdate).length === 0) {
            console.error(new Error("Keine Felder zum Aktualisieren bereitgestellt."));
            return null;
        }
        const setClause = Object.keys(fieldsToUpdate)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = Object.values(fieldsToUpdate);
        let sql = `UPDATE ${table} SET ${setClause} WHERE id = '${id}'`;
        if (filter) {
            let key = Object.keys(filter)[0];
            let value = Object.values(filter)[0];
            if (value === undefined) return;
            sql = `UPDATE ${table} SET ${setClause} WHERE id = '${id}' AND ${key} = '${value}'`;
        }
        const queryValues = [...values];

        try {
            return await this.dbConnector.exec(sql, queryValues);
        } catch (error) {
            console.error("5f599c48-3c14-49c1-a0db-0c4da0028800: Fehler beim Aktualisieren der Daten:", error);
            return null;
        }
    }

    async delete(table, id, filter) {
        let sql = `DELETE FROM ${table} WHERE id = '${id}'`;
        if (filter) {
            let key = Object.keys(filter)[0];
            let value = Object.values(filter)[0];
            if (value === undefined) return;
            sql = `DELETE FROM ${table} WHERE id = '${id}' AND ${key} = '${value}'`;
        }
        return await this.dbConnector.exec(sql);
    }
}
class DBConnectorSQLite3 {
    constructor(dbPath) {
        this.dbPath = dbPath;
        this.db = null;
    }
    checkDirPath(path) {
        const pathDir = path.split("/").slice(0, -1).join("/");
        if (!fs.existsSync(pathDir)) {
            fs.mkdirSync(pathDir, { recursive: true });
        }
    }
    async connect() {
        this.checkDirPath(this.dbPath);
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                console.error(`05951a1e-7ab3-4c80-8a3d-953518b64314: DBConnectorSQLite3: ${err.message}`);
                return;
            }
            console.info(`DBConnectorSQLite3: Connected to ${this.dbPath}`);
        });
    }
    async disconnect() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error(`1ad24b10-e347-4227-ab55-42effd89e211: DBConnectorSQLite3: ${err.message}`);
                    return;
                }
                console.info(`DBConnectorSQLite3: Disconnected from ${this.dbPath}`);
            });
        }
    }
    async query(sql) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.error(`6d3ed014-9355-4a75-adfd-ba1c70515ebe: DBConnectorSQLite3: ${err.message}`);
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
                    console.error(`f60592b8-90c1-4b7d-ad13-a510451a8184: DBConnectorSQLite3: ${err.message}`);
                    reject(err);
                } else {
                    // 'this' bezieht sich auf das Statement-Kontextobjekt
                    resolve(true);
                }
            });
        });
    }
}
