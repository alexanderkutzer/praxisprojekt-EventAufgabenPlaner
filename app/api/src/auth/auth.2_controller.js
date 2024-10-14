export class AuthController {
    constructor(userService) {
        this.userService = userService;
        this.loginController = this.loginController.bind(this);
    }
    async loginController(req, res) {
        const { email, password } = req.body;
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
}
