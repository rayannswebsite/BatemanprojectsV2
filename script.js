// Rayne Enterprises — shared behaviour for every page

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('nav');
    const hasHero = document.getElementById('hero');

    // Footer year stays current automatically
    document.querySelectorAll('.year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Header: transparent over the hero, solid once you scroll (always solid on inner pages)
    const updateHeader = () => {
        const solid = !hasHero || window.scrollY > 40;
        header.classList.toggle('scrolled', solid);
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Mobile menu
    if (toggle && nav) {
        const setMenu = open => {
            toggle.setAttribute('aria-expanded', String(open));
            nav.classList.toggle('open', open);
            header.classList.toggle('menu-open', open);
            document.body.style.overflow = open ? 'hidden' : '';
        };
        toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    }

    // Scroll reveal
    const items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach(el => io.observe(el));
    } else {
        items.forEach(el => el.classList.add('in'));
    }

    // Hero video: if it fails to load, the dark gradient behind it takes over
    const video = document.querySelector('.video-background video');
    if (video) {
        video.addEventListener('error', () => video.remove(), true);
        const source = video.querySelector('source');
        if (source) source.addEventListener('error', () => video.remove());
    }
});
