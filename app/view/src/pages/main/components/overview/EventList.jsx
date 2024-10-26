import React from "react";

function EventList({
    testpercentage,
    events,
    handleEventClick,
    formatDate,
    formatTime,
    eventTaskShow,
    setEventTaskShow,
    tasks,
    toggleTaskSelection,
    isTaskSelected,
}) {
    return (
        <>
            <div className="dark:text-[#D5CDB8]">
                <h1 className="text-xl flex-col font-bold">Eventübersicht</h1>
                <p className="text-sm">Event auswählen, um Details anzuzeigen.</p>
                <p className="text-lg ">Demnächst:</p>
                <ul className="space-y-4 overflow-y-scroll">
                    {events.map((event) => (
                        <li key={event.id} className="p-4 border border-gray-300 dark:border-[#D5CDB8] rounded-lg shadow-md">
                            <div onClick={() => handleEventClick({ event })} className="flex justify-between px-2 rounded">
                                <span className="font-semibold text-lg cursor-pointer">{event.title}</span>
                            </div>
                            <span className="text-gray-600 dark:text-gray-400 block">
                                {formatDate(event.start)} {formatTime(event.start)} {event.end && `bis ${formatDate(event.end)} ${formatTime(event.end)}`}
                            </span>
                            <div className="w-full h-1 bg-red-200">
                                <div style={{ width: testpercentage + "%" }} className="h-1 bg-red-500"></div>
                            </div>
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
                                className="ml-2"
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

                            <div className={eventTaskShow.length > 0 && eventTaskShow.filter((ets) => ets.id === event.id)[0]?.show ? " " : " hidden "}>
                                {tasks
                                    .filter((t) => t.id_event === event.id)
                                    .map((t) => (
                                        <div
                                            key={t.id}
                                            onClick={() => toggleTaskSelection(t)} // Beim Klick Task umschalten
                                            style={{
                                                cursor: "pointer",
                                                color: isTaskSelected(t) ? "green" : "gray-600 dark:gray-400", // Ändere die Farbe, wenn markiert
                                            }}
                                            onMouseEnter={(e) => (e.target.style.color = "blue")}
                                            onMouseLeave={(e) => (e.target.style.color = isTaskSelected(t) ? "green" : "gray-600 dark:gray-400")}
                                        >
                                            {t.title}
                                        </div>
                                    ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default EventList;
