import React from "react";

function Overview({ selectedDate, setSelectedDate }) {
    return (
        <div>
            <div>Overview</div>
            {selectedDate}
        </div>
    );
}

export default Overview;
