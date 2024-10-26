import React, { useEffect, useRef } from "react";

function EventList({
    testpercentage,
    events,
    handleEventClick,
    selectedEvent,
    formatDate,
    formatTime,
    eventTaskShow,
    setEventTaskShow,
    tasks,
    toggleTaskSelection,
    isTaskSelected,
    boxHight,
    selectedDate,
}) {
    const scrollContainer = useRef(null);
    const scrollContainerInner = useRef(null);

    useEffect(() => {
        if (selectedEvent && scrollContainer) {
            const element = document.getElementById(selectedEvent?.id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [selectedEvent]);
    useEffect(() => {
        console.log("selectedDate", selectedDate);
        if (selectedDate) {
            const element = document.getElementById(
                [String(new Date(parseInt(selectedDate ?? null)).getMonth()).padStart(2, "0"), new Date(parseInt(selectedDate)).getFullYear()].join("")
            );
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [selectedDate]);
    return (
        <div ref={scrollContainer} style={{ maxHeight: boxHight - 76 + "px" }} className="overflow-y-scroll">
            <ul className="flex flex-col gap-1" style={{ paddingBottom: window.innerHeight - 300 + "px" }}>
                {events.map((event, i) => (
                    <React.Fragment key={event.id}>
                        {(new Date(parseInt(events[i - 1 < 0 ? 0 : i - 1].start)).toLocaleString("de", { month: "long" }) !=
                            new Date(parseInt(event.start)).toLocaleString("de", { month: "long" }) ||
                            i == 0) && (
                            <li
                                key={[String(new Date(parseInt(event.start)).getMonth()).padStart(2, "0"), new Date(parseInt(event.start)).getFullYear()].join(
                                    ""
                                )}
                                id={[String(new Date(parseInt(event.start)).getMonth()).padStart(2, "0"), new Date(parseInt(event.start)).getFullYear()].join(
                                    ""
                                )}
                                className="text-xl font-semibold sticky top-0 bg-[#d0cbbb] p-1 rounded"
                                style={{ zIndex: 1 }}
                            >
                                {new Date(parseInt(event.start)).toLocaleString("de", { month: "long", year: "numeric" })}
                            </li>
                        )}
                        <li id={event.id} onClick={() => handleEventClick({ event })} className="p-1 border border-gray-300 rounded-lg shadow-md">
                            <div
                                className={
                                    "border-2 hover:border-gray-700 rounded " + (event.id === selectedEvent?.id && " border-orange-500 hover:border-orange-700")
                                }
                            >
                                <div className="flex justify-between px-2 rounded">
                                    <span className="font-semibold text-lg cursor-pointer">{event.title}</span>
                                </div>
                                <span className="text-gray-600 dark:text-gray-400 block">
                                    {formatDate(event.start)} {formatTime(event.start)} {event.end && `bis ${formatDate(event.end)} ${formatTime(event.end)}`}
                                </span>
                                <div className="relative w-full h-5 bg-red-200">
                                    <div style={{ width: testpercentage + "%" }} className="absolut inset-0 h-full bg-red-500"></div>

                                    <button
                                        onClick={() => {
                                            let newShow = eventTaskShow.map((e) => {
                                                if (e.id === event.id) {
                                                    e.show = !e.show;
                                                } else {
                                                    e.show = false;
                                                }

                                                return e;
                                            });
                                            setEventTaskShow(newShow);
                                        }}
                                        className="absolute inset-0 ml-2"
                                    >
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${
                                                eventTaskShow.find((e) => e.id === event.id)?.show ? "rotate-180" : "rotate-0"
                                            }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
                                        </svg>
                                    </button>
                                </div>
                                <div className={eventTaskShow.length > 0 && eventTaskShow.filter((ets) => ets.id === event.id)[0]?.show ? " " : " hidden "}>
                                    <div
                                        className="cursor-pointer hover:bg-orange-500 hover:text-white"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log("Task 1");
                                        }}
                                    >
                                        Test 1
                                    </div>
                                    <div
                                        className="cursor-pointer hover:bg-orange-500 hover:text-white"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log("Task 2");
                                        }}
                                    >
                                        Test 2
                                    </div>
                                    <div
                                        className="cursor-pointer hover:bg-orange-500 hover:text-white"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            console.log("Task 3");
                                        }}
                                    >
                                        Test 3
                                    </div>
                                    {/* {tasks
                                        .filter((t) => t.id_event === event.id)
                                        .map((t) => (
                                            <>
                                                <div
                                                    key={t.id}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleTaskSelection(t);
                                                    }}
                                                    style={{
                                                        cursor: "pointer",
                                                        color: isTaskSelected(t) ? "green" : "gray-600 dark:gray-400", // Ändere die Farbe, wenn markiert
                                                    }}
                                                    onMouseEnter={(e) => (e.target.style.color = "blue")}
                                                    onMouseLeave={(e) => (e.target.style.color = isTaskSelected(t) ? "green" : "gray-600 dark:gray-400")}
                                                >
                                                    {t.title}
                                                </div>
                                            </>
                                        ))} */}
                                </div>
                            </div>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
