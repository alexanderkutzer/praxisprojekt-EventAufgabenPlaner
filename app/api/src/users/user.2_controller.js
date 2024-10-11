import {
    createUserService,
    deleteUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
} from "./user.3_service.js";
export class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsersController(req, res) {
        res.json(this.userService.getAll() ?? []);
    }
    getUserByIdController(req, res) {
        const id = req.params.id;
        res.json(this.userService.getOne(id) ?? {});
    }
    createUserController(req, res) {
        let newUser = req.body;
        res.json(this.userService.create(newUser) ?? {});
    }
    updateUserController(req, res) {
        let updateUser = req.body;
        res.json(this.userService.update(updateUser) ?? {});
    }
    deleteUserController(req, res) {
        let deleteUser = req.body;
        res.json(this.userService.delete(deleteUser) ?? {});
    }
}
export function getAllUsersController(req, res) {
    res.json(getAllUsersService() ?? []);
}
export function getUserByIdController(req, res) {
    const id = req.params.id;
    res.json(getUserByIdService(id) ?? {});
}
export function createUserController(req, res) {
    let newUser = req.body;
    res.json(createUserService(newUser) ?? {});
}
export function updateUserController(req, res) {
    let updateUser = req.body;
    res.json(updateUserService(updateUser) ?? {});
}
export function deleteUserController(req, res) {
    let deleteUser = req.body;
    res.json(deleteUserService(deleteUser) ?? {});
}
