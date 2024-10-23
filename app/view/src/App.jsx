import React, { useState } from "react";
import PageAdmin from "./pages/admin/Index";
import PageMain from "./pages/main/Index.jsx";
import Login from "./pages/cores/login/Index.jsx";
import Button from "./components/Button.jsx";
import PageDevelop from "./pages/develop/index.jsx";
import { useAuth } from "./service/authStatus.jsx";
import RegisterPage from "./pages/cores/register/index.jsx";


import { DarkModeSwitch } from 'react-toggle-dark-mode';

export function App() {
    const { isLoggedIn_AuthService, setToken_AuthService } = useAuth();
    const [menu, setMenu] = useState("home");
    const [isDarkMode, setDarkMode] = React.useState(false);

    const events = [
        { title: "Event 1", date: "2024-10-14" },
        { title: "Event 2", date: "2024-10-15" },
        { title: "Event 3", date: "2024-10-20" },
    ];

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newMode;
        });
    };

    return (
        <div className="mx-16 dark:text-gray-200">
            <div className="flex flex-col items-center mt-4">
                <div id="nav" className="flex flex-row">
                    <Button active={menu === "home"} onClick={() => setMenu("home")}>
                        Home
                    </Button>
                    <Button active={menu === "admin"} onClick={() => setMenu("admin")}>
                        Admin
                    </Button>
                    <Button active={menu === "develop"} onClick={() => setMenu("develop")}>
                        Develop
                    </Button>
                    {!isLoggedIn_AuthService && (

                        <>
                            <Button active={menu == "login" ? "true" : "false"} onClick={() => setMenu("login")}>
                                Login
                            </Button>
                            <Button active={menu == "register" ? "true" : "false"} onClick={() => setMenu("register")}>
                                Register
                            </Button>
                        </>

                    )}
                    {isLoggedIn_AuthService && (
                        <Button
                            onClick={() => {
                                setToken_AuthService("");
                                setMenu("home");
                            }}
                        >
                            Logoff
                        </Button>
                    )}
                        <div className="flex justify-end mb-8">
                        <DarkModeSwitch
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        size={30}
                        />
                        </div>
                </div>

                <div id="main" className="w-full flex flex-col items-center">

                    {menu === "home" && <PageMain></PageMain>}
                    {menu === "admin" && <PageAdmin></PageAdmin>}
                    {menu === "develop" && <PageDevelop></PageDevelop>}
                    {menu === "login" && <Login setMenu={setMenu}></Login>}
                    {menu === "register" && <RegisterPage setMenu={setMenu}></RegisterPage>}

                </div>
            </div>
        </div>
    );
}

export default App;
