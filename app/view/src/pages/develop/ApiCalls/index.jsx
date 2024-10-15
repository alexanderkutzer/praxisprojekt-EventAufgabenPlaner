import React, { useEffect } from "react";
import Button from "../../../components/Button";
import {
    apiCreateUser,
    apiDeleteUser,
    apiGetUser,
    apiGetUsers,
    apiUpdateUser,
} from "../../../service/api_calls";

function DevelopApiCalls() {
    const [response, setResponse] = React.useState("");
    const [response2, setResponse2] = React.useState("");
    const [id, setId] = React.useState("");
    const [email, setEmail] = React.useState("email@test");
    const [password, setPassword] = React.useState("passwordtest");
    const [object, setObject] = React.useState({});
    function recogniceResponse(res) {
        console.log(res);
        setResponse(res);
        setResponse2(JSON.stringify(res, null, 2));
    }

    function handleClick(id) {
        setId(id);
    }

    // Funktion zur Rekursiven Darstellung des JSON mit Buttons für IDs
    function renderJSONWithButtons(obj, indent = 0) {
        const indentStyle = { paddingLeft: `${indent * 20}px` };

        if (Array.isArray(obj)) {
            return (
                <div style={indentStyle}>
                    [<br />
                    {obj.map((item, index) => (
                        <div key={index} style={indentStyle}>
                            {renderJSONWithButtons(item, indent + 1)}
                            {index < obj.length - 1 ? "," : ""}{" "}
                            {/* Komma zwischen Array-Elementen */}
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
                                    <Button
                                        onClick={() => handleClick(obj[key])}
                                    >
                                        Klick mich
                                    </Button>
                                </>
                            ) : (
                                renderJSONWithButtons(obj[key], indent + 1)
                            )}
                            {index < keys.length - 1 ? "," : ""}{" "}
                            {/* Komma zwischen Eigenschaften */}
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
            <h1 className="text-lg">Api Calls</h1>
            <p>
                Here we will be able to make api calls and show the response's
            </p>

            <div className="flex gap-2">
                <div className="w-1/2 flex flex-col gap-2">
                    <div>Calls:</div>
                    <div className="border border-black rounded-sm">
                        <div>Users</div>
                        <div className="flex flex-col">
                            <div>
                                <Button
                                    onClick={async () =>
                                        recogniceResponse(await apiGetUsers())
                                    }
                                >
                                    GetAll
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={async () =>
                                        recogniceResponse(await apiGetUser(id))
                                    }
                                >
                                    GetOne
                                </Button>
                                ID:
                                <input
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    id="getUserId"
                                    type="text"
                                />
                                <Button onClick={() => setId("")}>DEL</Button>
                            </div>
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
                                <br />
                                <label>email </label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>password </label>
                                <input
                                    type="text"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={async () =>
                                        recogniceResponse(
                                            await apiUpdateUser(id, {
                                                email: email,
                                            })
                                        )
                                    }
                                >
                                    Update
                                </Button>
                                <br />
                                <label>id </label>
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                                <label>Email</label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={async () =>
                                        recogniceResponse(
                                            await apiDeleteUser(id)
                                        )
                                    }
                                >
                                    Delete
                                </Button>
                                ID:
                                <input
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    id="getUserId"
                                    type="text"
                                />
                                <Button onClick={() => setId("")}>DEL</Button>
                            </div>
                        </div>
                    </div>
                    <div className="border border-black">
                        <div>Events</div>
                    </div>
                    <div className="border border-black">
                        <div>Tasks</div>
                    </div>
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <div>Responses:</div>

                    <div className="border border-black rounded-sm">
                        {response ? (
                            renderJSONWithButtons(response)
                        ) : (
                            <p>No response yet</p>
                        )}
                    </div>
                    <div className="border border-black rounded-sm">
                        {response2}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DevelopApiCalls;
