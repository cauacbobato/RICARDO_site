document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DETECTA SE ESTAMOS NA RAIZ OU EM pages/ =====
    function getBasePath() {
        const path = window.location.pathname;
        if (path.includes('/pages/') || path.includes('pages/')) {
            return '../';
        }
        return '';
    }

    const basePath = getBasePath();
    
    // ===== FUNÇÃO PARA CARREGAR HEADER E FOOTER =====
    function carregarComponentes() {
        // Carrega o header
        fetch(basePath + 'components/header.html')
            .then(response => response.text())
            .then(data => {
                // Ajusta os caminhos dos links no header
                let html = data;
                if (basePath === '../') {
                    // Se estiver em pages/, os links do header já estão apontando para ../index.html
                    // e os links internos já estão apontando para .html (sem pasta)
                }
                document.querySelector('body').insertAdjacentHTML('afterbegin', html);
                ativarLinkAtivo();
                initMenuToggle();
            })
            .catch(error => console.error('Erro ao carregar header:', error));

        // Carrega o footer
        fetch(basePath + 'components/footer.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('body').insertAdjacentHTML('beforeend', data);
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            })
            .catch(error => console.error('Erro ao carregar footer:', error));
    }

    // ===== FUNÇÃO PARA MARCAR O LINK ATIVO =====
    function ativarLinkAtivo() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        const mapaClasses = {
            'index.html': 'link-inicio',
            'sobre.html': 'link-sobre',
            'podologia.html': 'link-podologia',
            'servicos.html': 'link-servicos',
            'blog.html': 'link-blog',
            'contato.html': 'link-contato'
        };

        const classeAtiva = mapaClasses[currentPage];
        if (classeAtiva) {
            const linkAtivo = document.querySelector(`.${classeAtiva}`);
            if (linkAtivo) {
                linkAtivo.classList.add('ativo');
            }
        }
    }

    // ===== FUNÇÃO PARA INICIALIZAR O MENU HAMBURGUER =====
    function initMenuToggle() {
        const menuToggle = document.getElementById('menuToggle');
        const nav = document.querySelector('nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('mobile-aberto');
                menuToggle.classList.toggle('ativo');
            });
        }

        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('mobile-aberto');
                    if (menuToggle) menuToggle.classList.remove('ativo');
                }
            });
        });
    }

    // ===== INICIA O CARREGAMENTO =====
    carregarComponentes();

    // ===== FAQ ACCORDION =====
    const faqPerguntas = document.querySelectorAll('.faq-pergunta');
    faqPerguntas.forEach(pergunta => {
        pergunta.addEventListener('click', function() {
            const item = this.parentElement;
            const isOpen = item.classList.contains('aberto');
            document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('aberto'));
            if (!isOpen) {
                item.classList.add('aberto');
            }
        });
    });

    const primeiroFaq = document.querySelector('.faq-item');
    if (primeiroFaq) {
        primeiroFaq.classList.add('aberto');
    }
});