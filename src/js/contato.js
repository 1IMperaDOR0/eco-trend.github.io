// JavaScript para a página de contato - apenas efeitos visuais

document.addEventListener('DOMContentLoaded', function () {
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simula envio do formulário
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            // Feedback visual
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitButton.disabled = true;

            // Simula delay de envio
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

                // Restaura o botão
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;

                // Limpa o formulário
                contactForm.reset();
            }, 2000);
        });
    }

    // Sistema de notificações
    function showNotification(message, type = 'info') {
        // Remove notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Adiciona estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        // Adiciona ao DOM
        document.body.appendChild(notification);

        // Anima entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Fecha notificação
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Animações de scroll simples
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observa as seções
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
            observer.observe(card);
        });
    }

    // Efeitos hover para ícones de contato
    function initializeContactIcons() {
        const contactItems = document.querySelectorAll('.contact-item');

        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                const icon = this.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });

            item.addEventListener('mouseleave', function () {
                const icon = this.querySelector('.contact-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }

    // Efeitos para redes sociais
    function initializeSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');

        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-3px) scale(1.1)';
            });

            link.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Validação simples de formulário (apenas visual)
    function initializeFormValidation() {
        const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');

        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (!this.value.trim()) {
                    this.style.borderColor = '#ef4444';
                    this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                } else {
                    this.style.borderColor = '#10b981';
                    this.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }
            });

            input.addEventListener('input', function () {
                if (this.value.trim()) {
                    this.style.borderColor = '#10b981';
                    this.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                }
            });
        });
    }

    // Inicialização
    function init() {
        initializeScrollAnimations();
        initializeContactIcons();
        initializeSocialLinks();
        initializeFormValidation();
    }

    // Inicia a aplicação
    init();
});
