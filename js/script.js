/**
 * js/script.js - Otimizado e Modularizado
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- 1. Sistema de Scroll Animations (Intersection Observer) ---
    const initScrollAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    };

    // --- 2. Sistema de Troca de Tema ---
    const initThemeToggle = () => {
        const themeBtn = document.querySelector('.theme-toggle');
        const icon = themeBtn ? themeBtn.querySelector('i') : null;
        if (!themeBtn || !icon) return;

        // Configuração inicial baseada no cache ou preferência do sistema
        const savedTheme = localStorage.getItem('theme-leo');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

        if (savedTheme === 'light' || (!savedTheme && prefersLight)) { 
            document.body.classList.add('light-theme'); 
            icon.classList.replace('fa-sun', 'fa-moon'); 
        }

        // Ação de troca
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) { 
                icon.classList.replace('fa-sun', 'fa-moon'); 
                localStorage.setItem('theme-leo', 'light'); 
            } else { 
                icon.classList.replace('fa-moon', 'fa-sun'); 
                localStorage.setItem('theme-leo', 'dark'); 
            }
        });
    };

    // --- 3. Sistema do Menu de Compartilhamento ---
    const initShareMenu = () => {
        const shareToggle = document.querySelector('.share-toggle');
        const shareMenu = document.getElementById('shareMenu');
        
        if (!shareToggle || !shareMenu) return;

        shareToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            shareMenu.classList.toggle('active');
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (event) => {
            if (!shareMenu.contains(event.target) && shareMenu.classList.contains('active')) {
                shareMenu.classList.remove('active');
            }
        });

        // Eventos nos botões de compartilhamento
        const shareButtons = shareMenu.querySelectorAll('button[data-platform]');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const platform = btn.dataset.platform;
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Confira o trabalho do Leo Silva - Personal Trainer: ');
                
                if (platform === 'whatsapp') {
                    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
                } else if (platform === 'facebook') {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                } else {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        const platName = platform === 'tiktok' ? 'TikTok' : 'YouTube';
                        alert(`Link copiado com sucesso! Você pode colar no seu ${platName}.`);
                        shareMenu.classList.remove('active');
                    }).catch(err => console.error('Erro ao copiar link:', err));
                }
            });
        });
    };

    // --- 4. Envio do formulário via WhatsApp ---
    const initFormSubmission = () => {
        const form = document.querySelector('form.card');
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const plano = document.getElementById('planSelect').value;
            const nome = document.getElementById('clientName').value.trim();
            const idade = document.getElementById('clientAge').value;
            const sexo = document.getElementById('clientGender').value;
            const nivel = document.getElementById('levelSelect').value;
            const dias = document.getElementById('trainingDays').value;
            const objetivo = document.getElementById('goalInput').value.trim();
            const dores = document.getElementById('painInput').value.trim();
            
            if (!nome || !objetivo) {
                alert("Por favor, preencha os campos obrigatórios.");
                return;
            }

            const mensagem = `Fala Leo! Preenchi a ficha de aplicação no site:%0A%0A*--- DADOS ---*%0A*Nome:* ${nome}%0A*Idade:* ${idade} anos%0A*Sexo:* ${sexo}%0A*Nível:* ${nivel}%0A*Disponibilidade:* ${dias}%0A*Plano:* ${plano}%0A%0A*--- OBJETIVO ---*%0A${objetivo}%0A%0A*--- DORES/LESÕES ---*%0A${dores ? dores : 'Nenhuma'}`;
            
            window.open(`https://wa.me/5521993912368?text=${mensagem}`, '_blank');
        });
    };

    // --- 5. Botões rápidos de planos ---
    const initPlanButtons = () => {
        const planButtons = document.querySelectorAll('button[data-plano]');
        planButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const plano = btn.dataset.plano;
                const mensagem = encodeURIComponent(`Fala Leo! Tenho interesse no plano *${plano}*, pode me passar mais detalhes?`);
                window.open(`https://wa.me/5521993912368?text=${mensagem}`, '_blank');
            });
        });
    };

    // Inicializar todos os módulos
    initScrollAnimations();
    initThemeToggle();
    initShareMenu();
    initFormSubmission();
    initPlanButtons();
});