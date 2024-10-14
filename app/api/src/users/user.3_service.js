import crypto from "crypto";
export class UserService {
    constructor(dbService) {
        this.dbService = dbService;
        this.table = "users";
        this.createInitUsers();
    }
    async getAll() {
        let data = await this.dbService.getAll(this.table);
        return data.map((user) => DTOUserFromDBToUser(user));
    }
    async getOne(id) {
        return this.dbService.getOne(this.table, id);
    }
    async getUserByEmail(email) {
        let data = await this.dbService.getAll(this.table);
        let user = data.find((user) => user.email === email);
        return user;
    }
    async create(newUser) {
        let dbNewUser = DTOCreateUserToDBUser(newUser);
        let dbCreate = await this.dbService.create(
            this.table,
            DTOCreateUserToDBUser(newUser)
        );
        console.log("dbNewUser", dbCreate);
        if (!dbCreate) {
            return { create: false, user: {} };
        }
        return { create: true, user: DTOUserFromDBToUser(dbNewUser) };
    }
    async update(data) {
        let dbUpdate = this.dbService.update(this.table, data);
        if (!dbUpdate) {
            return { update: false, user: {} };
        }
        return { update: true, user: DTOUserFromDBToUser(data) };
    }
    async delete(data) {
        return this.dbService.delete(this.table, data);
    }
    async createInitUsers() {
        let users = await this.getAll();
        if (users.length === 0) {
            let date = Date.now().toString();
            let user = {
                email: "admin@localhost",
                dateCreated: date,
                passwordHash: createPasswordHash("admin", date),
                token: "",
            };
            console.log(
                "checkinitPassword OK?",
                checkPasswords("admin", user.passwordHash, date)
            );
            await this.create(user);
        }
    }
    async checkPassword(email, password) {
        let user = await this.getUserByEmail(email);
        if (user) {
            return {
                check: checkPasswords(
                    password,
                    user.passwordHash,
                    user.dateCreated
                ),
                token: user.token,
            };
        }
        return { check: false, token: "" };
    }
}

const createPasswordHash = (password, secret) => {
    let hmac = crypto.createHmac("sha256", secret);
    hmac.update(password + secret);
    return hmac.digest("hex");
};
const checkPasswords = (password, passwordHash, secret) => {
    return createPasswordHash(password, secret) === passwordHash;
};

const DTOCreateUserToDBUser = ({ email, passwordHash, dateCreated, token }) => {
    return {
        id: crypto.randomUUID(),
        email,
        passwordHash,
        dateCreated,
        token,
    };
};
const DTOUserFromDBToUser = ({ id, email }) => {
    return {
        id,
        email,
    };
};
