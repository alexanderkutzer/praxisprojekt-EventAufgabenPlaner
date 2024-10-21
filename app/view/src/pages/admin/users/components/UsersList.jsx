import React, { useEffect, useState } from "react";
import { apiGetUsers } from "../../../../service/api_calls";
import Button from "../../../../components/Button";

function UsersList({ selectedUser, setSelectedUser, users, setUsers }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiGetUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Fehler beim Laden der Benutzer:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedUser) {
            let newUsers = users.map((user) => {
                if (user.id === selectedUser.id) {
                    user = selectedUser;
                }
                return user;
            });
            setUsers(newUsers);
        }
    }, [selectedUser]);

    if (loading) {
        return <p className="text-gray-600">Lade Benutzer...</p>;
    }

    return (
        <div className="users-container flex flex-col p-4">
            {users.length === 0 ? (
                <p className="text-gray-600">Keine Benutzer verfügbar</p>
            ) : (
                users.map((user) => (
                    <Button
                        key={user.id}
                        onClick={() => {
                            setSelectedUser(user);
                        }}
                    >
                        {user.email}
                    </Button>
                ))
            )}
        </div>
    );
}

export default UsersList;
