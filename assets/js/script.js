document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando carregamento dos componentes...');

    // ===== SEMPRE USAR CAMINHOS ABSOLUTOS (começando com /) =====
    function getBasePath() {
        return ''; // vazio, pois usaremos /components/
    }

    const basePath = getBasePath();

    // ===== FUNÇÃO PARA CARREGAR COMPONENTES =====
    function carregarComponente(url, alvo, posicao) {
        console.log(`⏳ Carregando: ${url}`);
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
                }
                return response.text();
            })
            .then(html => {
                const elemento = document.querySelector(alvo);
                if (elemento) {
                    elemento.insertAdjacentHTML(posicao, html);
                    console.log(`✅ Componente carregado: ${url}`);
                } else {
                    console.warn(`⚠️ Elemento alvo "${alvo}" não encontrado. Inserindo no body.`);
                    document.body.insertAdjacentHTML(posicao, html);
                }
                return html;
            })
            .catch(error => {
                console.error(`❌ Erro ao carregar ${url}:`, error);
                const elemento = document.querySelector(alvo);
                if (elemento) {
                    elemento.insertAdjacentHTML(posicao, `
                        <div style="background:#ffe0e0; padding:12px; border:1px solid red; border-radius:8px; margin:10px 0; color:#333; font-family:sans-serif;">
                            ⚠️ Erro ao carregar componente. Verifique o console.
                            <br><small>Arquivo: ${url}</small>
                        </div>
                    `);
                }
                return '';
            });
    }

    // ===== CARREGA HEADER =====
    carregarComponente('/components/header.html', 'body', 'afterbegin')
        .then(() => {
            // Ativa o link correto no menu
            const currentPage = window.location.pathname;
            const mapa = {
                '/': 'link-inicio',
                '/index.html': 'link-inicio',
                '/pages/sobre.html': 'link-sobre',
                '/pages/podologia.html': 'link-podologia',
                '/pages/servicos.html': 'link-servicos',
                '/pages/blog.html': 'link-blog',
                '/pages/contato.html': 'link-contato'
            };
            const classe = mapa[currentPage];
            if (classe) {
                const link = document.querySelector(`.${classe}`);
                if (link) link.classList.add('ativo');
            }
            // Inicializa menu hambúrguer
            const menuToggle = document.getElementById('menuToggle');
            const nav = document.querySelector('nav');
            if (menuToggle && nav) {
                menuToggle.addEventListener('click', function() {
                    nav.classList.toggle('mobile-aberto');
                    menuToggle.classList.toggle('ativo');
                });
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.addEventListener('click', function() {
                        if (window.innerWidth <= 768) {
                            nav.classList.remove('mobile-aberto');
                            menuToggle.classList.remove('ativo');
                        }
                    });
                });
            }
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });

    // ===== CARREGA FOOTER =====
    carregarComponente('/components/footer.html', 'body', 'beforeend')
        .then(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });

    // ===== FAQ ACCORDION =====
    const faqPerguntas = document.querySelectorAll('.faq-pergunta');
    if (faqPerguntas.length) {
        faqPerguntas.forEach(pergunta => {
            pergunta.addEventListener('click', function() {
                const item = this.parentElement;
                const isOpen = item.classList.contains('aberto');
                document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('aberto'));
                if (!isOpen) item.classList.add('aberto');
            });
        });
        document.querySelector('.faq-item')?.classList.add('aberto');
    }

    console.log('✅ Script finalizado.');
});