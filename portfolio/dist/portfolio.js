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
document.querySelector('#year').textContent = new Date().getFullYear();
// Keep the age current using the date of birth supplied in the résumé.
const today = new Date();
const birthdayHasPassed = today.getMonth() > 0 || today.getDate() >= 16;
const age = document.querySelector('#age');
if (age) age.textContent = today.getFullYear() - 2004 - (birthdayHasPassed ? 0 : 1);
