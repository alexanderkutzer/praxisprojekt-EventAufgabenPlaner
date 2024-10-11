let events = [];

export function getAllEventsService() {
    return events;
}
export function getEventByIdService(id) {
    return events.find((event) => event.id === id);
}
export function createEventService(newEvent) {
    newEvent.id = crypto.randomUUID();
    events.push(newEvent);
    return { create: true, event: newEvent };
}
export function updateEventService(updateEvent) {
    const index = events.findIndex((event) => event.id === updateEvent.id);
    events[index] = updateEvent;
    return { update: true, event: updateEvent };
}
export function deleteEventService(deleteEvent) {
    events = events.filter((event) => event.id !== deleteEvent.id);
    return { delete: true, event: deleteEvent };
}
