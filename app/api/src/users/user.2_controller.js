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
        try {
            res.json((await this.userService.getAll()) ?? []);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - e111cd16-d153-403b-b11f-c1b5d152f892",
            });
        }
    }
    async getUserByIdController(req, res) {
        try {
            const id = req.params.id;
            res.json((await this.userService.getOne(id)) ?? {});
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - af279e9e-e9a5-4eb4-9dd7-897f79c3b258",
            });
        }
    }
    async createUserController(req, res) {
        try {
            let newUser = req.body;
            if (!newUser.email || !newUser.password) {
                res.status(400).json({
                    create: false,
                    error: "email and password are required",
                });
                return;
            }
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
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 7d2fba2c-c346-4275-a4c7-8258f2211440",
            });
        }
    }
    async updateUserController(req, res) {
        try {
            const id = req.params.id;
            const updateUser = req.body;
            res.json((await this.userService.update(id, updateUser)) ?? {});
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 95283c6b-be15-4585-ad35-724f41f89097",
            });
        }
    }
    async deleteUserController(req, res) {
        try {
            const id = req.params.id;
            const result = await this.userService.delete(id);
            if (!result) {
                res.status(404).json({ delete: false, id });
                return;
            }
            res.json({ delete: true, id });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - efb95b1c-b1f9-46d5-adaa-ca52edbe95a6",
            });
        }
    }
}
