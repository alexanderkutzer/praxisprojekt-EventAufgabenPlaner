import { useEffect, useState } from "react";
import { apiUserLogin } from "../../../service/api_calls";
import Button from "../../../components/Button";
import { useAuth } from "../../../service/authStatus";
import Input from "../../../components/Input";

function LoginPage({ setMenu, setFingerMenu }) {
    const { isLoggedIn_AuthService, setToken_AuthService } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function onClickRegister() {
        setMenu("register");
    }

    async function onClickLogin() {
        let response = await apiUserLogin(email, password);
        if (response.login) {
            setToken_AuthService(response.token);
            setErrorMessage("");
            if (email === "jane@doe.com") {
                localStorage.setItem("isTestUser", true);
            } else {
                localStorage.removeItem("isTestUser");
            }
        } else {
            setErrorMessage("Incorrect email or password, or account not registered.");
        }
    }

    useEffect(() => {
        if (isLoggedIn_AuthService) {
            setFingerMenu("start");
            setMenu("start");
        }
    }, [isLoggedIn_AuthService]);

    return (
        <div className="container flex flex-col items-center justify-center space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg md:max-w-md">
            <p className="text-xl font-bold">Login</p>
            <h2 className="text-xl ">Wilkommen!</h2>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
                    name="email"
                    autocomplete="username"
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
                    name="password"
                    autocomplete="current-password"
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
            <div className="flex w-4/5">
                <Button className={"w-full mx-3"} onClick={() => onClickLogin()}>
                    Login
                </Button>
            </div>
            <div className="flex w-4/5">
                <div className="text-sm flex w-full items-center gap-2 border border-gray-500 mx-3 py-2 px-4 rounded text-center shadow-sm shadow-black">
                    Noch nicht registriert? <Button onClick={() => onClickRegister()}>Konto erstellen</Button>
                </div>
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
                Test Profil Daten einfügen
            </Button>
        </div>
    );
}

export default LoginPage;
