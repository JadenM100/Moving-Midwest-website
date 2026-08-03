document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#delivery-form');
  const success = document.querySelector('#form-success');
  const reset = document.querySelector('#send-another');
  const error = document.querySelector('#form-error');
  const submitButton = form?.querySelector('button[type="submit"]');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    error.hidden = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending request...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree request failed');

      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (submissionError) {
      error.hidden = false;
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send My Delivery Request <span aria-hidden="true">&rarr;</span>';
    }
  });

  reset?.addEventListener('click', () => {
    form.reset();
    success.hidden = true;
    form.hidden = false;
    error.hidden = true;
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send My Delivery Request <span aria-hidden="true">&rarr;</span>';
    form.querySelector('input')?.focus();
  });
});
