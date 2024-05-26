function registerEvent(eventId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('You must be logged in to register for an event');
        window.location.href = 'login.html';
        return;
    }

    const eventTitle = document.getElementById(`eventTitle${eventId}`).textContent;
    const eventDate = document.getElementById(`eventDate${eventId}`).textContent;
    const eventLocation = document.getElementById(`eventLocation${eventId}`).textContent;

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push({
        username: currentUser.username,
        title: eventTitle,
        date: eventDate,
        location: eventLocation
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('You have registered for the event!');
}
