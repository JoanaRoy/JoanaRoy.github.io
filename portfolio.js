// Replace the sample case studies below with your own projects.
const projects = {
  orbit: { title: 'Orbit', category: 'PRODUCT DESIGN / DEVELOPMENT', intro: 'A clearer space for your best work.', challenge: 'A concept for an independent team’s workspace. The goal: bring projects, activity, and useful business insights together without adding more noise to the day.', approach: 'A calm visual system, focused navigation, and an at-a-glance dashboard make the important details easy to find. Reusable interface patterns keep the experience consistent as the product grows.', skills: 'Interface design · Design systems · Frontend development' },
  forma: { title: 'Forma', category: 'STRATEGY / BRAND IDENTITY', intro: 'A new perspective on the everyday.', challenge: 'A concept identity for a considered homeware brand. Everyday objects needed a distinctive voice that could express quality, simplicity, and a quiet sense of character.', approach: 'An expressive serif wordmark, earthy palette, and sculptural forms create a flexible identity. Spacious typography gives each object room to speak for itself.', skills: 'Brand strategy · Visual identity · Art direction' },
  haven: { title: 'Haven', category: 'WEB DESIGN / ART DIRECTION', intro: 'A digital escape, made to feel like home.', challenge: 'A concept website for a collection of quiet, nature-focused stays. The experience needed to convey a sense of place while making it easy to discover the right escape.', approach: 'Editorial typography, landscape-inspired colors, and simple navigation bring a slower pace to the browsing experience. Clear calls to action guide visitors from inspiration to exploration.', skills: 'Web design · Prototyping · Art direction' },
  volume: { title: 'Volume', category: 'CREATIVE CODING / DEVELOPMENT', intro: 'For the love of finding your next favorite.', challenge: 'A concept music discovery experience built around human curation. The challenge was to give independent releases a memorable home with the energy of a favorite record shop.', approach: 'Bold typography, a warm orange palette, and record-inspired graphics establish an immediate personality. A modular layout creates space for releases, editorial stories, and curated selections.', skills: 'Creative development · Interaction design · Visual design' }
};

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    const visible = button.dataset.filter === 'all' || card.dataset.category.split(' ').includes(button.dataset.filter);
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('.project-count').textContent = `${count} selected project${count === 1 ? '' : 's'}`;
}));

const dialog = document.querySelector('#project-dialog');
cards.forEach(card => card.addEventListener('click', () => {
  const project = projects[card.dataset.project];
  for (const [id, key] of [['dialog-title', 'title'], ['dialog-category', 'category'], ['dialog-intro', 'intro'], ['dialog-challenge', 'challenge'], ['dialog-approach', 'approach'], ['dialog-skills', 'skills']]) {
    document.getElementById(id).textContent = project[key];
  }
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
document.querySelector('#dialog-contact').addEventListener('click', () => dialog.close());

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#work, #about, #contact').forEach(section => observer.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
