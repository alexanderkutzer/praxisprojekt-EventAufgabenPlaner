import React, { useState } from "react";
import Button from "./components/Button";
import PageAdmin from "./pages/admin/Index";
import PageMain from "./pages/main/Index.jsx";
import Login from "./pages/cores/login/Index.jsx";

export function App() {
    const [menu, setMenu] = useState("home");


    const events = [
        { title: 'Event 1', date: '2024-10-14' },
        { title: 'Event 2', date: '2024-10-15' },
        { title: 'Event 3', date: '2024-10-20' },
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
                    </Button>
                    <Button
                        active={menu == "login" ? "true" : "false"}
                        onClick={() => setMenu("login")}
                    >
                        Login
                    </Button>
                </div>
                <div id="main" className="w-full flex flex-col items-center">
                    {menu === "home" && <PageMain></PageMain>}
                    {menu === "admin" && <PageAdmin></PageAdmin>}
                    {menu === "login" && <Login></Login>}
                </div>
            </div>

        </div>
        <div className="flex flex-col items-start w-full mt-8">  
         <div className="w-full max-w-[50%]">
            <Calendar
         events={events}
        plugins={[dayGridPlugin, multiMonthPlugin]}
    />
    </div>
    </div>
    </div>
    );
}
export default App;
