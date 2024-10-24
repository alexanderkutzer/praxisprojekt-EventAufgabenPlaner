import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import { apiUserByToken, apiUpdateUserEmail, apiUpdateUserPassword, apiUpdateUserUsername } from "../../../service/api_calls";
import { useAuth } from "../../../service/authStatus";

function ProfilePage({ setMenu }) {
    const { token_AuthService } = useAuth();
    const [activeSection, setActiveSection] = useState("");

    const [currentEmail, setCurrentEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [currentUsername, setCurrentUsername] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [confirmNewUsername, setConfirmNewUsername] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let response = await apiUserByToken(token_AuthService);

            setCurrentEmail(response.email);
            setNewUsername(response.username);
        };
        fetchData();
    }, [token_AuthService]);
    const handleSaveChanges = async () => {
        let response = false;
        if (activeSection == "email") {
            response = apiUpdateUserEmail(token_AuthService, newEmail);
        }
        if (activeSection == "password") {
            response = await apiUpdateUserPassword(token_AuthService, newPassword);
        }
        if (activeSection == "username") {
            response = await apiUpdateUserUsername(token_AuthService, newUsername);
            setCurrentUsername("");
            setNewUsername("");
            setConfirmNewUsername("");
        }

        setActiveSection("");
    };

    return (
        <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-md shadow-md relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setMenu("home")}>
                &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            {activeSection === "" && (
                <div className="flex gap-2">
                    <Button onClick={() => setActiveSection("email")}>Edit E-mail Address</Button>

                    <Button onClick={() => setActiveSection("password")}>Edit Password</Button>

                    <Button onClick={() => setActiveSection("username")}>Edit Username</Button>
                </div>
            )}

            {activeSection === "email" && (
                <>
                    <h3 className="text-lg font-semibold mb-4">E-mail Address</h3>
                    <div>{currentEmail}</div>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="new e-mail address"
                        />
                    </div>
                </>
            )}

            {activeSection === "password" && (
                <>
                    <h3 className="text-lg font-semibold mb-4">Password</h3>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Current password"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="New password"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Confirm new password"
                        />
                    </div>
                </>
            )}

            {activeSection === "username" && (
                <>
                    <h3 className="text-lg font-semibold mb-4">Username</h3>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={currentUsername}
                            onChange={(e) => setCurrentUsername(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Current username"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="New username"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={confirmNewUsername}
                            onChange={(e) => setConfirmNewUsername(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="Confirm new username"
                        />
                    </div>
                </>
            )}

            <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={() => setActiveSection("")}>Cancel</Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    );
}

export default ProfilePage;
