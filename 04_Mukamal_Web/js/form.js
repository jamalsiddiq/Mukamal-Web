document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Extract Data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            console.log("Lead Captured:", data);

            // Mock Analytics Tracking Event (e.g. Google Analytics / Meta Pixel)
            if (typeof gtag === 'function') {
                gtag('event', 'generate_lead', {
                    'event_category': 'engagement',
                    'event_label': data.service || 'consultation'
                });
            }
            console.log("Analytics Event Fired: generate_lead");

            // UI Feedback
            const status = document.getElementById('form-status');
            status.textContent = '✓ Message sent! We\'ll be in touch within 24 hours.';
            status.className = 'success';
            
            form.reset();
            setTimeout(() => { 
                status.style.display = 'none'; 
                status.className = ''; 
            }, 5000);
        });
    }

    // Optional Checkbox for Case Study Gating
    const downloadBtns = document.querySelectorAll('.btn-download-gate');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = prompt("Enter your work email to download the full case study:");
            if (email && email.includes('@')) {
                console.log("Lead Captured via Gate:", email);
                alert("Case study sent to " + email);
            }
        });
    });
});
