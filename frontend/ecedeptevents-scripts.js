const eventContainer = document.getElementById('cse-events');
let loading = false;
let currentPage = 0;
const eventsPerPage = 2;

// Sample data to simulate dynamically loaded content
const events = [
  {
    title: 'Advanced ECE Seminar',
    description: 'Explore cutting-edge topics in Electronic and Communication Engineering.',
    img: 'https://via.placeholder.com/800x400',
    contact: '+1 234 567 891'
  },
  {
    title: 'ECE Hackathon',
    description: 'Join the ECE hackathon and compete with the brightest minds in the field.',
    img: 'https://via.placeholder.com/800x400',
    contact: '+1 234 567 892'
  },
  // Add more event data as needed
];

function loadMoreEvents() {
  if (loading) return; // Prevent multiple simultaneous loads
  loading = true;

  const loader = document.createElement('div');
  loader.className = 'loader';
  eventContainer.appendChild(loader);

  const startIndex = currentPage * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const pageEvents = events.slice(startIndex, endIndex);

  setTimeout(() => {
    pageEvents.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'cse-info bg-[#eae0d5] shadow-lg rounded-lg p-8 text-[#0a0908] max-w-4xl mt-10';
      eventDiv.innerHTML = `
        <img src="${event.img}" alt="${event.title}" class="w-full h-auto mb-6">
        <h2 class="text-3xl font-semibold mb-4">${event.title}</h2>
        <p class="mb-4 text-[#5e503f]">${event.description}</p>
        <p class="font-bold text-lg">Contact: ${event.contact}</p>
      `;
      eventContainer.appendChild(eventDiv);
    });
    loader.remove();
    loading = false;
    currentPage++;
  }, 1000); // Simulate loading delay
}

// Infinite scroll logic
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
    if (currentPage * eventsPerPage < events.length) {
      loadMoreEvents();
    }
  }
});

loadMoreEvents();document.addEventListener('DOMContentLoaded', function() {
    const eventContainer = document.getElementById('cse-events');
    let loading = false;
  
    // Sample data to simulate dynamically loaded content
    const events = [
      {
        title: 'Advanced ECE Seminar',
        description: 'Explore cutting-edge topics in Electronic and Communication Engineering.',
        img: 'https://via.placeholder.com/800x400',
        contact: '+1 234 567 891'
      },
      {
        title: 'ECE Hackathon',
        description: 'Join the ECE hackathon and compete with the brightest minds in the field.',
        img: 'https://via.placeholder.com/800x400',
        contact: '+1 234 567 892'
      },
      // Add more event data as needed
    ];
  
    function loadMoreEvents() {
      if (loading) return; // Prevent multiple simultaneous loads
      loading = true;
  
      const loader = document.createElement('div');
      loader.className = 'loader';
      eventContainer.appendChild(loader);
  
      setTimeout(() => {
        events.forEach(event => {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'cse-info bg-[#eae0d5] shadow-lg rounded-lg p-8 text-[#0a0908] max-w-4xl mt-10';
          eventDiv.innerHTML = `
            <img src="${event.img}" alt="${event.title}" class="w-full h-auto mb-6">
            <h2 class="text-3xl font-semibold mb-4">${event.title}</h2>
            <p class="mb-4 text-[#5e503f]">${event.description}</p>
            <p class="font-bold text-lg">Contact: ${event.contact}</p>
          `;
          eventContainer.appendChild(eventDiv);
        });
        loader.remove();
        loading = false;
      }, 1000); // Simulate loading delay
    }
  
    // Infinite scroll logic
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        loadMoreEvents();
      }
    });
  });
  