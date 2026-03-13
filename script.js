/* ============================================================
   VALE OF RUIN — Low Orbit Studios
   script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  // Adds .is-visible to elements with .reveal when they enter the viewport

  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // fire once only
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── NAV SCROLL STATE ───────────────────────────────────── */
  // Adds .is-scrolled to nav after user scrolls down 40px

  function initNavState() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 40) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load in case page is already scrolled
  }

  /* ── SMOOTH ANCHOR OFFSET ───────────────────────────────── */
  // Accounts for the fixed nav height (64px) when jumping to anchors

  function initAnchorOffset() {
    var NAV_HEIGHT = 64;

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href').slice(1);
        var target = document.getElementById(targetId);

        if (!target) return;

        e.preventDefault();

        var top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT - 16;

        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ── STAGGERED REVEAL FOR GRIDS ─────────────────────────── */
  // Cards in grids reveal one after another with a slight delay

  function initStaggeredGrids() {
    var grids = document.querySelectorAll('.announce-grid, .community-grid');

    grids.forEach(function (grid) {
      var children = Array.from(grid.children);

      children.forEach(function (child, i) {
        child.style.transitionDelay = (i * 0.1) + 's';
        child.classList.add('reveal');
      });
    });
  }

  /* ── ROADMAP STAGGER ────────────────────────────────────── */
  function initRoadmapStagger() {
    var items = document.querySelectorAll('.roadmap-item');

    items.forEach(function (item, i) {
      item.style.transitionDelay = (i * 0.08) + 's';
      item.classList.add('reveal');
    });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initStaggeredGrids();   // must run before initScrollReveal
    initRoadmapStagger();   // must run before initScrollReveal
    initScrollReveal();
    initNavState();
    initAnchorOffset();
  });

})();
