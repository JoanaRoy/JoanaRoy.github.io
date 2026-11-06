const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const sidebar = document.querySelector('.sidebar');
const sections = [...document.querySelectorAll('[data-nav-section]')];
const navLinks = [...navigation.querySelectorAll('.nav-link')];
const mobileLayout = window.matchMedia('(max-width: 700px)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let scrollFrame = 0;
let activeSectionId = null;

function setActiveSection(id) {
  if (activeSectionId === id) return;
  activeSectionId = id;
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

function updateHeaderOffset() {
  const height = mobileLayout.matches ? Math.ceil(sidebar.getBoundingClientRect().height) : 0;
  document.documentElement.style.setProperty('--nav-offset', height + 'px');
  document.documentElement.style.setProperty('--mobile-header-height', height + 'px');
}

function closeMenu(returnFocus = false) {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) menuButton.focus({ preventScroll: true });
}

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!sidebar.contains(event.target)) closeMenu();
});

function getHashTarget(hash) {
  if (!hash || hash === '#') return null;
  try { return document.getElementById(decodeURIComponent(hash.slice(1))); }
  catch { return null; }
}

// Native anchors remain usable without JavaScript; enhance ordinary clicks only.
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const hash = link.getAttribute('href');
  const target = getHashTarget(hash);
  if (!target) return;
  event.preventDefault();
  closeMenu();
  updateHeaderOffset();
  if (window.location.hash !== hash) window.history.pushState(null, '', hash);
  const section = target.closest('[data-nav-section]');
  if (section) setActiveSection(section.id);
  target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
});

function updateActiveSection() {
  scrollFrame = 0;
  const offset = mobileLayout.matches ? sidebar.getBoundingClientRect().height : 0;
  const readingLine = offset + Math.min(window.innerHeight * 0.2, 160);
  let active = sections[0];
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= readingLine) active = section;
  });
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) active = sections[sections.length - 1];
  if (active) setActiveSection(active.id);
}

function queueActiveUpdate() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateActiveSection);
}
window.addEventListener('scroll', queueActiveUpdate, { passive: true });
window.addEventListener('resize', () => { updateHeaderOffset(); queueActiveUpdate(); }, { passive: true });
mobileLayout.addEventListener('change', () => { closeMenu(); updateHeaderOffset(); queueActiveUpdate(); });
if ('ResizeObserver' in window) new ResizeObserver(() => { updateHeaderOffset(); queueActiveUpdate(); }).observe(sidebar);

function alignHashTarget() {
  updateHeaderOffset();
  const target = getHashTarget(window.location.hash) || sections[0];
  if (target && window.location.hash) target.scrollIntoView({ behavior: 'instant', block: 'start' });
  else if (target) window.scrollTo({ top: 0, behavior: 'instant' });
  queueActiveUpdate();
}
window.addEventListener('popstate', alignHashTarget);
window.addEventListener('hashchange', queueActiveUpdate);
window.addEventListener('load', () => window.requestAnimationFrame(alignHashTarget), { once: true });

updateHeaderOffset();
queueActiveUpdate();
document.querySelector('#year').textContent = new Date().getFullYear();
const today = new Date();
const birthdayHasPassed = today.getMonth() > 0 || today.getDate() >= 16;
const age = document.querySelector('#age');
if (age) age.textContent = today.getFullYear() - 2004 - (birthdayHasPassed ? 0 : 1);
