export class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getAllUsersController = this.getAllUsersController.bind(this);
        this.getUserByIdController = this.getUserByIdController.bind(this);
        this.createUserController = this.createUserController.bind(this);
        this.updateUserController = this.updateUserController.bind(this);
        this.deleteUserController = this.deleteUserController.bind(this);
    }
    async getAllUsersController(req, res) {
        res.json((await this.userService.getAll()) ?? []);
    }
    async getUserByIdController(req, res) {
        const id = req.params.id;
        res.json((await this.userService.getOne(id)) ?? {});
    }
    async createUserController(req, res) {
        let newUser = req.body;

        res.json((await this.userService.create(newUser)) ?? {});
    }
    async updateUserController(req, res) {
        const id = req.params.id;
        const updateUser = req.body;
        res.json((await this.userService.update(id, updateUser)) ?? {});
    }
    async deleteUserController(req, res) {
        const id = req.params.id;
        const result = { delete: await this.userService.delete(id), id: id };
        res.json(result);
    }
}
