import React from "react";

function ButtonStart({ className, disabled, onClick, type, active }) {
    return (
        <button
            disabled={disabled}
            className={
                "rounded-full w-14 h-14  border border-transparent font-bold flex items-center justify-center overflow-hidden " +
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
            {/* Bild, das im Button integriert ist */}
            <img src="/img.png" alt="Icon" className="w-full h-full object-cover rounded-full" />
        </button>
    );
}

export default ButtonStart;
