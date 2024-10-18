import { useState } from "react";
import Swal from "sweetalert2";
import { apiUserLogin } from "../../../service/api_calls";
import Button from "../../../components/Button";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onClickLogin() {
        apiUserLogin(email, password);
    }

    function handleLogin(e) {
        e.preventDefault();

        if (email === "jane@doe.com" && password === "password12345") {
            Swal.fire({
                icon: "success",
                title: "Login successful",
                text: "Welcome!",
            });
            navigate("/");
        } else {
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: "Email or password invalid",
            });
        }
    }

    return (
        <div className="container" style={{ marginTop: "10vh" }}>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <p>Welcome!</p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address:
                    </label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
                </div>
                <Button onClick={() => onClickLogin()} className="btn btn-primary">
                    LOG IN
                </Button>
                <p style={{ marginTop: "2vh" }}>No account yet? Create an account</p>
                <p>
                    <br />
                    Demo user: <br />
                    Email: jane@doe.com <br />
                    Password: password12345
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
