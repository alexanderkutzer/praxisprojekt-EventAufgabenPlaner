import React from "react";

function Button({ type, onClick, active, children, disabled, className }) {
    return (
        <button
            disabled={disabled}
            className={
                " " +
                "rounded-md px-2 py-0.5 border border-transparent font-bold " +
                (disabled
                    ? "text-white dark:text-black cursor-not-allowed"
                    : "text-white dark:text-[#393632] bg-black dark:bg-[#D5CDB8] hover:bg-white dark:hover:bg-[#393632] hover:text-black dark:hover:text-[#D5CDB8] border-white hover:border-black dark:hover:border-[#D5CDB8] dark:border-[#393632]") +
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
