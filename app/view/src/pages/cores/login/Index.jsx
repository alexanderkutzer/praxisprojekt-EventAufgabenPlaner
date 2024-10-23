import { useEffect, useState } from "react";
import { apiUserLogin } from "../../../service/api_calls";
import Button from "../../../components/Button";
import { useAuth } from "../../../service/authStatus";

function LoginPage({ setMenu, setFingerMenu }) {
    const { isLoggedIn_AuthService, setToken_AuthService } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        <div className="container" style={{ marginTop: "10vh" }}>
            <h2>Login</h2>
            <p>Welcome!</p>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email address:
                </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password:
                </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
            </div>
            <Button onClick={() => onClickLogin()} className="uppercase">
                Login
            </Button>
            <Button
                className="uppercase"
                onClick={() => {
                    setEmail("");
                    setPassword("");
                }}
            >
                Reset
            </Button>
            <p style={{ marginTop: "2vh" }}>No account yet? Create an account</p>
            <p>
                <br />
                Demo user: <br />
                Email: jane@doe.com <br />
                Password: password12345
            </p>
            <Button
                onClick={() => {
                    setEmail("jane@doe.com");
                    setPassword("password12345");
                }}
            >
                Demo User to Inputs
            </Button>
        </div>
    );
}

export default LoginPage;
