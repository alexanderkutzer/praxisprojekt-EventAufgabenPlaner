import { useEffect, useState } from "react";
import { apiUserLogin } from "../../../service/api_calls";
import Button from "../../../components/Button";
import { useAuth } from "../../../service/authStatus";

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
                <div
                    className="container flex flex-col items-center justify-center space-y-4 p-4 border border-gray-300 rounded-lg shadow-lg max-w-md mx-auto"
                    style={{ marginTop: "10vh" }}
                >
                    <h2>Wilkommen!</h2>
                    <p>Login</p>
                    <div className="mb-3 space-x-2">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control p-1,5 border rounded"
                            id="email"
                        />
                    </div>

                    <div className="mb-3 space-x-2">
                        <label htmlFor="password" className="form-label">
                            Passwort
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control p-1,5 border rounded"
                            id="password"
                        />
                    </div>
                    <Button onClick={() => onClickLogin()} >
                        Login
                    </Button>
                    <Button
                        onClick={() => {
                            setEmail("");
                            setPassword("");
                        }}
                    >
                        Felder leeren
                    </Button>
                    <p style={{ marginTop: "2vh" }}>Noch nicht registriert? <Button onClick={() => onClickRegister()}>Konto erstellen</Button></p>
                    <p>
                        <br />
                        Test Profil: <br />
                        Email: jane@doe.com <br />
                        Passwort: passwort12345
                    </p>
                    <Button
                        onClick={() => {
                            setEmail("jane@doe.com");
                            setPassword("password12345");
                        }}
                    >
                        Test Profil in Felder einsetzen 
                    </Button>
                </div>
    );
}

export default LoginPage;
