import React, { useEffect, useState } from "react";
import { useAuth } from "./service/authStatus.jsx";
import ButtonFingerprint from "./components/ButtonFingerprint.jsx";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import LoginPage from "./pages/cores/login/Index.jsx";
import PageMain from "./pages/main/Index";
import Button from "./components/Button.jsx";
import PageAdmin from "./pages/admin/Index";
import ProfilePage from "./pages/cores/profil/index.jsx";
import PageDevelop from "./pages/develop/index";
import RegisterPage from "./pages/cores/register/index.jsx";
import PageMain2 from "./pages/main/Index2.jsx";
import ButtonLightDark from "./components/ButtonLightDark.jsx";
import StartPage from "./pages/start/index.jsx";
import ButtonStart from "./components/ButtonStart.jsx";
import ButtonTop from "./components/ButtonTop.jsx";

export function App() {
    const { isLoggedIn_AuthService, setToken_AuthService, isAdmin } = useAuth();
    const [fingerMenu, setFingerMenu] = useState("start");
    const [menu, setMenu] = useState("start");

    const [isDarkMode, setDarkMode] = React.useState(false);
    const [setTop, setSetTop] = useState(false);

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

    const navigateToHome = () => {
        setMenu("start");
        setFingerMenu("");
    };
    useEffect(() => {
        isLoggedIn_AuthService && setMenu("main");
        !isLoggedIn_AuthService && setMenu("start");
    }, [isLoggedIn_AuthService]);
    return (
        <div className="md:m-1 md:mx-16 dark:text-[#0b0a22]">
            <div id="top"></div>
            <div className="flex justify-between md:mb-2">
                <div className="">
                    <ButtonFingerprint
                        onClick={() => {
                            if (isLoggedIn_AuthService) {
                                setFingerMenu(fingerMenu == "start" ? "usermenu" : "start");
                                setMenu(fingerMenu !== "usermenu" ? "profile" : "main");
                            } else {
                                setMenu("start");
                            }
                        }}
                        className=" fill-gray-200 dark:fill-gray-800 hover:fill-gray-800 dark:hover:fill-gray-200"
                    ></ButtonFingerprint>
                </div>
                <div className="">
                    <ButtonStart onClick={navigateToHome}></ButtonStart>
                </div>
                <div id="nav" className=" ">
                    <ButtonLightDark onClick={toggleDarkMode} className={" w-10 h-10 md:w-14 md:h-14"}>
                        <DarkModeSwitch checked={isDarkMode} size={30} moonColor="gray" sunColor="yellow" />
                    </ButtonLightDark>
                </div>
            </div>

            <div className="flex flex-col items-center bg-[#fafafa]">
                <div id="main" className="w-full flex flex-col items-center bg-[#fafafa]">
                    {menu == "start" && (
                        <StartPage
                            setMenu={setMenu}
                            onLoginClick={() => setMenu("login")}
                            onClickStart={() => {
                                setMenu("main");
                                setFingerMenu("start");
                            }}
                        ></StartPage>
                    )}
                    {!isLoggedIn_AuthService && menu == "login" && <LoginPage setMenu={setMenu}></LoginPage>}
                    {!isLoggedIn_AuthService && menu == "register" && <RegisterPage setMenu={setMenu}></RegisterPage>}
                    {isLoggedIn_AuthService && fingerMenu == "start" && <PageMain setTop={setTop}></PageMain>}
                    {isLoggedIn_AuthService && fingerMenu == "usermenu" && (
                        <div className="flex flex-row items-center gap-2">
                            <Button
                                onClick={() => {
                                    setMenu("profile");
                                }}
                                active={menu === "profile" ? "true" : "false"}
                            >
                                Profile
                            </Button>
                            {isAdmin && (
                                <>
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
                                </>
                            )}
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

                    {isLoggedIn_AuthService && fingerMenu == "usermenu" && menu === "admin" && <PageAdmin></PageAdmin>}
                    {isLoggedIn_AuthService && fingerMenu == "usermenu" && menu === "develop" && <PageDevelop></PageDevelop>}
                    {isLoggedIn_AuthService && fingerMenu == "usermenu" && menu === "profile" && <ProfilePage setMenu={setMenu}></ProfilePage>}
                </div>
            </div>
            <div className="fixed bottom-[-8px] right-[-8px] z-50">
                <ButtonTop
                    onClick={() => {
                        const element = document.getElementById("top");
                        element.scrollIntoView({ behavior: "smooth" });
                        setTimeout(() => {
                            setSetTop(!setTop);
                        }, 0);
                    }}
                    className=" w-14 h-14 fill-gray-200 dark:fill-gray-800"
                ></ButtonTop>
            </div>
        </div>
    );
}

export default App;
