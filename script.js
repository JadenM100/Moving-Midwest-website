document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#delivery-form');
  const success = document.querySelector('#form-success');
  const reset = document.querySelector('#send-another');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // When a Formspree endpoint is added to `action`, replace this block with a fetch POST if needed.
    form.hidden = true;
    success.hidden = false;
    success.focus?.();
  });

  reset?.addEventListener('click', () => {
    form.reset();
    success.hidden = true;
    form.hidden = false;
    form.querySelector('input')?.focus();
  });
});
