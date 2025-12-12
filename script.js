const bikes = [
  {
    name: 'Apex Road Pro',
    category: 'road',
    price: 4200,
    summary: 'Carbon endurance frame, Ultegra Di2, tubeless carbon wheels.',
    image: 'image/bike1.jpg',
  },
  {
    name: 'Summit Gravel X',
    category: 'gravel',
    price: 3200,
    summary: 'Aluminum, carbon fork, SRAM Rival 1x, 45c tubeless tires.',
    image: 'image/bike2.jpg',
  },
  {
    name: 'Ridge Trail 9',
    category: 'mountain',
    price: 2800,
    summary: '120mm travel, dropper post, Shimano SLX 12-speed.',
    image: 'image/bike3.jpg',
  },
  {
    name: 'Volt City E+',
    category: 'e-bike',
    price: 3600,
    summary: 'Class 1 pedal assist, 60-mile range, hydraulic brakes.',
    image: 'image/bike4.jpg',
  },
  {
    name: 'Aero Race SL',
    category: 'road',
    price: 5200,
    summary: 'Aero carbon frame, deep carbon wheels, Dura-Ace mechanical.',
    image: 'image/bike5.jpg',
  },
  {
    name: 'Pathfinder EQ',
    category: 'e-bike',
    price: 2600,
    summary: 'Commuter e-bike with fenders, rack, and integrated lights.',
    image: 'image/bike6.jpg',
  },
  {
    name: 'Summit Gravel Carbon',
    category: 'gravel',
    price: 4100,
    summary: 'Carbon frame, GRX Di2, 47c clearance, dropper-ready.',
    image: 'image/bike7.jpg',
  },
  {
    name: 'Trail Enduro E',
    category: 'mountain',
    price: 4800,
    summary: 'E-assist enduro with 160mm travel, mixed wheel setup.',
    image: 'image/bike8.jpg',
  },
  {
    name: 'City Step-Thru E',
    category: 'e-bike',
    price: 2400,
    summary: 'Step-thru comfort, upright fit, lights and rack included.',
    image: 'image/bike9.jpg',
  },
];

const bikeGrid = document.querySelector('#bikeGrid');
const categoryFilter = document.querySelector('#categoryFilter');
const priceFilter = document.querySelector('#priceFilter');
const priceValue = document.querySelector('#priceValue');
const form = document.querySelector('#bookingForm');
const formStatus = document.querySelector('#formStatus');
const slider = document.querySelector('#testimonialSlider');
const sliderControls = document.querySelectorAll('.slider__control');
const scrollCtas = document.querySelectorAll('.scroll-cta');
const detailTriggers = document.querySelectorAll('.detail-trigger');

function formatPrice(value) {
  return `₱${value.toLocaleString('en-PH')}`;
}

function renderBikes() {
  const category = categoryFilter.value;
  const maxPrice = Number(priceFilter.value);
  const filtered = bikes.filter(
    (bike) => (category === 'all' || bike.category === category) && bike.price <= maxPrice,
  );

  bikeGrid.innerHTML = filtered
    .map(
      (bike) => `
        <article class="card bike" data-category="${bike.category}">
          <div class="thumb">
            <img src="${bike.image}" alt="${bike.name}">
          </div>
          <p class="eyebrow">${bike.category}</p>
          <h3>${bike.name}</h3>
          <p>${bike.summary}</p>
          <p class="price">${formatPrice(bike.price)}</p>
          <button class="btn primary scroll-cta" data-target="#contact">Book a test ride</button>
        </article>
      `,
    )
    .join('');

  // Rebind scroll buttons created dynamically.
  bikeGrid.querySelectorAll('.scroll-cta').forEach((btn) => {
    btn.addEventListener('click', handleScroll);
  });
}

function handleScroll(event) {
  const targetSelector = event.currentTarget.dataset.target;
  const target = document.querySelector(targetSelector);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updatePriceLabel() {
  priceValue.textContent = formatPrice(Number(priceFilter.value));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (!data.name || !data.email || !data.type || !data.date) {
    formStatus.textContent = 'Please fill in the required fields.';
    formStatus.style.color = '#b91c1c';
    return;
  }

  formStatus.textContent = 'Sending...';
  formStatus.style.color = '#475569';

  // Simulate a network request.
  setTimeout(() => {
    formStatus.textContent = 'Thanks! We received your request and will confirm shortly.';
    formStatus.style.color = '#15803d';
    form.reset();
  }, 700);
}

function initSlider() {
  let index = 0;
  const slides = Array.from(slider.querySelectorAll('.testimonial'));
  if (!slides.length) return;

  function setActive(newIndex) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === newIndex);
    });
  }

  sliderControls.forEach((btn) => {
    btn.addEventListener('click', () => {
      index = btn.dataset.dir === 'next' ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
      setActive(index);
    });
  });
}

function initScrollCtas() {
  scrollCtas.forEach((btn) => btn.addEventListener('click', handleScroll));
}

function initDetailTriggers() {
  detailTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.add('is-detail-active');
      setTimeout(() => btn.classList.remove('is-detail-active'), 1200);
    });
  });
}

renderBikes();
updatePriceLabel();
categoryFilter.addEventListener('change', renderBikes);
priceFilter.addEventListener('input', () => {
  updatePriceLabel();
  renderBikes();
});
form.addEventListener('submit', handleFormSubmit);
initSlider();
initScrollCtas();
initDetailTriggers();

