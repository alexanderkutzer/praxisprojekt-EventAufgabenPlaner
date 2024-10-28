import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "../../../../../components/Button";

function TimeViewSelector({ getTime, selectedTime, setSelectedTime }) {
    const clockbox = useRef();
    const timeSelectorBox = useRef();
    const [hour, setHour] = useState(getTime.hour ?? selectedTime.hour ?? 12);
    const [minute, setMinute] = useState(getTime.minute ?? selectedTime.minute ?? 0);
    const [selectedTimeInBox, setSelectedTimeInBox] = useState(hour + ":" + minute.toString().padStart(2, "0"));
    useEffect(() => {
        setSelectedTimeInBox(hour + ":" + minute.toString().padStart(2, "0"));
        setSelectedTime({ hour: hour, minute: minute });
    }, [hour, minute]);
    return (
        <div ref={clockbox} className="flex items-center">
            <Button
                onClick={() => {
                    timeSelectorBox.current.classList.toggle("hidden");
                    timeSelectorBox.current.classList.toggle("flex");
                    setSelectedTimeInBox(hour + ":" + minute.toString().padStart(2, "0"));
                    setSelectedTime({ hour: hour, minute: minute });
                    document.getElementById("h" + hour).scrollIntoView({ block: "center" });
                    document.getElementById("min" + minute).scrollIntoView({ block: "center" });
                }}
            >
                {selectedTimeInBox}
            </Button>
            Uhr
            <div className="flex items-center ms-3 p-2 ">
                <div ref={timeSelectorBox} className="hidden absolute  p-2 border border-gray-300 rounded-lg shadow-lg flex-col gap-1 bg-slate-500">
                    <div className="flex h-[175px]">
                        <div className="flex flex-col overflow-y-scroll py-[75px]">
                            {[...Array(24).keys()].map((h) => (
                                <Button
                                    id={"h" + h}
                                    key={h}
                                    active={h == hour ? "true" : "false"}
                                    onClick={() => {
                                        document.getElementById("h" + h).scrollIntoView({ block: "center" });
                                        setHour(h);
                                    }}
                                >
                                    {h}
                                </Button>
                            ))}
                        </div>
                        <div className="flex flex-col overflow-y-scroll py-[75px]">
                            {[...Array(12).keys()].map((step) => {
                                let min = step * 5;
                                return (
                                    <Button
                                        id={"min" + min}
                                        key={min}
                                        active={min == minute ? "true" : "false"}
                                        onClick={() => {
                                            document.getElementById("min" + min).scrollIntoView({ block: "center" });
                                            setMinute(min);
                                        }}
                                    >
                                        {min.toString().padStart(2, "0")}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                timeSelectorBox.current.classList.toggle("hidden");
                                timeSelectorBox.current.classList.toggle("flex");
                                setSelectedTimeInBox(hour + ":" + minute.toString().padStart(2, "0"));
                                setSelectedTime({ hour: hour, minute: minute });
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

export default TimeViewSelector;
