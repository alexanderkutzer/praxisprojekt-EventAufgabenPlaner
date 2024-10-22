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
        <div>
            <div className="flex flex-col gap-1">
                <label>Email </label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" name="" id="" />
                <label>Username </label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="" id="" />

                <label>Passwort </label>

                <input onChange={(e) => setpasswordA(e.target.value)} value={passwordA} type="password" name="" id="" />
                <label>Wiederholung </label>

                <input onChange={(e) => setpasswordB(e.target.value)} value={passwordB} type="password" name="" id="" />
            </div>
            <Button onClick={() => onClickRegister()}>Register</Button>
            <Button onClick={() => onClickLogin()}>Login</Button>
            <Button onClick={() => onClickCancel()}>Cancel</Button>
        </div>
    );
}

export default RegisterPage;
