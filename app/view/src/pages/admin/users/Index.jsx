import React from "react";
import UsersList from "./components/UsersList";
import UserEdit from "./components/UserEdit";

function PageUsers() {
    return (
        <div className="flex flex-col">
            <div>Users</div>
            <div className="flex flex-row gap-2">
                <div className="w-1/2 rounded-md border border-black p-1">
                    <UsersList></UsersList>
                </div>
                <div className="w-1/2 rounded-md border border-black p-1">
                    <UserEdit></UserEdit>
                </div>
            </div>
        </div>
    );
}

export default PageUsers;
