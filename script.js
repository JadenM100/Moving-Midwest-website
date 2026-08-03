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

      const result = await response.json();
      if (!response.ok || !result.ok) {
        const message = result.errors?.map((item) => item.message).join(' ') || 'Formspree did not accept this request.';
        throw new Error(message);
      }

      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (submissionError) {
      error.hidden = false;
      error.textContent = submissionError.message || 'We couldn’t send your request. Please call us at (502) 507-0741.';
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
