import React, { useState } from "react";
import PageAdmin from "./pages/admin/Index";
import PageMain from "./pages/main/Index.jsx";
import Login from "./pages/cores/login/Index.jsx";
import Button from "./components/Button.jsx";
import PageDevelop from "./pages/develop/index.jsx";
import { useAuth } from "./service/authStatus.jsx";
import RegisterPage from "./pages/cores/register/index.jsx";
import ProfileModal from "./pages/cores/profil/index.jsx";
import ButtonFingerprint from "./components/ButtonFingerprint.jsx";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export function App() {
    const { isLoggedIn_AuthService, setToken_AuthService } = useAuth();
    const [fingerMenu, setFingerMenu] = useState("start");
    const [menu, setMenu] = useState("profile");

    const [isDarkMode, setDarkMode] = React.useState(false);

    const events = [
        { title: "Event 1", date: "2024-10-14" },
        { title: "Event 2", date: "2024-10-15" },
        { title: "Event 3", date: "2024-10-20" },
    ];

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return newMode;
        });
    };

    return (
        <div className="mx-16 dark:text-gray-200">
            <div className="fixed left-1">
                <ButtonFingerprint
                    onClick={() => {
                        setFingerMenu(fingerMenu == "start" ? "usermenu" : "start");
                    }}
                    className=" w-14 h-14 fill-gray-200 dark:fill-gray-800 hover:fill-gray-800 dark:hover:fill-gray-200"
                ></ButtonFingerprint>
                {fingerMenu}
            </div>
            <div id="nav" className="fixed right-1 ">
            <DarkModeSwitch
                        checked={isDarkMode}
                        onChange={toggleDarkMode}
                        size={30}
                        />
            </div>
            <div className="flex flex-col items-center mt-4">
                <div id="main" className="w-full flex flex-col items-center">
                    {fingerMenu == "start" && (!isLoggedIn_AuthService ? <Login setMenu={setMenu}></Login> : <PageMain></PageMain>)}
                    {fingerMenu == "usermenu" && isLoggedIn_AuthService && (
                        <div className="flex flex-row items-center">
                            <Button
                                onClick={() => {
                                    setMenu("profile");
                                }}
                                active={menu === "profile" ? "true" : "false"}
                            >
                                Profile
                            </Button>
                            <Button
                                onClick={() => {
                                    setMenu("admin");
                                }}
                                active={menu === "admin" ? "true" : "false"}
                            >
                                Admin
                            </Button>
                            <Button
                                onClick={() => {
                                    setMenu("develop");
                                }}
                                active={menu === "develop" ? "true" : "false"}
                            >
                                Develop
                            </Button>
                            <Button
                                onClick={() => {
                                    setToken_AuthService("");
                                    setFingerMenu("start");
                                    setMenu("profile");
                                }}
                            >
                                Logout
                            </Button>
                        </div>
                    )}
                    {fingerMenu == "usermenu" &&
                        (!isLoggedIn_AuthService
                            ? setFingerMenu("start")
                            : (menu === "profile" && <ProfileModal setMenu={setMenu}></ProfileModal>) ||
                              (menu === "admin" && <PageAdmin></PageAdmin>) ||
                              (menu === "develop" && <PageDevelop></PageDevelop>))}
                </div>
            </div>
        </div>
    );
}

export default App;
