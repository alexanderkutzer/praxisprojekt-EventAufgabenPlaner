import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import { apiUserByToken, apiUpdateUser, apiUpdateUserEmail, apiUpdateUserPassword,apiUpdateUserUsername } from "../../../service/api_calls";

function ProfileModal({ setMenu }) {
  const token = "123"
  const [activeSection, setActiveSection] = useState("");

  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState(currentEmail);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [currentUsername, setCurrentUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [confirmNewUsername, setConfirmNewUsername] = useState("");

  useEffect(()=>{
    let { email, username } = apiUserByToken(token);
    setCurrentEmail(email);
    setCurrentUsername(username);

  },[])
  const handleSaveChanges = async () => {
    let response = false;
    if(activeSection == "email"){
      response = apiUpdateUserEmail(token, newEmail);
    }
    if(activeSection == "password"){
      response = apiUpdateUserPassword(token, newPassword)
    }
    if(activeSection == "username"){
      response = apiUpdateUserUsername(token, newUsername)
    }
    
    console.log("Profile updated:", response);
    setActiveSection("")
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96 relative">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={()=>setMenu("home")}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        {activeSection === "" && (
          <ul className="space-y-4">
            <li>
              <button
                className="text-left w-full bg-gray-300 hover:bg-gray-500 px-4 py-2 rounded-md"
                onClick={() => setActiveSection("email")}
              >
                Edit E-mail Address
              </button>
            </li>
            <li>
              <button
                className="text-left w-full bg-gray-300 hover:bg-gray-500 px-4 py-2 rounded-md"
                onClick={() => setActiveSection("password")}
              >
                Edit Password
              </button>
            </li>
            <li>
              <button
                className="text-left w-full bg-gray-300 hover:bg-gray-500 px-4 py-2 rounded-md"
                onClick={() => setActiveSection("username")}
              >
                Edit Username
              </button>
            </li>
          </ul>
        )}

        {activeSection === "email" && (
          <>
            <h3 className="text-lg font-semibold mb-4">E-mail Address</h3>
            <div className="mb-4">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Current e-mail address"
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
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-500"
            onClick={()=>setActiveSection("")}
          >
            Cancel
          </button>
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-500"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
