import React, { useState } from "react";
import Button from "../../../../../components/Button";
import { colors } from "../../../../../service/colors";

function ColorPicker({ color, setColor }) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState(color);
    return (
        <div className="flex items-center">
            <button
                onClick={() => {
                    setShowPicker(!showPicker);
                }}
                style={{ backgroundColor: selectedColor }}
                className="px-2 py-1 rounded  hover:border-black border hover:dark:bg-white"
            >
                Farbe auswählen
            </button>
            <div className="flex items-center md:ms-3 md:pe-2 ">
                <div className={(showPicker ? "" : "hidden") + " absolute p-2 border border-gray-300 rounded-lg shadow-lg flex-col gap-1 bg-slate-500"}>
                    <div className="flex">
                        <div className="grid grid-flow-row grid-cols-6 ">
                            {colors.map((c) => (
                                <div
                                    key={c.normal}
                                    onClick={() => {
                                        setSelectedColor(c.normal);
                                        setColor(c.normal);
                                    }}
                                    style={{ backgroundColor: c.normal }}
                                    className="w-10 h-10 rounded-md border border-gray-300 hover:border-black"
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                setShowPicker(false);
                                setColor(selectedColor);
                            }}
                            className={"w-full"}
                        >
                            OK
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ColorPicker;
