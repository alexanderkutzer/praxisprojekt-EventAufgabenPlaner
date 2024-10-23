import React, { useState } from "react";
import Button from "../../../components/Button";
import { apiUserRegister } from "../../../service/api_calls";

function RegisterPage({ setMenu }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [passwordA, setpasswordA] = useState("");
    const [passwordB, setpasswordB] = useState("");
    async function onClickRegister() {
        if (passwordA !== passwordB) {
            return;
        }
        let response = await apiUserRegister(email, username, passwordA);
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
        <div className="container flex flex-col items-center justify-center space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="flex flex-col gap-1">
                <p className="text-xl flex-col font-bold">Neues Konto Erstellen</p>
                <label>Email </label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="" id="" className="form-control p-1,5 border rounded"/>
                <label>Username </label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="" id="" className="form-control p-1,5 border rounded" />

                <label>Passwort </label>

                <input onChange={(e) => setpasswordA(e.target.value)} value={passwordA} type="password" name="" id="" className="form-control p-1,5 border rounded"/>
                <label>Wiederholung </label>

                <input onChange={(e) => setpasswordB(e.target.value)} value={passwordB} type="password" name="" id="" className="form-control p-1,5 border rounded"/>
            </div>
            <div>
            <Button onClick={() => onClickRegister()}>Registrieren</Button>
            <Button onClick={() => onClickLogin()}>Login</Button>
            <Button onClick={() => onClickCancel()}>Abbruch</Button>
            </div>
        </div>
    );
}

export default RegisterPage;
