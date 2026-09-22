const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
const tray = document.querySelector('#order-tray');
const trayCount = document.querySelector('#tray-counter');
const trayTotal = document.querySelector('#tray-total');
const items = [];

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((filter) => filter.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.menu-item').forEach((item) => {
      item.hidden = category !== 'todos' && item.dataset.category !== category;
    });
  });
});

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    items.push({ name: button.dataset.item, price: Number(button.dataset.price) });
    tray.hidden = false;
    trayCount.textContent = items.length;
    trayTotal.textContent = `R$ ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2).replace('.', ',')}`;
    button.textContent = button.classList.contains('icon-button') ? '✓' : 'Adicionado ✓';
    window.setTimeout(() => {
      if (button.classList.contains('icon-button')) button.textContent = '+';
    }, 1200);
  });
});

document.querySelector('#checkout')?.addEventListener('click', () => {
  const lines = items.map((item) => `• ${item.name} (R$ ${item.price.toFixed(2).replace('.', ',')})`).join('%0A');
  const total = items.reduce((sum, item) => sum + item.price, 0).toFixed(2).replace('.', ',');
  window.open(`https://wa.me/553132819450?text=Ol%C3%A1!%20Gostaria%20de%20pedir%3A%0A${lines}%0A%0ATotal%3A%20R$%20${total}`, '_blank', 'noopener');
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const layers = document.querySelectorAll('.parallax-layer');
  let ticking = false;
  const updateParallax = () => {
    layers.forEach((layer) => {
      const speed = Number(layer.dataset.speed);
      const section = layer.parentElement;
      const sectionProgress = window.scrollY - section.offsetTop;
      const offset = Math.max(-80, Math.min(sectionProgress * speed, section.offsetHeight * speed));
      layer.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();
}
