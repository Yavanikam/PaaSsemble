document.addEventListener('DOMContentLoaded', function () {
    const eventsContainer = document.getElementById('eventsContainer');


    // Create event cards and add them to the container
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-date">
                <span>${event.date.split(' ')[0]}</span>
                <span>${event.date.split(' ')[1]}</span>
            </div>
            <img src="${event.image}" alt="Event Image">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="event-tags">
                ${event.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <p class="prize-info">${event.prize}</p>
            <div class="button-container">
                <button class="ticket-status"><a href="register.html">REGISTER</a></button>
                <button class="details-button"><a href="event-details.html">EVENT DETAILS</a></button>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
});
