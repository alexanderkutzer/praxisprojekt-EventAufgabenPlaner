import React, { useState } from "react";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../service/authStatus.jsx";

const StartPage = ({ onLoginClick, onClickStart }) => {
    const { isLoggedIn_AuthService } = useAuth();
    const [showTextBlock, setShowTextBlock] = useState(false);

    const handleMoreInfoClick = () => {
        setShowTextBlock((prevState) => !prevState); // Toggle: true <-> false
    };

    return (
        <div className="container flex flex-col  items-center justify-center space-y-4 p-4 max-w-6xl mx-auto">
            <img src="/img.png" alt="Logo Elvito" className="w-80 h-80 object-cover rounded-full mb-4" />
            <h1 className="text-2xl font-bold">Für deine Planung!</h1>
            <div className="flex w-full justify-center">
                {!isLoggedIn_AuthService && (
                    <Button className="w-1/4 mx-3 " onClick={onLoginClick}>
                        Zum Login
                    </Button>
                )}
                {isLoggedIn_AuthService && (
                    <Button className="w-1/4 mx-3" onClick={onClickStart}>
                        Start
                    </Button>
                )}
            </div>
            <Button className="w-1/4 mx-3" onClick={handleMoreInfoClick}>
                {showTextBlock ? "Weniger erfahren" : "Mehr erfahren"}
            </Button>

            {showTextBlock && (
                <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8 mb-8">
                    <div className="text-gray-600 leading-relaxed mb-4">
                        <h3 className="text-xl font-semibold mb-2">Evito – Deine Eventplanung leicht gemacht</h3>
                        <p className="mb-4">
                            Mit <strong>Evito</strong> wird die Planung deines Events so einfach wie nie zuvor. Egal, ob es sich um eine private Feier, ein
                            Firmenevent oder eine größere Veranstaltung handelt – Evito unterstützt dich dabei, alles im Blick zu behalten und stressfrei zu
                            organisieren.
                        </p>
                        <p className="mb-4">
                            Plane jedes Detail in einem zentralen, übersichtlichen Tool. Mit einem klaren und benutzerfreundlichen Design bietet dir Evito genau
                            die Unterstützung, die du brauchst, um dein Event von Anfang bis Ende zu planen und zu einem vollen Erfolg zu machen.
                        </p>
                        <p>Starte noch heute mit Evito und erlebe, wie einfach die Organisation deiner nächsten Veranstaltung sein kann!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StartPage;
