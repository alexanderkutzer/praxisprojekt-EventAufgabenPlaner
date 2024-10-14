import React from "react";

function Button({ type, onClick, active, children }) {
    return (
        <button
            className={
                "border border-gray-300 rounded-md px-2 py-1 m-2 hover:bg-gray-700   " +
                (active === "true"
                    ? " bg-gray-400 hover:border-gray-300 "
                    : " bg-purple-300 hover:border-gray-700 ")
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
