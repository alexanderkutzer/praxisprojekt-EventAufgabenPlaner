import express from "express";
import cors from "cors";
import { DBServiceSqlite3 } from "./_services/dbSqlite3.js";
import { DBService } from "./_services/dbService.js";
import { EventService } from "./events/event.3_service.js";
import { TaskService } from "./tasks/task.3_service.js";
import { UserService } from "./users/user.3_service.js";
import { TaskController } from "./tasks/task.2_controller.js";
import { TaskRouter } from "./tasks/task.1_router.js";
import { EventController } from "./events/event.2_controller.js";
import { EventRouter } from "./events/event.1_router.js";
import { UserController } from "./users/user.2_controller.js";
import { UserRouter } from "./users/user.1_router.js";
import { AuthRouter } from "./auth/auth.1_router.js";
import { AuthController } from "./auth/auth.2_controller.js";

const dbServiceSQLite3 = new DBServiceSqlite3("./data/db.sqlite3");

const dbService = new DBService(dbServiceSQLite3);
await dbService.init();

const eventService = new EventService(dbService);
const eventController = new EventController(eventService);
const eventRouter = new EventRouter(eventController);

const taskService = new TaskService(dbService);
const taskController = new TaskController(taskService);
const taskRouter = new TaskRouter(taskController);

const userService = new UserService(dbService);
const usersController = new UserController(userService);
const userRouter = new UserRouter(usersController);

const authController = new AuthController(userService);
const authRouter = new AuthRouter(authController);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.post("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
