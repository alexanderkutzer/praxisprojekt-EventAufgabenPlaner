import React from "react";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../service/authStatus.jsx";

const StartPage = ({ onLoginClick, onClickStart }) => {
    const { isLoggedIn_AuthService } = useAuth();
    return (
        <div className="container flex flex-col md:mt-40 items-center justify-center space-y-4 p-4 max-w-md mx-auto">
            <img src="/img.png" alt="Logo Elvito" className="w-62 h-62 object-cover rounded-full mb-4" />
            <h1 className="text-2xl font-bold">Für deine Planung!</h1>
            <div className="flex w-full justify-center">
                {!isLoggedIn_AuthService && (
                    <Button className="w-full mx-3" onClick={onLoginClick}>
                        Zum Login
                    </Button>
                )}
                {isLoggedIn_AuthService && (
                    <Button className="w-full mx-3" onClick={onClickStart}>
                        Start
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StartPage;
