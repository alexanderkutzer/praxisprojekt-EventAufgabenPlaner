export class UserService {
    constructor(dbService) {
        this.dbService = dbService;
        this.table = "users";
    }
    async getAll() {
        let data = await this.dbService.getAll(this.table);
        return data.map((user) => DTOUserFromDBToUser(user));
    }
    async getOne(id) {
        return this.dbService.getOne(this.table, id);
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
}
const DTOCreateUserToDBUser = ({ email, password }) => {
    return {
        id: crypto.randomUUID(),
        email,
        password,
    };
};
const DTOUserFromDBToUser = ({ id, email }) => {
    return {
        id,
        email,
    };
};
