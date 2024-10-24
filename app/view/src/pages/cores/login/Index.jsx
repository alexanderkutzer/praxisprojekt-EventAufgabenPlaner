
import { useEffect, useState } from "react";
import { apiUserLogin } from "../../../service/api_calls";
import Button from "../../../components/Button";
import { useAuth } from "../../../service/authStatus";
import Input from "../../../components/Input";

function LoginPage({ setMenu, setFingerMenu }) {
    const { isLoggedIn_AuthService, setToken_AuthService } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onClickRegister() {
        setMenu("register");
    }

    async function onClickLogin() {
        let response = await apiUserLogin(email, password);
        if (response.login) {
            setToken_AuthService(response.token);
        }
    }
    useEffect(() => {
        if (isLoggedIn_AuthService) {
            setFingerMenu("start");
            setMenu("home");
        }
    }, [isLoggedIn_AuthService]);
    return (
        <div className="container flex flex-col md:mt-40 items-center justify-center space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto">
            <p className="text-xl font-bold">Login</p>
            <h2 className="text-xl ">Wilkommen!</h2>
            <div className="mb-3 flex w-4/5 justify-center items-center">
                <label htmlFor="email" className="form-label w-1/4">
                    Email
                </label>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            onClickLogin();
                        }
                        if (event.key === "Escape") {
                            setEmail("");
                            setPassword("");
                        }
                    }}
                    type="email"
                    className=" w-3/4 form-control p-1,5 border rounded"
                    id="email"
                />
            </div>

            <div className="mb-3 flex w-4/5 justify-center items-center">
                <label htmlFor="password" className="form-label w-1/4">
                    Passwort
                </label>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control p-1,5 border rounded w-3/4"
                    id="password"
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            onClickLogin();
                        }
                        if (event.key === "Escape") {
                            setEmail("");
                            setPassword("");
                        }
                    }}
                />
            </div>
            <div className="flex justify-between w-4/5">
                <Button
                    onClick={() => {
                        setEmail("");
                        setPassword("");
                    }}
                >
                    Felder leeren
                </Button>
                <Button onClick={() => onClickLogin()}>Login</Button>
            </div>
            <div className="w-4/5 border border-gray-500 py-3 rounded text-center shadow-sm shadow-black">
                Noch nicht registriert? <Button onClick={() => onClickRegister()}>Konto erstellen</Button>
            </div>
            <p>
                <br />
                <span className="font-bold">Test Profil:</span> <br />
                Email: jane@doe.com <br />
                Passwort: passwort12345
            </p>
            <Button
                onClick={() => {
                    setEmail("jane@doe.com");
                    setPassword("password12345");
                }}
            >
                Test Profil daten einfügen
            </Button>
        </div>
    );
}

export default LoginPage;
