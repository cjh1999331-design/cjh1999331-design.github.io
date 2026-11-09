'use strict';

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
const fields = Array.from(form.querySelectorAll('input, textarea'));

// Keep native constraints as a fallback; show accessible inline errors with JS.
form.noValidate = true;
function validate(field) {
  let error = '';
  if (!field.value.trim()) {
    error = { name: 'Please enter your name.', email: 'Please enter your email address.', message: 'Please enter a message.' }[field.name];
  } else if (field.validity.typeMismatch) {
    error = 'Please enter a valid email address, such as you@example.com.';
  } else if (field.validity.tooLong) {
    error = `Please use no more than ${field.maxLength} characters.`;
  }
  document.getElementById(`${field.id}-error`).textContent = error;
  field.setAttribute('aria-invalid', String(Boolean(error)));
  return !error;
}

fields.forEach((field) => {
  field.addEventListener('blur', () => validate(field));
  field.addEventListener('input', () => {
    status.textContent = '';
    if (field.getAttribute('aria-invalid') === 'true') validate(field);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  const results = fields.map(validate);
  const firstInvalid = results.indexOf(false);
  if (firstInvalid !== -1) {
    fields[firstInvalid].focus();
    return;
  }
  status.textContent = 'Thanks for saying hello! Your demo message is valid. Nothing has been sent.';
  form.reset();
  status.focus();
});

document.querySelector('#year').textContent = new Date().getFullYear();
