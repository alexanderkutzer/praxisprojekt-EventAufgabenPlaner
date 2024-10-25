import React, { useState } from "react";
import Button from "../../components/Button";
import PageUsers from "./users/Index";

function PageAdmin() {
    const [menu, setMenu] = useState("dashboard");
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row justify-center gap-2">
                <Button active={menu === "dashboard" ? "true" : "false"} onClick={() => setMenu("dashboard")}>
                    Dashboard
                </Button>
                <Button active={menu === "users" ? "true" : "false"} onClick={() => setMenu("users")}>
                    Users
                </Button>
            </div>
            <div className="flex flex-col">
                {menu === "dashboard" && <div>Dashboard</div>}
                {menu === "users" && <PageUsers></PageUsers>}
            </div>
        </div>
    );
}

export default PageAdmin;
