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
        if (!newUser.email || !newUser.password) {
            res.status(400).json({
                create: false,
                error: "email and password are required",
            });
            return;
        }
        console.log("newUser", newUser);
        if (
            newUser.email.trim() === "" ||
            newUser.password.trim() === "" ||
            newUser.email.trim().includes(" ") ||
            newUser.password.trim().includes(" ")
        ) {
            res.status(400).json({
                create: false,
                error: "email and password has spaces",
            });
            return;
        }
        if (
            newUser.email.trim().length < 4 ||
            newUser.password.trim().length < 4
        ) {
            res.status(400).json({
                create: false,
                error: "email and password must be at least 4 characters long",
            });
            return;
        }
        res.json((await this.userService.create(newUser)) ?? {});
    }
    async updateUserController(req, res) {
        const id = req.params.id;
        const updateUser = req.body;
        res.json((await this.userService.update(id, updateUser)) ?? {});
    }
    async deleteUserController(req, res) {
        const id = req.params.id;
        const result = await this.userService.delete(id);
        console.log("delete result", result);
        if (!result) {
            res.status(404).json({ delete: false, id });
            return;
        }
        res.json({ delete: true, id });
    }
}
