
// ===== Countdown Timer =====
(function() {
    var totalSeconds = 3 * 3600 + 47 * 60;
    function updateTimer() {
        var hours = Math.floor(totalSeconds / 3600);
        var mins = Math.floor((totalSeconds % 3600) / 60);
        var secs = totalSeconds % 60;
        var h = String(hours).padStart(2, '0');
        var m = String(mins).padStart(2, '0');
        var s = String(secs).padStart(2, '0');
        // Hero timer
        var el;
        el = document.getElementById('hours1'); if (el) el.textContent = h;
        el = document.getElementById('mins1');  if (el) el.textContent = m;
        el = document.getElementById('secs1');  if (el) el.textContent = s;
        // Final CTA timer
        el = document.getElementById('hours2'); if (el) el.textContent = h;
        el = document.getElementById('mins2');  if (el) el.textContent = m;
        el = document.getElementById('secs2');  if (el) el.textContent = s;
        // Mini timer
        el = document.getElementById('hours_m'); if (el) el.textContent = h;
        el = document.getElementById('mins_m');  if (el) el.textContent = m;
        el = document.getElementById('secs_m');  if (el) el.textContent = s;
        if (totalSeconds > 0) {
            totalSeconds--;
            setTimeout(updateTimer, 1000);
        }
    }
    updateTimer();
})();
// ===== Top Bar Slider =====
(function() {
    var items = document.querySelectorAll('.top-bar-item');
    if (items.length === 0) return;
    var current = 0;
    setInterval(function() {
        items[current].classList.remove('active');
        current = (current + 1) % items.length;
        items[current].classList.add('active');
    }, 3000);
})();
// ===== Stock Countdown =====
(function() {
    var stock = 14;
    setInterval(function() {
        if (stock > 3) {
            stock--;
            var el1 = document.getElementById('stockCount1');
            var el2 = document.getElementById('stockCount2');
            if (el1) el1.textContent = stock;
            if (el2) el2.textContent = stock;
        }
    }, 40000);
})();
// ===== Sticky CTA =====
(function() {
    var sticky = document.getElementById('stickyCta');
    if (!sticky) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 600) {
            sticky.classList.add('visible');
        } else {
            sticky.classList.remove('visible');
        }
    }, { passive: true });
})();
// ===== Form Submission with CRM Integration =====
function handleFormSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var name = form.querySelector('input[name="name"]').value.trim();
    var phone = form.querySelector('input[name="phone"]').value.trim();
    if (!name || !phone) return;
    // CRM Integration - send lead data
    // Replace YOUR_CRM_ENDPOINT with actual CRM webhook URL
    var crmEndpoint = ''; // e.g., 'https://your-crm.com/api/leads'
    var leadData = {
        name: name,
        phone: phone,
        product: 'Держатель для телефона в авто PRO',
        price: '235000',
        source: 'landing-phone-holder',
        timestamp: new Date().toISOString(),
        page_url: window.location.href
    };
    if (crmEndpoint) {
        fetch(crmEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        }).catch(function() {
            // Silently fail - don't block user experience
        });
    }
    // Show success modal
    document.getElementById('successModal').classList.add('visible');
    form.reset();
}
// Attach submit handler to all order forms
document.querySelectorAll('.order-form').forEach(function(form) {
    form.addEventListener('submit', handleFormSubmit);
});
// ===== Close Modal =====
function closeModal() {
    document.getElementById('successModal').classList.remove('visible');
}
// Close modal on overlay click
document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});
// ===== FAQ Toggle =====
function toggleFaq(el) {
    var item = el.closest('.faq-item');
    if (!item) return;
    // Close all others
    document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
        if (openItem !== item) {
            openItem.classList.remove('open');
        }
    });
    item.classList.toggle('open');
}
// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});
// ===== Scroll Animations =====
(function() {
    var elements = document.querySelectorAll('.section, .cta-banner, .cta-inline');
    if (!elements.length) return;
    // Add animation class
    elements.forEach(function(el) {
        el.classList.add('animate-on-scroll');
    });
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    elements.forEach(function(el) {
        observer.observe(el);
    });
})();
// ===== Phone Input Formatting =====
document.querySelectorAll('input[type="tel"]').forEach(function(input) {
    input.addEventListener('input', function(e) {
        var value = e.target.value.replace(/\D/g, '');
        if (value.length > 0 && !value.startsWith('998')) {
            if (value.startsWith('8')) {
                value = '998' + value.substring(1);
            } else if (!value.startsWith('9')) {
                value = '998' + value;
            }
        }
        if (value.length > 12) {
            value = value.substring(0, 12);
        }
        // Format: +998 XX XXX XX XX
        var formatted = '';
        if (value.length > 0) formatted = '+' + value.substring(0, 3);
        if (value.length > 3) formatted += ' ' + value.substring(3, 5);
        if (value.length > 5) formatted += ' ' + value.substring(5, 8);
        if (value.length > 8) formatted += ' ' + value.substring(8, 10);
        if (value.length > 10) formatted += ' ' + value.substring(10, 12);
        e.target.value = formatted;
    });
    input.addEventListener('focus', function(e) {
        if (!e.target.value) {
            e.target.value = '+998 ';
        }
    });
});
