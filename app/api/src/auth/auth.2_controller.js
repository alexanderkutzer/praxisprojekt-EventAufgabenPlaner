export class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.loginController = this.loginController.bind(this);
        this.logoutController = this.logoutController.bind(this);
        this.registerController = this.registerController.bind(this);
    }
    async loginController(req, res) {
        const { email, password } = req.body;
        console.log("loginController", email, password);
        let { check, token } = await this.userService.checkPassword(
            email,
            password
        );
        if (check) {
            res.status(200).json({ login: true, token });
        } else {
            res.status(401).json({ login: false, token });
        }
    }
    async logoutController(req, res) {
        const { token } = req.params;
        console.log("logoutController", token);
        const users = await this.userService.getAll();
        const userToLogout = users.find((user) => user.token === token);
        if (!userToLogout) {
            res.status(401).json({ logout: false });
            return;
        }
        userToLogout.token = "";
        let { update, _ } = await this.userService.update(
            userToLogout.id,
            userToLogout
        );
        if (!update) {
            res.status(401).json({ logout: false });
        }
        res.status(200).json({ logout: true });
    }
    async registerController(req, res) {
        const { email, password } = req.body;
        console.log("registerController", email, password);
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
    }
}
