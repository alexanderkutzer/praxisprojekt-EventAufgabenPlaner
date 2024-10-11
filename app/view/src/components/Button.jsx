import React from "react";

function Button({ type, onClick, active, children }) {
    return (
        <button
            className={
                "bg-purple-300 border border-gray-300 rounded-md px-2 py-1 m-2 hover:bg-gray-300 *:" +
                (active == "true" && " bg-gray-400 ")
            }
            type={type}
            onClick={onClick}
            active={active}
        >
            {children}
        </button>
    );
}

export default Button;
