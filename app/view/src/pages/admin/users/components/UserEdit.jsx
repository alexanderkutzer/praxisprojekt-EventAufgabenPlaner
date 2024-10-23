import React, { useEffect, useState } from "react";
import { apiUpdateUser, apiDeleteUser } from "../../../../service/api_calls";

function ConfirmModal({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <p className="text-lg mb-4">Are you sure you want to delete this user?</p>
                <div className="flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700" onClick={onConfirm}>
                        Yes, delete
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function UserEdit({ selectedUser, setSelectedUser, users, setUsers }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        setEmail(selectedUser?.email);
        setUsername(selectedUser?.username);
        setIsActive(selectedUser?.isActive);
        setIsAdmin(selectedUser?.isAdmin);
    }, [selectedUser]);

    async function onClickSave() {
        setSelectedUser({ ...selectedUser, email, username, isActive, isAdmin });
        let response = await apiUpdateUser(selectedUser.id, { email, username, isActive, isAdmin });
        console.log(response);
    }

    async function onConfirmDelete() {
        const response = await apiDeleteUser(selectedUser.id);
        console.log(response);

        const remainingUsers = users.filter((user) => user.id !== selectedUser.id);
        setUsers(remainingUsers);
        setSelectedUser(null);
        setShowConfirmModal(false);
    }

    function onClickDelete() {
        setShowConfirmModal(true);
    }

    function onCancelDelete() {
        setShowConfirmModal(false);
    }

    if (!selectedUser) {
        return <p className="text-gray-600">No user selected.</p>;
    }

    return (
        <div className="edit-container p-4 border rounded-lg shadow-md bg-white">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Created at:</label>
                <p className="mt-1 text-gray-500">{new Date(selectedUser.createdAt).toLocaleString()}</p>
            </div>

            <div className="mb-4 flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
            </div>

            <div className="mb-4 flex items-center">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                <label className="ml-2 text-sm font-medium text-gray-700">Admin</label>
            </div>

            <div className="space-x-2">
                <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700" onClick={onClickSave}>
                    Save
                </button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700" onClick={onClickDelete}>
                    Delete
                </button>
            </div>

            {showConfirmModal && <ConfirmModal onConfirm={onConfirmDelete} onCancel={onCancelDelete} />}
        </div>
    );
}

export default UserEdit;
