import React from "react";

function ButtonTop({ className, disabled, onClick, type, active }) {
    return (
        <button
            disabled={disabled}
            className={
                "rounded-full w-12 h-12  border border-transparent font-bold flex items-center justify-center overflow-hidden " +
                (disabled
                    ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                    : "text-gray-200 dark:text-gray-800 bg-gray-700 dark:bg-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white") +
                (active === "true" && !disabled ? " bg-gray-400 dark:bg-gray-500 hover:border-gray-300 dark:hover:border-gray-700" : "") +
                (className ? ` ${className}` : "")
            }
            type={type}
            onClick={onClick}
            active={active}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-full h-full" viewBox="0 0 16 16">
                <path d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5" />
            </svg>
        </button>
    );
}

export default ButtonTop;
