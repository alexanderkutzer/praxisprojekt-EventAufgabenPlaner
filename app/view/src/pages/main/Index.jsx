import React, { useState } from "react";
import Calendar from "../../Calendar";
import Button from "../../components/Button";

function PageMain() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([
    { title: "Event 1", start: "2024-10-14", extendedProps: { description: "Description for Event 1" } },
    { title: "Event 2", start: "2024-10-15", extendedProps: { description: "Description for Event 2" } },
    { title: "Event 3", start: "2024-10-20", extendedProps: { description: "Description for Event 3" } },
  ]);
  const [activeContent, setActiveContent] = useState('AddEvent'); // Initial content is set to AddEvent
  const [inputValues, setInputValues] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleEventClick = (info) => {
    setSelectedEvent({
      title: info.event.title,
      date: info.event.startStr,
      description: info.event.extendedProps.description,
    });
    setActiveContent('Details'); // Switch to details view when an event is clicked
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const switchContent = (content) => {
    setActiveContent(content);
    if (content === 'AddEvent') {
      setSelectedEvent(null); // Clear selected event when switching to Add Event
      setInputValues({ title: '', startDate: '', endDate: '', description: '' }); // Reset all input fields
      setErrorMessage(''); // Clear error message
    }
  };

  const createEvent = () => {
    // Validation: Check if title and start date are provided
    if (!inputValues.title || !inputValues.startDate) {
      setErrorMessage('Bitte Titel und Startdatum eingeben.');
      return;
    }

    const newEvent = {
      title: inputValues.title,
      start: inputValues.startDate,
      extendedProps: { 
        description: inputValues.description,
        end: inputValues.endDate || "" 
      },
    };
    setEvents([...events, newEvent]);
    switchContent('Details'); // Optional: switch to Details view after adding
  };

  return (
    <>
      <div>
        <Button onClick={() => switchContent('AddEvent')}>Add Event</Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start w-full mt-8">
        <div className="w-full sm:w-1/2 max-w-[50%]">
          <Calendar
            events={events}
            onEventClick={handleEventClick}
          />
        </div>

        <div className="w-full sm:w-1/2 max-w-[50%] p-4">
          {selectedEvent ? (
            <div>
              <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
              <p>Datum: {selectedEvent.date}</p>
              <p>{selectedEvent.description}</p>
            </div>
          ) : (
            <p>Event auswählen, um Details anzuzeigen.</p>
          )}

          <div className="mt-6">
            {activeContent === 'AddEvent' && (
              <div className="flex flex-col space-y-4">
                <h1 className="text-2xl font-semibold">Neues Event hinzufügen</h1>
                <input 
                  type="text" 
                  name="title"
                  value={inputValues.title} 
                  onChange={handleInputChange} 
                  placeholder="Event-Titel eingeben"
                  className="p-2 border rounded"
                />
                <p className="mt-3">Eventbeginn</p>
                <input 
                  type="date" 
                  name="startDate"
                  value={inputValues.startDate} 
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <p className="mt-3">Event Ende (Angabe nur notwendig, wenn das Event mehrtägig ist)</p>
                <input 
                  type="date" 
                  name="endDate"
                  value={inputValues.endDate} 
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                />
                <p className="mt-3">Details zu deinem Event</p>
                <input 
                  type="text" 
                  name="description"
                  value={inputValues.description} 
                  onChange={handleInputChange} 
                  placeholder="Details"
                  className="p-2 border rounded"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button onClick={createEvent}>Event erstellen</Button>
              </div>
            )}

            {activeContent === 'Bearbeiten' && (
              <div>
                <h1>Event bearbeiten</h1>
                <p>Bearbeitungsinhalt...</p>
              </div>
            )}

            {activeContent === 'Details' && (
              <div>
                <h1>Event Details</h1>
                <p>Weitere Details...</p>
                <Button onClick={() => switchContent('Bearbeiten')}>Bearbeiten</Button>
              </div>
            )}  
          </div>
        </div>
      </div>
    </>
  );
}

export default PageMain;