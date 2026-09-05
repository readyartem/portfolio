document.body.classList.add('loading');

const loader = document.getElementById('loader');
const number = document.getElementById('loaderNumber');
const bar = loader.querySelector('i');
let value = 0;
const load = () => {
  value = Math.min(100, value + Math.ceil(Math.random() * 12));
  number.textContent = value;
  bar.style.width = `${value}%`;
  if (value < 100) setTimeout(load, 70 + Math.random() * 90);
  else setTimeout(() => { loader.classList.add('done'); document.body.classList.remove('loading'); }, 280);
};
load();

const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (event) => {
  mouseX = event.clientX; mouseY = event.clientY;
  cursor.style.left = `${mouseX}px`; cursor.style.top = `${mouseY}px`;
});
document.querySelectorAll('a, button').forEach((item) => {
  item.addEventListener('mouseenter', () => cursor.classList.remove('grow'));
});

document.querySelectorAll('.magnetic').forEach((item) => {
  item.addEventListener('mousemove', (event) => {
    const box = item.getBoundingClientRect();
    item.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .16}px, ${(event.clientY - box.top - box.height / 2) * .16}px)`;
  });
  item.addEventListener('mouseleave', () => { item.style.transform = ''; });
});

const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? (scrollY / max) * 100 : 0}%`;
}, { passive: true });

const menu = document.getElementById('mobileMenu');
document.getElementById('menuButton').addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menu.classList.remove('open')));

const track = document.getElementById('sliderTrack');
const viewport = document.getElementById('projectSlider');
const current = document.getElementById('slideCurrent');
const total = document.getElementById('slideTotal');
const slides = [...track.querySelectorAll('.project')];
let slideIndex = 0;
let dragStart = 0;
let dragDelta = 0;
let dragging = false;

const showSlide = (index) => {
  const stops = innerWidth <= 700 ? slides.map((_, item) => item) : [0, 2, 4];
  const stopIndex = (Math.round(index / 2) + stops.length) % stops.length;
  slideIndex = stops[stopIndex];
  const cardWidth = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
  track.style.transform = `translateX(-${slideIndex * cardWidth}px)`;
  current.textContent = String(stopIndex + 1).padStart(2, '0');
  total.textContent = String(stops.length).padStart(2, '0');
};
document.getElementById('slideNext').addEventListener('click', () => showSlide(slideIndex + 1));
document.getElementById('slidePrev').addEventListener('click', () => showSlide(slideIndex - 1));

viewport.addEventListener('pointerdown', (event) => {
  dragging = true; dragStart = event.clientX; dragDelta = 0; viewport.classList.add('is-dragging'); viewport.setPointerCapture(event.pointerId);
});
viewport.addEventListener('pointermove', (event) => {
  if (dragging) dragDelta = event.clientX - dragStart;
});
viewport.addEventListener('pointerup', () => {
  if (!dragging) return;
  const step = innerWidth <= 700 ? 1 : 2;
  if (Math.abs(dragDelta) > 50) showSlide(slideIndex + (dragDelta < 0 ? step : -step));
  dragging = false; viewport.classList.remove('is-dragging');
});
viewport.addEventListener('pointercancel', () => { dragging = false; viewport.classList.remove('is-dragging'); });
