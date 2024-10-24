import React from "react";

function Input({ className, label, type, value, onChange, id, placeholder, onKeyDown }) {
    return (
        <input
            className={
                " py-1 px-2 text-black border-2 dark:hover:border-gray-300 hover:border-gray-700 focus-visible:border-orange-400 focus-within:border-orange-400 focus:border-orange-400"
            }
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            id={id}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
        />
    );
}

export default Input;
