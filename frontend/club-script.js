// Smooth Scroll for navigation (if you have links to sections)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Play/pause video background control for the header (optional)
const video = document.querySelector('.background-video');

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        video.pause();
    } else {
        video.play();
    }
});

// Hover effect for club cards (optional, adding additional interactivity)
const clubCards = document.querySelectorAll('.club-card');

clubCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.overlay').style.opacity = 1;
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('.overlay').style.opacity = 0;
    });
});
