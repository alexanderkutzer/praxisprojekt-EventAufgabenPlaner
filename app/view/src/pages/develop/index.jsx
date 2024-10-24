import { useState } from "react";
import DevelopDashboard from "./Dashboard";
import DevelopApiCalls from "./ApiCalls";
import Button from "../../components/Button";

function PageDevelop() {
    const [menu, setMenu] = useState("dashboard");

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex gap-2">
                <Button active={menu === "dashboard" ? "true" : "false"} onClick={() => setMenu("dashboard")}>
                    Dashboard
                </Button>
                <Button active={menu === "apicall" ? "true" : "false"} onClick={() => setMenu("apicall")}>
                    ApiCall's
                </Button>
            </div>
            <div className="w-full">
                {menu === "dashboard" && <DevelopDashboard />}
                {menu === "apicall" && <DevelopApiCalls />}
            </div>
        </div>
    );
}

export default PageDevelop;
