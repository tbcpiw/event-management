document.addEventListener('DOMContentLoaded', function() {
    const events = [
        { title: 'Concert by Artist', date: '2023-06-01', location: 'Main Square' },
        { title: 'City Marathon', date: '2023-06-10', location: 'Central Park' }
    ];

    const eventList = document.getElementById('eventList');

    events.forEach(event => {
        const eventItem = document.createElement('a');
        eventItem.className = 'list-group-item list-group-item-action';
        eventItem.href = `event.html?title=${encodeURIComponent(event.title)}&date=${event.date}&location=${event.location}`;
        eventItem.innerHTML = `<h5>${event.title}</h5><p>Date: ${event.date}</p><p>Location: ${event.location}</p>`;
        eventList.appendChild(eventItem);
    });function scrapeEvents() {
        var xhr = new XMLHttpRequest();
        var url = 'https://sxodim.com/almaty';
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                var parser = new DOMParser();
                var htmlDoc = parser.parseFromString(xhr.responseText, 'text/html');
                var eventCards = htmlDoc.querySelectorAll('.event-card');
                var eventsData = [];
                eventCards.forEach(function(card) {
                    var title = card.querySelector('.event-card__title').textContent.trim();
                    var date = card.querySelector('.event-card__date').textContent.trim();
                    var location = card.querySelector('.event-card__place').textContent.trim();
                    eventsData.push({
                        title: title,
                        date: date,
                        location: location
                    });
                });
                console.log(eventsData);
            } else {
                console.error('Failed to load page: ' + xhr.status);
            }
        };
        xhr.send();
    }
    scrapeEvents();
    
});
