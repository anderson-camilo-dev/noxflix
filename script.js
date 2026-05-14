/* ═══════════════════════════════════════════════════
   NOXFLIX — JAVASCRIPT
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════════════════
  //  NAVBAR — EFEITO DE SCROLL
  // ═══════════════════════════════════════════════════
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);

  // ═══════════════════════════════════════════════════
  //  HERO — SLIDER AUTOMÁTICO
  // ═══════════════════════════════════════════════════
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let currentSlide = 0;
  let slideInterval;
  const AUTO_INTERVAL = 7000; // 7 segundos

  function goToSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, AUTO_INTERVAL);
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Iniciar auto-slide
  if (slides.length > 1) {
    startAutoSlide();

    // Pausar ao interagir
    const hero = document.getElementById('hero');
    hero.addEventListener('mouseenter', stopAutoSlide);
    hero.addEventListener('mouseleave', startAutoSlide);

    // Setas
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });

    // Indicadores
    indicators.forEach((ind) => {
      ind.addEventListener('click', () => {
        const idx = parseInt(ind.dataset.index);
        goToSlide(idx);
        startAutoSlide();
      });
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { nextSlide(); startAutoSlide(); }
      if (e.key === 'ArrowLeft') { prevSlide(); startAutoSlide(); }
    });
  }

  // ═══════════════════════════════════════════════════
  //  BACKGROUND DOS SLIDES
  // ═══════════════════════════════════════════════════
  slides.forEach((slide) => {
    const bg = slide.dataset.bg;
    if (bg) {
      slide.style.backgroundImage = `url("${bg}")`;
    }
  });

  // ═══════════════════════════════════════════════════
  //  CARREGAR JSON E GERAR CARDS DINAMICAMENTE
  // ═══════════════════════════════════════════════════
  function createCardHTML(movie, index) {
    const isNew = movie.rating === '—' || movie.duration === 'Em Breve';
    const badgeHTML = isNew ? '<div class="card-badge-new">NOVO</div>' : '';
    const rankHTML = index < 10 ? `<div class="card-rank">${index + 1}</div>` : '';

    return `
      <div class="card" data-trailer="${movie.trailer}">
        <div class="card-thumb">
          <img src="${movie.image}" alt="${movie.title}" loading="lazy" />
          <div class="card-overlay">
            <div class="card-overlay-info">
              <div class="card-rating-big">★ ${movie.rating}</div>
              <div class="card-genre-tag">${movie.genre}</div>
              <div class="card-duration">${movie.duration}</div>
            </div>
            <div class="card-btns">
              <button class="card-play-btn">▶</button>
              <button class="card-fav-btn" onclick="toggleFav(this)">♡</button>
            </div>
          </div>
          ${rankHTML}
          ${badgeHTML}
        </div>
        <div class="card-info">
          <h3 class="card-title">${movie.title}</h3>
          <span class="card-year">${movie.year}</span>
        </div>
      </div>
    `;
  }

  function loadMoviesFromJSON() {
    fetch('filmes.json')
      .then(response => response.json())
      .then(data => {
        data.categories.forEach(category => {
          const row = document.getElementById(category.id);
          if (!row) return;

          let html = '';
          category.movies.forEach((movie, index) => {
            html += createCardHTML(movie, index);
          });
          row.innerHTML = html;
        });

        // Reativar eventos dos novos cards
        setupCardEvents();
        setupIntersectionObserver();
      })
      .catch(error => {
        console.warn('⚠️ Erro ao carregar filmes.json:', error);
      });
  }

  function setupCardEvents() {
    // ─── CARDS — PLAY ───
    document.querySelectorAll('.card-play-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.card');
        openTrailerModal(card.dataset.trailer);
      });
    });
  }

  function setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    // Primeiro aplica estilo inicial em todos os cards
    document.querySelectorAll('.cards-row .card').forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.card');
          cards.forEach((card, i) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, i * 80);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.row-section').forEach((section) => {
      observer.observe(section);
    });
  }

  // ═══════════════════════════════════════════════════
  //  CARROSSÉIS — SCROLL HORIZONTAL
  // ═══════════════════════════════════════════════════
  window.scrollRow = function(btn, direction) {
    const wrapper = btn.closest('.row-wrapper');
    const row = wrapper.querySelector('.cards-row');
    const scrollAmount = row.clientWidth * 0.6;

    row.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  // ═══════════════════════════════════════════════════
  //  MODAL DO TRAILER — FUNÇÃO REUTILIZÁVEL
  // ═══════════════════════════════════════════════════
  const modal = document.getElementById('trailerModal');
  const modalClose = document.getElementById('modalClose');
  const iframe = document.getElementById('trailerIframe');

  function openTrailerModal(trailerUrl) {
    if (trailerUrl && trailerUrl !== 'SEU_LINK_TRAILER' && trailerUrl !== '#') {
      let embedUrl = trailerUrl;
      if (trailerUrl.includes('watch?v=')) {
        const videoId = trailerUrl.split('v=')[1]?.split('&')[0];
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
      } else if (trailerUrl.includes('youtu.be/')) {
        const videoId = trailerUrl.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) {
          embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        }
      } else if (!trailerUrl.includes('embed')) {
        embedUrl = trailerUrl;
      } else {
        // Já é embed, garante autoplay
        embedUrl = trailerUrl.includes('?') ? `${trailerUrl}&autoplay=1` : `${trailerUrl}?autoplay=1`;
      }
      iframe.src = embedUrl;
    } else {
      iframe.src = 'about:blank';
      iframe.srcdoc = `
        <html style="background:#0B0B0B; display:flex; align-items:center; justify-content:center; height:100%;">
          <div style="text-align:center; color:#555; font-family:sans-serif;">
            <div style="font-size:3rem; margin-bottom:16px;">🎬</div>
            <p style="font-size:1rem;">Adicione um link de trailer no <code style="color:#E50914;">data-trailer</code></p>
          </div>
        </html>
      `;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // ═══════════════════════════════════════════════════
  //  MODAL DE DETALHES — MAIS INFORMAÇÕES
  // ═══════════════════════════════════════════════════
  const detailsData = [
    {
      emoji: '🪄',
      title: 'Como Magica',
      duration: '2h 11min',
      genre: 'Fantasia • Aventura • Mistério',
      rating: '8.7/10',
      desc: 'Em um reino escondido entre dimensões, uma jovem descobre possuir poderes capazes de alterar a própria realidade. Enquanto forças sombrias tentam dominar o mundo mágico, ela precisará aprender a controlar suas habilidades antes que tudo seja destruído.',
      highlights: ['efeitos visuais mágicos', 'criaturas fantásticas', 'atmosfera cinematográfica', 'trilha épica']
    },
    {
      emoji: '🦸',
      title: 'Vingadores: Ultimato',
      duration: '3h 01min',
      genre: 'Ação • Ficção Científica • Super-herói',
      rating: '8.9/10',
      desc: 'Após a destruição causada por Thanos, os heróis restantes precisam se unir em uma missão desesperadora para restaurar o universo e mudar o destino de bilhões de vidas.',
      highlights: ['batalhas épicas', 'viagem no tempo', 'emoção intensa', 'encerramento histórico da saga']
    },
    {
      emoji: '⚒️',
      title: 'A Forja',
      duration: '2h 03min',
      genre: 'Drama • Motivacional • Fé',
      rating: '8.3/10',
      desc: 'Um jovem perdido e sem direção recebe a oportunidade de transformar sua vida através de disciplina, propósito e fé. Enquanto enfrenta desafios pessoais e profissionais, ele descobre a força necessária para mudar seu futuro.',
      highlights: ['história inspiradora', 'desenvolvimento pessoal', 'emoção e superação', 'mensagem motivacional']
    }
  ];

  const detailsModal = document.getElementById('detailsModal');
  const detailsModalClose = document.getElementById('detailsModalClose');
  const detailsBody = document.getElementById('detailsBody');

  window.openDetailsModal = function(index) {
    const data = detailsData[index];
    if (!data) return;

    detailsBody.innerHTML = `
      <div class="details-section">
        <div class="details-label"><span style="font-family:'Outfit',sans-serif">${data.emoji}</span> NOME</div>
        <div class="details-value"><strong>${data.title}</strong></div>
      </div>

      <div class="details-section">
        <div class="details-label">⏱️ DURAÇÃO</div>
        <div class="details-value"><strong>${data.duration}</strong></div>
      </div>

      <div class="details-section">
        <div class="details-label">🎭 GÊNERO</div>
        <div class="details-tags">
          ${data.genre.split(' • ').map(g => `<span>${g}</span>`).join('')}
        </div>
      </div>

      <div class="details-section">
        <div class="details-label">⭐ AVALIAÇÃO</div>
        <div class="details-value"><strong>${data.rating}</strong></div>
      </div>

      <div class="details-divider"></div>

      <div class="details-section">
        <div class="details-label">📖 SOBRE</div>
        <div class="details-desc">${data.desc}</div>
      </div>

      <div class="details-divider"></div>

      <div class="details-section">
        <div class="details-label">🎬 DESTAQUES</div>
        <div class="details-highlights">
          ${data.highlights.map(h => `<span>✦ ${h}</span>`).join('')}
        </div>
      </div>
    `;

    detailsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeDetailsModal() {
    detailsModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (detailsModalClose) detailsModalClose.addEventListener('click', closeDetailsModal);
  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) closeDetailsModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailsModal.classList.contains('open')) closeDetailsModal();
  });

  // ─── HERO BANNER — BOTÃO TRAILER ───
  document.querySelectorAll('.hero-slide .btn-trailer').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const slide = btn.closest('.hero-slide');
      openTrailerModal(slide.dataset.trailer);
    });
  });

  // Fechar modal
  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    iframe.src = 'about:blank';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  // ═══════════════════════════════════════════════════
  //  CARDS — FAVORITAR
  // ═══════════════════════════════════════════════════
  window.toggleFav = function(btn) {
    btn.classList.toggle('favorited');
    if (btn.classList.contains('favorited')) {
      btn.textContent = '♥';
      // Animação sutil
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => { btn.style.transform = ''; }, 300);
    } else {
      btn.textContent = '♡';
    }
  };

  // ═══════════════════════════════════════════════════
  //  SEARCH — FUNCIONALIDADE BÁSICA
  // ═══════════════════════════════════════════════════
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          // Placeholder — futuramente pode redirecionar pra página de busca
          searchInput.blur();
          // Feedback visual
          searchInput.style.borderColor = '#E50914';
          setTimeout(() => {
            searchInput.style.borderColor = '';
          }, 1000);
        }
      }
    });
  }

  // ═══════════════════════════════════════════════════
  //  LOADING CINEMATOGRÁFICO
  // ═══════════════════════════════════════════════════
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // ═══════════════════════════════════════════════════
  //  INICIAR CARREGAMENTO DOS FILMES
  // ═══════════════════════════════════════════════════
  // Aplica estilo inicial nos containers vazios
  document.querySelectorAll('.cards-row').forEach((row) => {
    row.style.minHeight = '280px';
  });

  loadMoviesFromJSON();

  console.log('🎬 NOXFLIX — Plataforma carregada com sucesso!');
  console.log('🔥 Tema dark premium | Vermelho #E50914 | Bebas Neue + Outfit');

});
