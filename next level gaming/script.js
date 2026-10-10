const packagePrices = {
  casual: 150,
  competitive: 220,
  premium: 300,
};

const discountRules = [
  { maxPlayers: 4, rate: 0.05 },
  { maxPlayers: 9, rate: 0.10 },
  { maxPlayers: Infinity, rate: 0.15 },
];

function getDiscountRate(playerCount) {
  if (playerCount >= 3 && playerCount <= 4) return 0.05;
  if (playerCount >= 5 && playerCount <= 9) return 0.10;
  if (playerCount >= 10) return 0.15;
  return 0;
}

function calculateCost() {
  const packageSelect = document.getElementById('package');
  const playersInput = document.getElementById('players');
  const hoursInput = document.getElementById('hours');
  const errorBox = document.getElementById('calc-error');

  if (!packageSelect || !playersInput || !hoursInput || !errorBox) return;

  const selectedPackage = packageSelect.value;
  const players = Number(playersInput.value);
  const hours = Number(hoursInput.value);

  if (!selectedPackage) {
    errorBox.textContent = 'Please select a gaming package.';
    errorBox.classList.add('visible');
    return;
  }

  if (!Number.isInteger(players) || players < 1) {
    errorBox.textContent = 'Please enter a valid number of players (minimum 1).';
    errorBox.classList.add('visible');
    return;
  }

  if (!Number.isFinite(hours) || hours <= 0) {
    errorBox.textContent = 'Please enter a valid number of hours (minimum 1).';
    errorBox.classList.add('visible');
    return;
  }

  errorBox.classList.remove('visible');

  const unitPrice = packagePrices[selectedPackage] || 0;
  const subtotal = unitPrice * players * hours;
  const discountRate = getDiscountRate(players);
  const discount = subtotal * discountRate;
  const vat = (subtotal - discount) * 0.15;
  const total = subtotal - discount + vat;

  const update = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = 'R ' + value.toFixed(2);
  };

  update('subtotal', subtotal);
  update('discount', discount);
  update('vat', vat);
  update('total', total);
}

function validateContactForm() {
  const form = document.getElementById('contact-form');
  const errorBox = document.getElementById('contact-error');

  if (!form || !errorBox) return true;

  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const type = form.querySelector('[name="type"]').value;
  const message = form.querySelector('[name="message"]').value.trim();

  if (!name || !email || !type || !message) {
    errorBox.textContent = 'Please complete all required fields before submitting your enquiry.';
    errorBox.classList.add('visible');
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorBox.textContent = 'Please enter a valid email address.';
    errorBox.classList.add('visible');
    return false;
  }

  errorBox.classList.remove('visible');
  return true;
}

function initCalculator() {
  const calculatorForm = document.getElementById('fee-calculator');
  const calculateButton = document.getElementById('calculate-btn');

  if (calculatorForm && calculateButton) {
    calculateButton.addEventListener('click', calculateCost);
    calculatorForm.addEventListener('submit', (event) => {
      event.preventDefault();
      calculateCost();
    });
  }
}

function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validateContactForm()) {
      const successBox = document.getElementById('contact-success');
      if (successBox) {
        successBox.classList.add('visible');
      }
      contactForm.reset();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initContactForm();
});
