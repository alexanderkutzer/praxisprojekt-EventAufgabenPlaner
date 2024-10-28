import React from "react";

function Button({ type, onClick, active, children, disabled, className, id }) {
    return (
        <button
            id={id}
            disabled={disabled}
            className={
                " " +
                "rounded-md px-2 py-0.5  border border-transparent font-bold " +
                (disabled
                    ? "text-white dark:text-black cursor-not-allowed"
                    : "text-white dark:text-black bg-black dark:bg-white hover:bg-white dark:hover:bg-[#030303] hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white") +
                (active === "true" && !disabled
                    ? " bg-orange-400 dark:bg-orange-500 hover:border-gray-300 hover:text-orange-500 dark:hover:border-gray-700"
                    : " ") +
                className
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
