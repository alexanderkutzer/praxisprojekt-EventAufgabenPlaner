import React from "react";
import Button from "../../components/Button.jsx";

const StartPage = ({ onLoginClick }) => {
    return (
        <div className="container flex flex-col md:mt-40 items-center justify-center space-y-4 p-4 max-w-md mx-auto">
            <img
                src="/img.png"
                alt="Logo Elvito"
                className="w-62 h-62 object-cover rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold">Für deine Planung!</h1>
            <div className="flex w-full justify-center">
                <Button className="w-full mx-3" onClick={onLoginClick}>
                    Zum Login
                </Button>
            </div>
        </div>
    );
};

export default StartPage;

