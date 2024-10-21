export class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.loginController = this.loginController.bind(this);
        this.logoutController = this.logoutController.bind(this);
        this.registerController = this.registerController.bind(this);
        this.userByTokenController = this.userByTokenController.bind(this);
    }
    async loginController(req, res) {
        try {
            const { email, password } = req.body;
            let { check, token } = await this.userService.checkPassword(email, password);
            if (check) {
                res.status(200).json({ login: true, token });
            } else {
                res.status(401).json({ login: false, token });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - a4e2b1ff-c530-43ee-8c72-99cd239acd0b",
            });
        }
    }
    async logoutController(req, res) {
        try {
            const { token } = req.params;
            const users = await this.userService.getAll();
            const userToLogout = users.find((user) => user.token === token);
            if (!userToLogout) {
                res.status(401).json({ logout: false });
                return;
            }
            userToLogout.token = "";
            let { update, _ } = await this.userService.update(userToLogout.id, userToLogout);
            if (!update) {
                res.status(401).json({ logout: false });
            }
            res.status(200).json({ logout: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 8bcef136-375c-4f72-ba4f-a9b34931d61e",
            });
        }
    }
    async registerController(req, res) {
        try {
            const { email, password } = req.body;
            let { create, user } = await this.userService.create({
                email,
                password,
                isActive: true,
                isAdmin: false,
            });
            if (!create) {
                res.status(401).json({ register: false });
                return;
            }
            res.status(200).json({ register: true, user });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 1987ed26-8292-483e-91c7-2cd87af7346c",
            });
        }
    }
    async userByTokenController(req, res) {
        try {
            const { token } = req.params;
            const users = await this.userService.getAll();
            const user = users.find((user) => user.token === token);
            if (!user) {
                res.status(401).json({});
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error - 04526c30-28fa-40da-93d3-cc01787c9f12",
            });
        }
    }
}
