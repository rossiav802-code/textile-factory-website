// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== CATALOG FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== STATS COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateCounters() {
  if (animated) return;
  animated = true;

  statNumbers.forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 50);

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 30);
  });
}

// Trigger on scroll
const statsSection = document.getElementById('stats');
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) animateCounters();
}, { threshold: 0.4 });

observer.observe(statsSection);

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const phone = document.getElementById('phone');
  const phoneError = document.getElementById('phoneError');

  // Name check
  if (name.value.trim().length < 2) {
    nameError.textContent = 'Введите ваше имя';
    valid = false;
  } else {
    nameError.textContent = '';
  }

  // Phone check
  const phoneRegex = /^\+?[\d\s\-]{7,15}$/;
  if (!phoneRegex.test(phone.value.trim())) {
    phoneError.textContent = 'Введите корректный номер телефона';
    valid = false;
  } else {
    phoneError.textContent = '';
  }

  if (valid) {
    successMsg.classList.add('show');
    contactForm.reset();
    setTimeout(() => successMsg.classList.remove('show'), 4000);
  }
});

// ===== MODAL =====
const modalOverlay = document.getElementById('modalOverlay');
const modalProduct = document.getElementById('modalProduct');

function openModal(productName) {
  modalProduct.textContent = 'Товар: ' + productName;
  modalOverlay.classList.add('open');
  document.getElementById('modalName').value = '';
  document.getElementById('modalPhone').value = '';
}

function closeModal() {
  modalOverlay.classList.remove('open');
}

function submitModal() {
  const name = document.getElementById('modalName').value.trim();
  const phone = document.getElementById('modalPhone').value.trim();

  if (!name || !phone) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  closeModal();
  alert('✅ Заявка принята! Мы свяжемся с вами в ближайшее время.');
}

// Close modal on overlay click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
