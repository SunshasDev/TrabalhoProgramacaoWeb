// ===============================================
// DADOS DOS UNIVERSOS
// ===============================================
const universes = [
    {
        id: 'asgard',
        title: 'Asgard',
        subtitle: 'Reino dos Deuses Nórdicos',
        description: 'Entre no majestoso reino de Asgard, lar dos deuses nórdicos. Descubra se você possui a sabedoria de Odin, a força de Thor ou a astúcia de Loki.',
        tags: ['Mitologia', 'Deuses', 'Vikings'],
        imageUrl: 'imgs/asgardbanner.jpg'
    },
    {
        id: 'valorant',
        title: 'Valorant',
        subtitle: 'Terra de um futuro Próximo',
        description: 'Se aventure em uma Terra de um futuro próximo impactado por grandes avanços na tecnologia, onde a radianita e',
        tags: ['Jogo', 'Fantasia', 'FPS'],
        imageUrl: 'imgs/valorantbanner.jpg'
    },
    {
        id: 'cygnus',
        title: 'Cygnus',
        subtitle: 'Futuro Cyberpunk',
        description: 'Navegue por megacidades neon onde a tecnologia e a humanidade se fundem. Hackers, corporações e rebeldes lutam pelo controle.',
        tags: ['Sci-Fi', 'Cyberpunk', 'Tecnologia'],
        imageUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=600&fit=crop'
    },
    {
        id: 'terra-nova',
        title: 'Terra Nova',
        subtitle: 'Mundo Pós-Apocalíptico',
        description: 'Sobreviva em um mundo transformado onde a natureza recuperou as cidades e novas criaturas dominam a terra selvagem.',
        tags: ['Survival', 'Natureza', 'Aventura'],
        imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop'
    },
    {
        id: 'aethel',
        title: 'Aethel',
        subtitle: 'Cidades Flutuantes',
        description: 'Voe entre ilhas suspensas no céu, onde civilizações antigas dominaram os segredos da levitação e do éter.',
        tags: ['Steampunk', 'Aéreo', 'Exploração'],
        imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop'
    }
];

// ===============================================
// CARROSSEL 3D
// ===============================================
class Carousel3D {
    constructor() {
        this.currentIndex = 0;
        this.items = [];
        this.track = document.getElementById('carousel3DTrack');
        this.indicators = document.getElementById('indicators3D');
        this.prevBtn = document.getElementById('prev3DBtn');
        this.nextBtn = document.getElementById('next3DBtn');
        this.autoRotateInterval = null;
        this.isHovering = false;
        
        this.init();
    }

    init() {
        this.createCards();
        this.createIndicators();
        this.attachEventListeners();
        this.updateCarousel();
        this.startAutoRotate();
    }

    createCards() {
        universes.forEach((universe, index) => {
            const card = document.createElement('div');
            card.className = 'carousel-3d-item';
            card.innerHTML = `
                <div class="universe-card">
                    <div class="universe-card-image" style="background-image: url('${universe.imageUrl}')"></div>
                    <div class="universe-card-content">
                        <h3 class="universe-card-title">${universe.title}</h3>
                        <p class="universe-card-subtitle">${universe.subtitle}</p>
                        <p class="universe-card-description">${universe.description}</p>
                        <div class="universe-card-tags">
                            ${universe.tags.map(tag => `<span class="universe-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => this.handleCardClick(universe, index));
            card.addEventListener('mouseenter', () => this.isHovering = true);
            card.addEventListener('mouseleave', () => this.isHovering = false);
            
            this.track.appendChild(card);
            this.items.push(card);
        });
    }

    createIndicators() {
        universes.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-3d-dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(dot);
        });
    }

    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        let touchStartX = 0;
        let touchEndX = 0;
        this.track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        this.track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        if (endX < startX - swipeThreshold) {
            this.next();
        } else if (endX > startX + swipeThreshold) {
            this.prev();
        }
    }

    updateCarousel() {
        const total = this.items.length;
        
        this.items.forEach((item, index) => {
            item.className = 'carousel-3d-item';
            
            if (index === this.currentIndex) {
                item.classList.add('active');
            } else if (index === (this.currentIndex + 1) % total) {
                item.classList.add('next');
            } else if (index === (this.currentIndex - 1 + total) % total) {
                item.classList.add('prev');
            } else {
                item.classList.add('far');
            }
        });

        const dots = this.indicators.querySelectorAll('.carousel-3d-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateCarousel();
        this.resetAutoRotate();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
        this.resetAutoRotate();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoRotate();
    }

    handleCardClick(universe, index) {
        if (index !== this.currentIndex) {
            this.goToSlide(index);
            return;
        }

        // ===== MUDANÇA IMPORTANTE =====
        // Redireciona para a página do quiz se o ID for 'asgard'
        if (universe.id === 'asgard') {
            window.location.href = 'Quizzes/Asgard/asgard.html'; // Nome do seu arquivo HTML do quiz
        } else {
            alert(`Universo ${universe.title} em breve! Continue explorando o Nexus Multiversal.`);
        }
    }

    startAutoRotate() {
        this.autoRotateInterval = setInterval(() => {
            if (!this.isHovering) {
                this.next();
            }
        }, 4000);
    }

    resetAutoRotate() {
        clearInterval(this.autoRotateInterval);
        this.startAutoRotate();
    }
}

// Inicializa o Carrossel 3D
const carousel = new Carousel3D();