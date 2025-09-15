// Smooth Scroll for internal navigation (if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive hover effect on gallery images
const galleryImages = document.querySelectorAll('.gallery-img');

galleryImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'transform 0.3s ease';
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Achievements section interaction: Highlight each achievement on hover
const achievementItems = document.querySelectorAll('.achievements-list li');

achievementItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.color = '#C6AC8F'; // Change the color on hover
        item.style.fontWeight = 'bold';
    });

    item.addEventListener('mouseleave', () => {
        item.style.color = '#EAE0D5'; // Reset the color
        item.style.fontWeight = 'normal';
    });
});

// Optional: Auto-play animation for gallery images (carousel effect)
let currentIndex = 0;
const totalImages = galleryImages.length;

setInterval(() => {
    galleryImages[currentIndex].style.transform = 'scale(1)'; // Reset current image
    currentIndex = (currentIndex + 1) % totalImages;
    galleryImages[currentIndex].style.transform = 'scale(1.1)'; // Scale the next image
}, 2000); // Change image every 2 seconds
