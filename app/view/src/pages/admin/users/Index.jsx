import React from "react";
import UsersList from "./components/UsersList";
import UserEdit from "./components/UserEdit";

function PageUsers() {
    const [users, setUsers] = React.useState([]);

    const [selectedUser, setSelectedUser] = React.useState(null);

    return (
        <div className="flex flex-col">
            <div>Users</div>
            <div className="flex flex-row gap-2">
                <div className="w-1/2 rounded-md border border-black p-1">
                    <UsersList selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users} setUsers={setUsers}></UsersList>
                </div>
                <div className="w-1/2 rounded-md border border-black p-1">
                    <UserEdit selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users} setUsers={setUsers}></UserEdit>
                </div>
            </div>
        </div>
    );
}

export default PageUsers;
