// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));

// Close mobile nav when a link is clicked
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);


// Smooth active link highlight
const sections = document.querySelectorAll('section[id], header[id]');
const navAs    = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAs.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Form submission feedback
const form = document.querySelector('.reg-form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      form.innerHTML = `
        <div style="text-align:center;padding:3rem 1rem;">
          <div style="font-size:3rem;margin-bottom:1rem;">&#10003;</div>
          <h3 style="color:#ffc000;font-size:1.5rem;margin-bottom:.75rem;">You're registered!</h3>
          <p style="color:rgba(255,255,255,.75);">
            Thank you for signing up for CMMC Day. A confirmation will be sent to your email shortly.
          </p>
        </div>`;
    } else {
      throw new Error('Server error');
    }
  } catch {
    btn.textContent = 'Submit Registration';
    btn.disabled = false;
    alert('Something went wrong. Please try again or contact us directly.');
  }
});
