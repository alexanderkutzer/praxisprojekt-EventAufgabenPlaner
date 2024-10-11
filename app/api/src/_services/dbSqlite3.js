import sqlite3 from "sqlite3";
import fs from "fs";

export class DBConnectorSQLite3 {
    constructor(dbPath) {
        this.dbPath = dbPath;
        this.db = null;
    }
    async connect() {
        if (!fs.existsSync(this.dbPath)) {
            console.error(`DBConnectorSQLite3: ${this.dbPath} does not exist`);
            return;
        }
        this.db = new sqlite3.Database(this.dbPath, (err) => {
            if (err) {
                console.error(`DBConnectorSQLite3: ${err.message}`);
                return;
            }
            console.log(`DBConnectorSQLite3: Connected to ${this.dbPath}`);
        });
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
    async exec(sql) {
        return new Promise((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) {
                    console.error(`DBConnectorSQLite3: ${err.message}`);
                    reject(err);
                }
                resolve();
            });
        });
    }
}
