import React, { useState } from "react";
import PageAdmin from "./pages/admin/Index";
import PageMain from "./pages/main/Index.jsx";
import Login from "./pages/cores/login/Index.jsx";
import Button from "./components/Button.jsx";
import PageDevelop from "./pages/develop/index.jsx";
import { useAuth } from "./service/authStatus.jsx";

export function App() {
    const { isLoggedIn_AuthService, setToken_AuthService } = useAuth();
    const [menu, setMenu] = useState("home");

    const events = [
        { title: "Event 1", date: "2024-10-14" },
        { title: "Event 2", date: "2024-10-15" },
        { title: "Event 3", date: "2024-10-20" },
    ];

    return (
        <div className="mx-16">
            <div className="flex flex-col items-center mt-4">
                <div id="nav" className="flex flex-row">
                    <Button
                        active={menu === "home" ? "true" : "false"}
                        onClick={() => setMenu("home")}
                    >
                        Home
                    </Button>
                    <Button
                        active={menu == "admin" ? "true" : "false"}
                        onClick={() => setMenu("admin")}
                    >
                        Admin
                    </Button>{" "}
                    <Button
                        active={menu == "develop" ? "true" : "false"}
                        onClick={() => setMenu("develop")}
                    >
                        Develop
                    </Button>
                    {!isLoggedIn_AuthService && (
                        <Button
                            active={menu == "login" ? "true" : "false"}
                            onClick={() => setMenu("login")}
                        >
                            Login
                        </Button>
                    )}
                    {isLoggedIn_AuthService && (
                        <Button onClick={() => setToken_AuthService("")}>
                            Logoff
                        </Button>
                    )}
                </div>

                <div id="main" className="w-full flex flex-col items-center">
                    {menu === "home" && <PageMain></PageMain>}
                    {menu === "admin" && <PageAdmin></PageAdmin>}
                    {menu === "develop" && <PageDevelop></PageDevelop>}
                    {menu === "login" && <Login></Login>}
                </div>
            </div>
        </div>
    );
}
export default App;
