import React from "react";

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
}) {
    return (
        <>
            <div>
                <ul style={{ maxHeight: boxHight - 76 + "px" }} className="space-y-1 overflow-y-scroll">
                    {events.map((event, i) => (
                        <>
                            {(new Date(parseInt(events[i - 1 < 0 ? 0 : i - 1].start)).toLocaleString("de", { month: "long" }) !=
                                new Date(parseInt(event.start)).toLocaleString("de", { month: "long" }) ||
                                i == 0) && (
                                <div
                                    key={[
                                        String(new Date(parseInt(event.start)).getMonth()).padStart(2, "0"),
                                        new Date(parseInt(event.start)).getFullYear(),
                                    ].join("")}
                                    id={[
                                        String(new Date(parseInt(event.start)).getMonth()).padStart(2, "0"),
                                        new Date(parseInt(event.start)).getFullYear(),
                                    ].join("")}
                                    className="text-xl font-semibold"
                                >
                                    {new Date(parseInt(event.start)).toLocaleString("de", { month: "long" })}
                                </div>
                            )}
                            <li onClick={() => handleEventClick({ event })} key={event.id} className="p-1 border border-gray-300 rounded-lg shadow-md">
                                <div
                                    className={
                                        "border-2 hover:border-gray-700 rounded " +
                                        (event.id === selectedEvent?.id && " border-orange-500 hover:border-orange-700")
                                    }
                                >
                                    <div className="flex justify-between hover:bg-gray-100 px-2 rounded">
                                        <span className="font-semibold text-lg cursor-pointer">{event.title}</span>
                                    </div>
                                    <span className="text-gray-600 dark:text-gray-400 block">
                                        {formatDate(event.start)} {formatTime(event.start)}{" "}
                                        {event.end && `bis ${formatDate(event.end)} ${formatTime(event.end)}`}
                                    </span>
                                    <div className="relative w-full h-5 bg-red-200">
                                        <div style={{ width: testpercentage + "%" }} className="absolut inset-0 h-full bg-red-500"></div>

                                        <button
                                            onClick={() => {
                                                let newShow = eventTaskShow.map((e) => {
                                                    if (e.id === event.id) {
                                                        e.show = !e.show;
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
                                        {tasks
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
                                            ))}
                                    </div>
                                </div>
                            </li>
                        </>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default EventList;
