import React from "react";
import Button from "../../../../components/Button";

function SelectedEventMenu({ switchContent, selectedEvent, setSelectedEvent, activeContent, events, tasks }) {
    return (
        <>
            <div className="flex w-full justify-between">
                <Button
                    active={activeContent === "AddEvent" ? "true" : "false"}
                    onClick={() => {
                        setSelectedEvent(null);
                        switchContent(activeContent === "AddEvent" ? "EventOverview" : "AddEvent");
                    }}
                >
                    + Event
                </Button>
                <Button
                    disabled={selectedEvent == null}
                    active={activeContent === "EditEvent" ? "true" : "false"}
                    onClick={() => switchContent(activeContent === "EditEvent" ? "EventOverview" : "EditEvent")}
                >
                    Edit Event
                </Button>
                {events.length > 0 && (
                    <Button
                        active={activeContent === "AddTask" ? "true" : "false"}
                        onClick={() => switchContent(activeContent === "AddTask" ? "EventOverview" : "AddTask")}
                    >
                        + Aufgabe
                    </Button>
                )}
            </div>
        </>
    );
}

export default SelectedEventMenu;
