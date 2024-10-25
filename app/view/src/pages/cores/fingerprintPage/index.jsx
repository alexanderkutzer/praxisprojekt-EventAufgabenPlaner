import React from "react";
import { useAuth } from "../../../service/authStatus.jsx";

function FingerprintPage() {
    const { isLoggedIn_AuthService } = useAuth();
    return (
        <>
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
                            setToken_AuthService("start");
                            setMenu("start");
                        }}
                    >
                        Logoff
                    </Button>
                )}
                <Button onClick={toggleDarkMode}>Toggle Dark Mode</Button>
            </div>

            <div id="main" className="w-full flex flex-col items-center">
                {menu === "home" && <PageMain></PageMain>}
                {menu === "admin" && <PageAdmin></PageAdmin>}
                {menu === "develop" && <PageDevelop></PageDevelop>}
                {menu === "login" && <Login setMenu={setMenu}></Login>}
                {menu === "register" && <RegisterPage setMenu={setMenu}></RegisterPage>}
            </div>
        </>
    );
}

export default FingerprintPage;
