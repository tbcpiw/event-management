document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('You must be logged in to view your bookings');
        window.location.href = 'login.html';
        return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const userBookings = bookings.filter(booking => booking.username === currentUser.username);

    const bookingList = document.getElementById('bookingList');

    if (userBookings.length === 0) {
        const noBookingMessage = document.createElement('div');
        noBookingMessage.textContent = 'You have no bookings.';
        bookingList.appendChild(noBookingMessage);
    } else {
        userBookings.forEach(booking => {
            const bookingItem = document.createElement('div');
            bookingItem.className = 'list-group-item';
            bookingItem.innerHTML = `<h5>${booking.title}</h5><p>Date: ${booking.date}</p><p>Location: ${booking.location}</p>`;
            bookingList.appendChild(bookingItem);
        });
    }
});
