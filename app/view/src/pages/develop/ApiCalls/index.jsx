import React, { useEffect } from "react";
import Button from "../../../components/Button";
import { mockEmailPasssword } from "./MOCK_DATA";
import {
    apiCreateEvent,
    apiCreateTask,
    apiCreateUser,
    apiDeleteEvent,
    apiDeleteTask,
    apiDeleteUser,
    apiGetEvent,
    apiGetEvents,
    apiGetTask,
    apiGetTasks,
    apiGetUser,
    apiGetUsers,
    apiUpdateEvent,
    apiUpdateTask,
    apiUpdateUser,
    apiUserLogin,
    apiUserLogout,
    apiUserRegister,
} from "../../../service/api_calls";
import { useAuth } from "../../../service/authStatus";
function DevelopApiCalls() {
    const { isLoggedIn_AuthService, setToken_AuthService } = useAuth();
    const [showUsers, setShowUsers] = React.useState(false);
    const [showEvents, setShowEvents] = React.useState(false);
    const [showTasks, setShowTasks] = React.useState(false);
    const [showCors, setShowCors] = React.useState(false);
    //User
    const [response, setResponse] = React.useState("");
    const [response2, setResponse2] = React.useState("");
    const [id, setId] = React.useState("");
    const [email, setEmail] = React.useState("email@test");
    const [password, setPassword] = React.useState("");
    const [isActive, setIsActive] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [token, setToken] = React.useState("");
    //Event
    const [titleEvent, setTitleEvent] = React.useState("");
    const [descriptionEvent, setDescriptionEvent] = React.useState("");
    const [startDateEvent, setStartDateEvent] = React.useState("");
    const [endDateEvent, setEndDateEvent] = React.useState("");
    const [id_user_maintainer, setIdUserMaintainer] = React.useState("");
    //Task
    const [idEvent, setIdEvent] = React.useState("");
    const [titleTask, setTitleTask] = React.useState("");
    const [descriptionTask, setDescriptionTask] = React.useState("");
    const [todo, setTodo] = React.useState("");
    const [inProgress, setInProgress] = React.useState("");
    const [done, setDone] = React.useState("");
    const [userIdList, setUserIdList] = React.useState([]);

    const showButtonsDisabled = {
        showCors: false,
        showUsers: false,
        showEvents: false,
        showTasks: false,
    };
    useEffect(() => {
        if (email != "") {
            let user = mockEmailPasssword.find((e) => e.email === email);
            if (user && user.password && user.password != "") setPassword(user.password);
        }
    }, [email]);

    function recogniceResponse(res) {
        console.log(res);
        setResponse(res);
        setResponse2(JSON.stringify(res, null, 2));
    }

    function handleClick(key, value) {
        if (key === "token") setToken(value);
        if (key === "id") setId(value);
        if (key === "email") setEmail(value);
    }

    // Funktion zur Rekursiven Darstellung des JSON mit Buttons für IDs
    function renderJSONWithButtons(obj, indent = 0) {
        const indentStyle = {
            lineHeight: 1,
            paddingLeft: `${indent * 20}px`,
        };

        if (Array.isArray(obj)) {
            return (
                <div style={indentStyle}>
                    [<br />
                    {obj.map((item, index) => (
                        <div key={index} style={indentStyle}>
                            {renderJSONWithButtons(item, indent + 1)}
                            {index < obj.length - 1 ? "," : ""} {/* Komma zwischen Array-Elementen */}
                        </div>
                    ))}
                    <div style={indentStyle}>]</div>
                </div>
            );
        } else if (typeof obj === "object" && obj !== null) {
            return (
                <div style={indentStyle}>
                    {"{"}
                    <br />
                    {Object.keys(obj).map((key, index, keys) => (
                        <div key={key} style={indentStyle}>
                            <span>{key}: </span>
                            {key === "id" ? (
                                <>
                                    {obj[key]}{" "}
                                    <button
                                        className="border border-black rounded-sm bg-orange-300 hover:bg-orange-500 px-1 py-0.5"
                                        onClick={() => handleClick(key, obj[key])}
                                    >
                                        Id Übergeben
                                    </button>
                                </>
                            ) : key === "token" ? (
                                <>
                                    {obj[key]}{" "}
                                    <button
                                        className="border border-black rounded-sm bg-orange-300 hover:bg-orange-500 px-1 py-0.5"
                                        onClick={() => handleClick(key, obj[key])}
                                    >
                                        Token Übergeben
                                    </button>
                                </>
                            ) : key === "email" ? (
                                <>
                                    {obj[key]}{" "}
                                    <button
                                        className="border border-black rounded-sm bg-orange-300 hover:bg-orange-500 px-1 py-0.5"
                                        onClick={() => handleClick(key, obj[key])}
                                    >
                                        Email Übergeben
                                    </button>
                                </>
                            ) : (
                                renderJSONWithButtons(obj[key], indent + 1)
                            )}
                            {index < keys.length - 1 ? "," : ""} {/* Komma zwischen Eigenschaften */}
                        </div>
                    ))}
                    <div style={indentStyle}>{"}"}</div>
                </div>
            );
        } else {
            // Für einfache Werte
            return (
                <div style={indentStyle}>
                    <span>{String(obj)}</span>
                </div>
            );
        }
    }

    return (
        <div className="w-full">
            <h1 className="text-lg">Api Calls {isLoggedIn_AuthService && "login"}</h1>
            <p>Here we will be able to make api calls and show the response's</p>
            <div>
                <Button
                    onClick={() => {
                        let { email, password } = mockEmailPasssword[Math.floor(Math.random() * mockEmailPasssword.length)];
                        setEmail(email);
                        setPassword(password);
                    }}
                >
                    Set Random Email Password
                </Button>
                <Button
                    onClick={() => {
                        setEmail("admin@localhost");
                        setPassword("admin");
                    }}
                >
                    Set Admin Email Password
                </Button>
                <Button
                    onClick={() => {
                        let { password } = mockEmailPasssword[Math.floor(Math.random() * mockEmailPasssword.length)];
                        setPassword(password);
                    }}
                >
                    Set Radmom Password
                </Button>
            </div>
            <div className="flex gap-2">
                <div className="w-1/2 flex flex-col gap-2">
                    <div>
                        Calls:
                        <Button
                            onClick={() => {
                                showCors || showUsers || showEvents || showTasks
                                    ? setShowCors(false) & setShowUsers(false) & setShowEvents(false) & setShowTasks(false)
                                    : setShowCors(true) & setShowUsers(true) & setShowEvents(true) & setShowTasks(true);
                            }}
                        >
                            {showCors || showUsers || showEvents || showTasks ? "Hide All" : "Show All"}
                        </Button>
                    </div>

                    <div className="border border-black">
                        <div className="flex flex-row justify-between items-center">
                            <div>Core Calls</div>
                            <Button disabled={showButtonsDisabled.showCors} onClick={() => setShowCors(!showCors)}>
                                {showCors ? "Hide" : "Show"}
                            </Button>
                        </div>

                        <div className={showCors ? "" : " hidden "}>
                            <div className="flex flex-col">
                                <div>
                                    <Button
                                        onClick={async () => {
                                            const response = await apiUserLogin(email, password);

                                            setToken_AuthService(response.token);
                                            recogniceResponse(response);
                                        }}
                                    >
                                        Login
                                    </Button>
                                    await apiUserLogin( email, password )
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Email: </label>
                                    <input className="p-1 m-1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Button onClick={() => setEmail("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Password: </label>
                                    <input className="p-1 m-1" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Button onClick={() => setPassword("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Token: </label>"{token}"<Button onClick={() => setToken("")}>DEL</Button>
                                </div>
                                <hr />
                                <div>
                                    <Button
                                        onClick={async () => {
                                            let response = await apiUserLogout(token);
                                            setToken_AuthService("");
                                            recogniceResponse(response);
                                        }}
                                    >
                                        Logout
                                    </Button>
                                    await apiUserLogout( token )
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Token: </label>"{token}"<Button onClick={() => setToken("")}>DEL</Button>
                                </div>
                                <hr />
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiUserRegister(email, password))}>Register</Button>
                                    await apiUserRegister( email, password )
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Email:</label>
                                    <input className="p-1 m-1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Button onClick={() => setEmail("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Password:</label>
                                    <input className="p-1 m-1" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Button onClick={() => setPassword("")}>DEL</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border border-black rounded-sm">
                        <div className="flex flex-row justify-between items-center">
                            <div>Users</div>
                            <Button disabled={showButtonsDisabled.showUsers} onClick={() => setShowUsers(!showUsers)}>
                                {showUsers ? "hide" : "Show"}
                            </Button>
                        </div>
                        <div className={showUsers ? "  " : " hidden "}>
                            <div className="flex flex-col">
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiGetUsers())}>GetAll</Button>
                                    await apiGetUsers()
                                </div>
                                <hr />
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiGetUser(id))}>GetOne</Button>
                                    {"await apiGetUser( id )"}
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" value={id} onChange={(e) => setId(e.target.value)} id="getUserId" type="text" />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                </div>
                                <hr />
                                <div>
                                    <Button
                                        onClick={async () =>
                                            recogniceResponse(
                                                await apiCreateUser({
                                                    email,
                                                    password,
                                                })
                                            )
                                        }
                                    >
                                        Create
                                    </Button>
                                    {"await apiCreateUser( {email, password } )"}
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Email:</label>
                                    <input className="p-1 m-1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Button onClick={() => setEmail("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Password:</label>
                                    <input className="p-1 m-1" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Button onClick={() => setPassword("")}>DEL</Button>
                                </div>
                                <hr />
                                <div>
                                    <Button
                                        onClick={async () =>
                                            recogniceResponse(
                                                await apiUpdateUser(id, {
                                                    email: email,
                                                    password: password,
                                                    isActive: isActive ? 1 : 0,
                                                    isAdmin: isAdmin ? 1 : 0,
                                                })
                                            )
                                        }
                                    >
                                        Update
                                    </Button>
                                    {"await apiUpdateUser(id, {email, password, isActive, isAdmin })"}
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" type="text" value={id} onChange={(e) => setId(e.target.value)} />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Email</label>
                                    <input className="p-1 m-1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Button onClick={() => setEmail("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Password </label>
                                    <input className="p-1 m-1" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <Button onClick={() => setPassword("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Active</label>
                                    <input className="p-1 m-1" type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Admin</label>
                                    <input className="p-1 m-1" type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                                </div>
                                <hr />
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiDeleteUser(id))}>Delete</Button>
                                    {"await apiDeleteUser( id )"}
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" value={id} onChange={(e) => setId(e.target.value)} id="getUserId" type="text" />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border border-black">
                        <div className="flex flex-row justify-between items-center">
                            <div>Events</div>
                            <Button disabled={showButtonsDisabled.showEvents} onClick={() => setShowEvents(!showEvents)}>
                                {showEvents ? "Hide" : "Show"}
                            </Button>
                        </div>
                        <div className={showEvents ? "" : " hidden "}>
                            <div className="flex flex-col">
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiGetEvents())}>GetAll</Button>
                                </div>
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiGetEvent(id))}>GetOne</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" value={id} onChange={(e) => setId(e.target.value)} id="getUserId" type="text" />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                </div>
                                <div>
                                    <Button
                                        onClick={async () =>
                                            recogniceResponse(
                                                await apiCreateEvent({
                                                    title: titleEvent,
                                                    description: descriptionEvent,
                                                    startDateTime: startDateEvent,
                                                    endDateTime: endDateEvent,
                                                    id_user_maintainer: id_user_maintainer,
                                                })
                                            )
                                        }
                                    >
                                        Create
                                    </Button>
                                    {"await apiCreateEvent({titleEvent, descriptionEvent})"}
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID_USER_Maintainer:</label>
                                    <input
                                        className="p-1 m-1"
                                        value={id_user_maintainer}
                                        onChange={(e) => setIdUserMaintainer(e.target.value)}
                                        id="getUserId"
                                        type="text"
                                    />
                                    <Button onClick={() => setIdUserMaintainer("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Title:</label>
                                    <input className="p-1 m-1" type="text" value={titleEvent} onChange={(e) => setTitleEvent(e.target.value)} />
                                    <Button onClick={() => setTitleEvent("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Description:</label>
                                    <input className="p-1 m-1" type="text" value={descriptionEvent} onChange={(e) => setDescriptionEvent(e.target.value)} />
                                    <Button onClick={() => setDescriptionEvent("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">StartDate:</label>
                                    <input className="p-1 m-1" type="text" value={startDateEvent} onChange={(e) => setStartDateEvent(e.target.value)} />
                                    <Button onClick={() => setStartDateEvent("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">EndDate:</label>
                                    <input className="p-1 m-1" type="text" value={endDateEvent} onChange={(e) => setEndDateEvent(e.target.value)} />
                                    <Button onClick={() => setEndDateEvent("")}>DEL</Button>
                                </div>
                                <div>
                                    <Button
                                        onClick={async () =>
                                            recogniceResponse(
                                                await apiUpdateEvent(id, {
                                                    title: titleEvent,
                                                    description: descriptionEvent,
                                                    startDateTime: startDateEvent,
                                                    endDateTime: endDateEvent,
                                                    id_user_maintainer: id_user_maintainer,
                                                })
                                            )
                                        }
                                    >
                                        Update
                                    </Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" value={id} onChange={(e) => setId(e.target.value)} id="getUserId" type="text" />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID_USER_Maintainer:</label>
                                    <input
                                        className="p-1 m-1"
                                        value={id_user_maintainer}
                                        onChange={(e) => setIdUserMaintainer(e.target.value)}
                                        id="getUserId"
                                        type="text"
                                    />
                                    <Button onClick={() => setIdUserMaintainer("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Title:</label>
                                    <input className="p-1 m-1" type="text" value={titleEvent} onChange={(e) => setTitleEvent(e.target.value)} />
                                    <Button onClick={() => setTitleEvent("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Description:</label>
                                    <input className="p-1 m-1" type="text" value={descriptionEvent} onChange={(e) => setDescriptionEvent(e.target.value)} />
                                    <Button onClick={() => setDescriptionEvent("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">StartDate:</label>
                                    <input className="p-1 m-1" type="text" value={startDateEvent} onChange={(e) => setStartDateEvent(e.target.value)} />
                                    <Button onClick={() => setStartDateEvent("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">EndDate:</label>
                                    <input className="p-1 m-1" type="text" value={endDateEvent} onChange={(e) => setEndDateEvent(e.target.value)} />
                                    <Button onClick={() => setEndDateEvent("")}>DEL</Button>
                                </div>
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiDeleteEvent(id))}>Delete</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" value={id} onChange={(e) => setId(e.target.value)} id="getUserId" type="text" />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border border-black">
                        <div className="flex flex-row justify-between items-center">
                            <div>Tasks</div>
                            <Button disabled={showButtonsDisabled.showTasks} onClick={() => setShowTasks(!showTasks)}>
                                {showTasks ? "Hide" : "Show"}
                            </Button>
                        </div>
                        <div className={showTasks ? "" : " hidden "}>
                            <div className="flex flex-col">
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiGetTasks())}>GetAll</Button>
                                </div>
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiGetTask(id))}>GetOne</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" value={id} onChange={(e) => setId(e.target.value)} id="getUserId" type="text" />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                </div>
                                <div>
                                    <Button
                                        onClick={async () =>
                                            recogniceResponse(
                                                await apiCreateTask({
                                                    id_Event: idEvent,
                                                    title: titleTask,
                                                    description: descriptionTask,
                                                    user_id: userIdList,
                                                    todo: todo,
                                                    in_Progress: inProgress,
                                                    done: done,
                                                })
                                            )
                                        }
                                    >
                                        Create
                                    </Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Id_Event:</label>
                                    <input className="p-1 m-1" type="text" value={idEvent} onChange={(e) => setIdEvent(e.target.value)} />
                                    <Button onClick={() => setIdEvent("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Id_User:</label>
                                    <input className="p-1 m-1" type="text" value={userIdList} onChange={(e) => setUserIdList(e.target.value)} />
                                    <Button onClick={() => setUserIdList("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Title:</label>
                                    <input className="p-1 m-1" type="text" value={titleTask} onChange={(e) => setTitleTask(e.target.value)} />
                                    <Button onClick={() => setTitleTask("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Description:</label>
                                    <input className="p-1 m-1" type="text" value={descriptionTask} onChange={(e) => setDescriptionTask(e.target.value)} />
                                    <Button onClick={() => setDescriptionTask("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ToDo:</label>
                                    <input className="p-1 m-1" type="checkbox" checked={todo} onChange={(e) => setTodo(!todo)} />
                                    <br />
                                    <label className="inline-flex w-24 mx-2">inProgress:</label>
                                    <input className="p-1 m-1" type="checkbox" checked={inProgress} onChange={(e) => setInProgress(!inProgress)} />
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Done:</label>
                                    <input className="p-1 m-1" type="checkbox" checked={done} onChange={(e) => setDone(!done)} />
                                </div>
                                <div>
                                    <Button
                                        onClick={async () =>
                                            recogniceResponse(
                                                await apiUpdateTask(id, {
                                                    email: email,
                                                    password: password,
                                                    isActive: isActive ? 1 : 0,
                                                    isAdmin: isAdmin ? 1 : 0,
                                                })
                                            )
                                        }
                                    >
                                        Update
                                    </Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" value={id} onChange={(e) => setId(e.target.value)} id="getUserId" type="text" />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Id_Event:</label>
                                    <input className="p-1 m-1" type="text" value={idEvent} onChange={(e) => setIdEvent(e.target.value)} />
                                    <Button onClick={() => setIdEvent("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Id_User:</label>
                                    <input className="p-1 m-1" type="text" value={userIdList} onChange={(e) => setUserIdList(e.target.value)} />
                                    <Button onClick={() => setUserIdList("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Title:</label>
                                    <input className="p-1 m-1" type="text" value={titleTask} onChange={(e) => setTitleTask(e.target.value)} />
                                    <Button onClick={() => setTitleTask("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Description:</label>
                                    <input className="p-1 m-1" type="text" value={descriptionTask} onChange={(e) => setDescriptionTask(e.target.value)} />
                                    <Button onClick={() => setDescriptionTask("")}>DEL</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ToDo:</label>
                                    <input className="p-1 m-1" type="checkbox" checked={todo} onChange={(e) => setTodo(!todo)} />
                                    <br />
                                    <label className="inline-flex w-24 mx-2">inProgress:</label>
                                    <input className="p-1 m-1" type="checkbox" checked={inProgress} onChange={(e) => setInProgress(!inProgress)} />
                                    <br />
                                    <label className="inline-flex w-24 mx-2">Done:</label>
                                    <input className="p-1 m-1" type="checkbox" checked={done} onChange={(e) => setDone(!done)} />
                                </div>
                                <div>
                                    <Button onClick={async () => recogniceResponse(await apiDeleteTask(id))}>Delete</Button>
                                    <br />
                                    <label className="inline-flex w-24 mx-2">ID:</label>
                                    <input className="p-1 m-1" value={id} onChange={(e) => setId(e.target.value)} id="getUserId" type="text" />
                                    <Button onClick={() => setId("")}>DEL</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <div>
                            Responses:
                            <Button
                                onClick={() => {
                                    setResponse("");
                                    setResponse2("");
                                }}
                            >
                                Del
                            </Button>
                        </div>

                        <div className="border border-black rounded-sm  text-[0.6rem]">
                            {response ? renderJSONWithButtons(response) : <p>No response yet</p>}
                        </div>
                        <div className="border border-black rounded-sm  text-[0.6rem]">
                            {response2 === "" ? <p>No response yet</p> : <pre>{response2}</pre>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DevelopApiCalls;
