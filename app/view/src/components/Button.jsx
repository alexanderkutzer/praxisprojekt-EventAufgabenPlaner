import React from "react";

function Button({ type, onClick, active, children, disabled }) {
    return (
        <button
            disabled={disabled}
            className={
                "border border-gray-300 rounded-md px-2 py-0.5 m-2 " +
                (disabled ? " text-gray-300 " : "hover:bg-gray-700  ") +
                (active === "true"
                    ? disabled
                        ? " "
                        : " bg-gray-400 hover:border-gray-300 "
                    : disabled
                    ? " "
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
