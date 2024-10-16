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
        let data = await this.dbService.getOne(this.table, id);
        if (!data) {
            return {};
        }
        return DTOUserFromDBToUser(data);
    }
    async getUserByEmail(email) {
        let data = await this.dbService.getAll(this.table);
        let user = data.find((user) => user.email === email);
        return user;
    }
    async create(newUser) {
        const users = await this.getAll();
        const user = users.find((user) => user.email === newUser.email);
        if (user) {
            return { create: false, error: "User already exists" };
        }
        let dbNewUser = DTOCreateUserToDBUser(newUser);
        let date = Date.now().toString();
        dbNewUser.passwordHash = createPasswordHash(newUser.password, date);
        dbNewUser.dateCreated = date;
        dbNewUser.isActive = newUser.isActive ? 1 : 1;
        dbNewUser.isAdmin = newUser.isAdmin ? 1 : 0;
        dbNewUser.token = "";
        let dbCreate = await this.dbService.create(this.table, dbNewUser);
        console.log("dbNewUser", dbCreate);
        if (!dbCreate) {
            return { create: false, error: "User not created" };
        }
        return { create: true, user: DTOUserFromDBToUser(dbNewUser) };
    }
    async update(id, data) {
        let dbUser = await this.dbService.getOne(this.table, id);
        if (data.password && data.password !== "") {
            data.passwordHash = createPasswordHash(
                data.password,
                dbUser.dateCreated
            );
        }
        delete data.password;
        let dbUpdate = await this.dbService.update(this.table, id, data);
        if (!dbUpdate) {
            return { update: false, user: {} };
        }
        return { update: true, user: DTOUserFromDBToUser(data) };
    }
    async delete(id) {
        console.log("delete id", id);
        const user = await this.getOne(id);
        console.log("delete user", user);
        if (user.id !== id) {
            return false;
        }
        let dbDelete = await this.dbService.delete(this.table, id);
        return true;
    }
    async createInitUsers() {
        let users = await this.getAll();
        if (users.length === 0) {
            let date = Date.now().toString();
            let user = {
                email: "admin@localhost",
                dateCreated: date,
                password: "admin",
                isActive: 1,
                isAdmin: 1,
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
        if (!user) {
            return { check: false, token: "" };
        }

        let check = checkPasswords(
            password,
            user.passwordHash,
            user.dateCreated
        );

        if (check) {
            user.token === "" &&
                (user.token = checkPasswords ? crypto.randomUUID() : "");
            await this.dbService.update(this.table, user.id, user);
            return {
                check: check,
                token: user.token,
            };
        }
        return { check: check, token: "" };
    }
}

const createPasswordHash = (password, secret) => {
    let hmac = crypto.createHmac("sha256", "eventPlaner");
    hmac.update(password + secret);
    return hmac.digest("hex");
};
const checkPasswords = (password, passwordHash, secret) => {
    console.log("check password", password, passwordHash, secret);
    console.log(
        "check password",
        createPasswordHash(password, secret),
        passwordHash
    );
    return createPasswordHash(password, secret) === passwordHash;
};

const DTOCreateUserToDBUser = ({
    email,
    passwordHash,
    dateCreated,
    isActive,
    isAdmin,
    token,
}) => {
    return {
        id: crypto.randomUUID(),
        email,
        passwordHash,
        dateCreated,
        isActive,
        isAdmin,
        token,
    };
};
const DTOUserFromDBToUser = ({ id, email, isActive, isAdmin, token }) => {
    return {
        id,
        email,
        isActive,
        isAdmin,
        token,
    };
};
