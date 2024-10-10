import express from "express";
import cors from "cors";
import routerEvents from "./events/event.1_router.js";
import routerTasks from "./tasks/task.1_router.js";
import routerUsers from "./users/user.1_router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/events", routerEvents);
app.use("/api/v1/tasks", routerTasks);
app.use("/api/v1/users", routerUsers);

app.post("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
