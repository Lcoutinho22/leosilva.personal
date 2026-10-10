'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menu'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); } });
let audience = 'Mulheres';
document.querySelectorAll('[data-audience]').forEach(button => button.addEventListener('click', () => {
  audience = button.dataset.audience;
  document.querySelectorAll('[data-audience]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#monthly').textContent = audience === 'Mulheres' ? '49,90' : '39,90';
  document.querySelector('#quarterly').textContent = audience === 'Mulheres' ? '119,80' : '79,80';
  document.querySelector('#equivalent').textContent = `Equivale a aproximadamente R$ ${audience === 'Mulheres' ? '39,93' : '26,60'} por mês.`;
}));
document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#interest').value = link.dataset.plan === 'Presencial' ? 'Presencial' : `Online ${audience} — ${link.dataset.plan}`;
}));
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#name'); const goal = document.querySelector('#goal');
  if (!name.value.trim() || !goal.value.trim()) { document.querySelector('#form-status').textContent = 'Preencha seu nome e seu objetivo para continuar.'; (!name.value.trim() ? name : goal).focus(); return; }
  const message = `Olá, Leo! Meu nome é ${name.value.trim()}.\nTenho interesse em: ${document.querySelector('#interest').value}.\nMeu objetivo: ${goal.value.trim()}`;
  const url = `https://wa.me/5521993912368?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  const status = document.querySelector('#form-status');
  status.textContent = 'Mensagem pronta. Se o WhatsApp não abriu, ';
  const fallback = document.createElement('a'); fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer'; fallback.textContent = 'clique aqui para continuar.'; fallback.style.textDecoration = 'underline'; status.append(fallback);
});
