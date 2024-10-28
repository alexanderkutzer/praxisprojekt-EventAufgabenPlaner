import React from "react";
import Button from "../../../../components/Button";

function SelectedTaskMenu({ activeContent, switchContent, selectedEvent, setSelectedEvent, events, tasks }) {
    return (
        <>
            <div className="flex w-full justify-between">
                <Button
                    active={activeContent === "EditTask" ? "true" : "false"}
                    onClick={() => {
                        setSelectedEvent(null);
                        switchContent(activeContent === "EditTask" ? "EventOverview" : "EditTask");
                    }}
                    activeContent={activeContent}
                >
                    Edit Aufgabe
                </Button>
                <Button
                    active={activeContent === "AddTask" ? "true" : "false"}
                    onClick={() => switchContent(activeContent === "AddTask" ? "EventOverview" : "AddTask")}
                >
                    + Aufgabe
                </Button>
            </div>
        </>
    );
}

export default SelectedTaskMenu;
