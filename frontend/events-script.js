document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// JS for any future interactivity can go here
//document.querySelectorAll('.ticket-status').forEach(btn => {
   // btn.addEventListener('click', () => {
       // alert('Bookings are open!');
   // });
//});
document.addEventListener('DOMContentLoaded', function () {
    // Event details (can be fetched from a backend in real apps)
    const events = [
        {
            id: 1,
            title: 'TED Talk',
            date: '2024-03-30', // Format: YYYY-MM-DD
            status: 'closed', // 'open' or 'closed'
        },
        {
            id: 2,
            title: 'Sonic Showdown: Battle of the Bands',
            date: '2024-03-29', // Format: YYYY-MM-DD
            status: 'closed', // 'open' or 'closed'
        },
    ];

    // Loop through all events and update the status
    events.forEach(event => {
        const eventCard = document.querySelector(`.event-card[data-event-id="${event.id}"]`);
        const ticketButton = eventCard.querySelector('.ticket-status');
        
        // Check if the event ticket is open or closed based on the current date
        const eventDate = new Date(event.date);
        const currentDate = new Date();

        if (eventDate > currentDate) {
            // Event date is in the future, so tickets are open
            event.status = 'open';
            ticketButton.textContent = 'Buy Tickets';
            ticketButton.classList.remove('closed');
            ticketButton.classList.add('open');
        } else {
            // Event date is in the past, so tickets are closed
            event.status = 'closed';
            ticketButton.textContent = 'Ticketing Closed';
            ticketButton.classList.remove('open');
            ticketButton.classList.add('closed');
        }
    });
});
