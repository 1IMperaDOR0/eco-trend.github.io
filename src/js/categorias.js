// JavaScript simplificado para a página de categorias

document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const addToCartButtons = document.querySelectorAll('.btn:not(.btn-outline-success)');

    // Sistema de carrinho simplificado
    function initializeCart() {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const card = this.closest('.card');
                const productName = card.querySelector('.card-title').textContent;

                addToCart(productName, this);
            });
        });
    }

    // Função para adicionar ao carrinho (apenas visual)
    function addToCart(productName, button) {
        // Simula adição ao carrinho
        const originalText = button.textContent;
        const originalClass = button.className;

        // Feedback visual
        button.textContent = '✓ Adicionado!';
        button.className = 'btn btn-success w-100';
        button.disabled = true;

        // Mostra notificação
        showNotification(`${productName} adicionado ao carrinho!`, 'success');

        // Restaura o botão após 2 segundos
        setTimeout(() => {
            button.textContent = originalText;
            button.className = originalClass;
            button.disabled = false;
        }, 2000);
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
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        });
    }

    // Inicialização
    function init() {
        initializeCart();
        initializeScrollAnimations();
    }

    // Inicia a aplicação
    init();
});
