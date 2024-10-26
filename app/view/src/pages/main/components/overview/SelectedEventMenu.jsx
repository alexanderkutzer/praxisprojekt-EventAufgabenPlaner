import React from "react";
import Button from "../../../../components/Button";

function SelectedEventMenu({ switchContent, selectedEvent, activeContent }) {
    return (
        <>
            <div className="flex w-full justify-between">
                <Button
                    active={activeContent === "AddEvent" ? "true" : "false"}
                    onClick={() => switchContent(activeContent === "AddEvent" ? "EventOverview" : "AddEvent")}
                >
                    Neues Event
                </Button>
                <Button
                    disabled={selectedEvent == null}
                    active={activeContent === "AddEvent" ? "true" : "false"}
                    onClick={() => switchContent(activeContent === "AddEvent" ? "EventOverview" : "AddEvent")}
                >
                    Event Bearbeiten
                </Button>
                <Button
                    active={activeContent === "AddTask" ? "true" : "false"}
                    onClick={() => switchContent(activeContent === "AddTask" ? "EventOverview" : "AddTask")}
                >
                    Neue Aufgabe
                </Button>
            </div>
        </>
    );
}

export default SelectedEventMenu;
