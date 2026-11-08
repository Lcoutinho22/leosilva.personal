'use strict';

// 1. Menu Mobile
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});

// 2. Filtros do Catálogo de Programas
const filterChips = document.querySelectorAll('.filter-chip');
const modalities = document.querySelectorAll('.modality');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    
    const filter = chip.dataset.filter;
    
    modalities.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'flex';
        setTimeout(() => { card.style.opacity = '1'; }, 10);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 3. Alternância Mensal / Trimestral na Assinatura da Biblioteca
const periodButtons = document.querySelectorAll('.period-btn');
const libPrice = document.querySelector('#lib-price');
const libPeriod = document.querySelector('#lib-period');
const libBillingNote = document.querySelector('#lib-billing-note');
const libCta = document.querySelector('#lib-cta');
const interestSelect = document.querySelector('#interest');

let currentLibraryPeriod = 'monthly';

periodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    periodButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    currentLibraryPeriod = btn.dataset.period;
    
    if (currentLibraryPeriod === 'monthly') {
      libPrice.textContent = '39,90';
      libPeriod.textContent = '/ mês';
      libBillingNote.textContent = 'Cobrança mensal recorrente. Cancele quando quiser.';
      libCta.dataset.plan = 'Assinatura Biblioteca (Mensal R$ 39,90)';
    } else {
      libPrice.textContent = '89,90';
      libPeriod.textContent = '/ trimestre';
      libBillingNote.textContent = 'Equivale a aprox. R$ 29,96/mês. Economia de 25%.';
      libCta.dataset.plan = 'Assinatura Biblioteca (Trimestral R$ 89,90)';
    }
  });
});

// 4. Seleção de Modelos / Abas de Planos (Digital vs Presencial)
const modelTabs = document.querySelectorAll('.model-tab');
const planCards = document.querySelectorAll('.plan');

modelTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    modelTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const model = tab.dataset.model;
    
    planCards.forEach(card => {
      if (model === 'presencial') {
        if (card.classList.contains('in-person')) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      } else {
        if (!card.classList.contains('in-person')) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});

// 5. Clique nos botões de programas e planos -> preenche o formulário
document.querySelectorAll('[data-program-pick]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const programName = btn.dataset.programPick;
    // Tenta encontrar uma option com o programa correspondente
    for (let option of interestSelect.options) {
      if (option.value.includes(programName)) {
        interestSelect.value = option.value;
        break;
      }
    }
  });
});

document.querySelectorAll('[data-plan]').forEach(link => {
  link.addEventListener('click', () => {
    const planName = link.dataset.plan;
    for (let option of interestSelect.options) {
      if (option.value.includes(planName) || planName.includes(option.value)) {
        interestSelect.value = option.value;
        break;
      }
    }
  });
});

// 6. Envio do Formulário para WhatsApp
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('#name');
    const goal = document.querySelector('#goal');
    const interest = interestSelect.value;
    
    if (!name.value.trim() || !goal.value.trim()) {
      document.querySelector('#form-status').textContent = 'Por favor, preencha seu nome e seu objetivo para continuar.';
      (!name.value.trim() ? name : goal).focus();
      return;
    }
    
    const message = `Olá, Leo! Meu nome é ${name.value.trim()}.\nTenho interesse em: ${interest}.\nMeu objetivo e rotina: ${goal.value.trim()}`;
    const url = `https://wa.me/5521993912368?text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');
    
    const status = document.querySelector('#form-status');
    status.textContent = 'Mensagem pronta! Se o WhatsApp não abriu automaticamente, ';
    const fallback = document.createElement('a');
    fallback.href = url;
    fallback.target = '_blank';
    fallback.rel = 'noopener noreferrer';
    fallback.textContent = 'clique aqui para abrir.';
    fallback.style.textDecoration = 'underline';
    fallback.style.fontWeight = 'bold';
    status.append(fallback);
  });
}

// 7. Efeitos Animados ao Rolar a Tela (Scroll Reveal & Progress)
const siteHeader = document.querySelector('#siteHeader');
const scrollProgress = document.querySelector('#scrollProgress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolledPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  
  if (scrollProgress) {
    scrollProgress.style.width = `${scrolledPercent}%`;
  }
  
  if (siteHeader) {
    if (scrollTop > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
}, { passive: true });

// Observer de Revelação dos Elementos
const revealElements = document.querySelectorAll('.reveal, .reveal-scale');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  // Fallback para navegadores legados
  revealElements.forEach(el => el.classList.add('is-revealed'));
}

