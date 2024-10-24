import React, { useState } from "react";
import Button from "../../../components/Button";
import { apiUserRegister } from "../../../service/api_calls";
import Input from "../../../components/Input";

function RegisterPage({ setMenu }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [passwordA, setpasswordA] = useState("");
    const [passwordB, setpasswordB] = useState("");
    async function onClickRegister() {
        if (passwordA !== passwordB) {
            return;
        }
        let response = await apiUserRegister(email, passwordA, username);
        if (response.register) {
            setMenu("login");
        }
    }
    function onClickCancel() {
        setEmail("");
        setpasswordA("");
        setpasswordB("");
        setMenu("home");
    }
    function onClickLogin() {
        setMenu("login");
    }
    return (
        <div className="container flex flex-col md:mt-40  items-center justify-center space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="flex flex-col gap-2 w-full">
                <p className="text-xl flex-col font-bold">Neues Konto Erstellen</p>
                <div className="flex w-full items-center">
                    <label className="w-2/5">Email </label>
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        name=""
                        id=""
                        className=" w-3/5 form-control p-1,5 border rounded"
                    />
                </div>
                <div className="flex w-full items-center">
                    <label className="w-2/5">Username </label>
                    <Input
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        name=""
                        id=""
                        className=" w-3/5 form-control p-1,5 border rounded"
                    />
                </div>

                <div className="flex w-full items-center">
                    <label className="w-2/5">Passwort </label>
                    <Input
                        onChange={(e) => setpasswordA(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                onClickRegister();
                            }
                            if (event.key === "Escape") {
                                onClickCancel();
                            }
                        }}
                        value={passwordA}
                        type="password"
                        name=""
                        id=""
                        className=" w-3/5 form-control p-1,5 border rounded"
                    />
                </div>
                <div className="flex w-full items-center">
                    <label className="w-2/5">Wiederholung </label>
                    <Input
                        onChange={(e) => setpasswordB(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                onClickRegister();
                            }
                            if (event.key === "Escape") {
                                onClickCancel();
                            }
                        }}
                        value={passwordB}
                        type="password"
                        name=""
                        id=""
                        className=" w-3/5 form-control p-1,5 border rounded"
                    />
                </div>
            </div>
            <div className="flex w-full">
                <Button className={"w-full"} onClick={() => onClickRegister()}>
                    Registrieren
                </Button>
            </div>
            <div className="flex items-center text-sm gap-2">
                <div>Doch schon registriert, dann zum </div>
                <Button onClick={() => onClickLogin()}>Login</Button>
            </div>
        </div>
    );
}

export default RegisterPage;
