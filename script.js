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
  const AUTO_INTERVAL = 7000;

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

  if (slides.length > 1) {
    startAutoSlide();
    const hero = document.getElementById('hero');
    hero.addEventListener('mouseenter', stopAutoSlide);
    hero.addEventListener('mouseleave', startAutoSlide);

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });

    indicators.forEach((ind) => {
      ind.addEventListener('click', () => {
        const idx = parseInt(ind.dataset.index);
        goToSlide(idx);
        startAutoSlide();
      });
    });

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
  //  DADOS DOS FILMES (FALLBACK PARA MODO LOCAL)
  // ═══════════════════════════════════════════════════
  const filmesDataFallback = {
    "categories": [
      {
        "id": "row-trending",
        "title": "Em Alta",
        "movies": [
          { "title": "Duna: Parte Dois", "genre": "Ficção", "rating": "8.8", "duration": "2h 46min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", "trailer": "https://www.youtube.com/watch?v=Way9Dexny3w", "description": "Paul Atreides une-se a Chani e aos Fremen numa guerra de vingança contra os conspiradores que destruíram a sua família." },
          { "title": "Oppenheimer", "genre": "Drama", "rating": "8.9", "duration": "3h 00min", "year": "2023", "image": "https://image.tmdb.org/t/p/w500/8GxvA9zDZ9ajlsj7LpXvS7svcPL.jpg", "trailer": "https://www.youtube.com/watch?v=uYPbbksJxIg", "description": "A história do físico J. Robert Oppenheimer e o seu papel no desenvolvimento da bomba atómica." },
          { "title": "Top Gun: Maverick", "genre": "Ação", "rating": "8.3", "duration": "2h 10min", "year": "2022", "image": "https://image.tmdb.org/t/p/w500/62HCnUTziyWpSwwvUGvWnSfwTDu.jpg", "trailer": "https://www.youtube.com/watch?v=giXco2jaZ_4", "description": "Após trinta anos de serviço, Maverick continua a ser um dos melhores aviadores da Marinha." },
          { "title": "Pobres Criaturas", "genre": "Comédia/Sci-Fi", "rating": "8.0", "duration": "2h 21min", "year": "2023", "image": "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg", "trailer": "https://www.youtube.com/watch?v=RZb0-gfoAao", "description": "A incrível história de Bella Baxter, uma jovem trazida de volta à vida por um cientista brilhante." },
          { "title": "Homem-Aranha: Através do Aranhaverso", "genre": "Animação", "rating": "8.9", "duration": "2h 20min", "year": "2023", "image": "https://image.tmdb.org/t/p/w500/8j59179S6SBDpBqf94ArC6p3aFJ.jpg", "trailer": "https://www.youtube.com/watch?v=shW9i6k8cB0", "description": "Miles Morales é lançado através do Multiverso, onde encontra uma equipa de Pessoas-Aranha." },
          { "title": "John Wick 4: Baba Yaga", "genre": "Ação", "rating": "8.2", "duration": "2h 49min", "year": "2023", "image": "https://image.tmdb.org/t/p/w500/gh2bmhS9tmJs0oQKcC796tC9v3B.jpg", "trailer": "https://www.youtube.com/watch?v=qEVUtrk2BzE", "description": "John Wick descobre um caminho para derrotar a Alta Cúpula e ganhar a sua liberdade." },
          { "title": "The Batman", "genre": "Ação", "rating": "8.1", "duration": "2h 56min", "year": "2022", "image": "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", "trailer": "https://www.youtube.com/watch?v=mqqft2x_Aa4", "description": "Nos seus dois anos de combate ao crime, Batman investiga a corrupção em Gotham City." },
          { "title": "Godzilla Minus One", "genre": "Ficção", "rating": "8.4", "duration": "2h 04min", "year": "2023", "image": "https://image.tmdb.org/t/p/w500/hkxxM9p4Bqr9YIarSdc96pS6QBT.jpg", "trailer": "https://www.youtube.com/watch?v=JN1C-ANvQrA", "description": "No Japão pós-guerra, surge uma nova força aterrorizante que ameaça o país." }
        ]
      },
      {
        "id": "row-horror",
        "title": "Terror",
        "movies": [
          { "title": "A Morte do Demónio: A Ascensão", "genre": "Terror", "rating": "7.2", "duration": "1h 36min", "year": "2023", "image": "https://image.tmdb.org/t/p/w500/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg", "trailer": "https://www.youtube.com/watch?v=foq-U2q2JMs", "description": "Uma reunião de família é interrompida por demónios devoradores de carne." },
          { "title": "Hereditário", "genre": "Terror", "rating": "7.9", "duration": "2h 07min", "year": "2018", "image": "https://image.tmdb.org/t/p/w500/7996YIay7264mKAnF9m9O3fS7oE.jpg", "trailer": "https://www.youtube.com/watch?v=V6wWKNij_1M", "description": "Após a morte da avó, uma família descobre segredos terríveis sobre a sua ancestralidade." },
          { "title": "Fale Comigo", "genre": "Terror", "rating": "7.5", "duration": "1h 35min", "year": "2023", "image": "https://image.tmdb.org/t/p/w500/kdPMUMJzyYAc4roD52qavX0nLIC.jpg", "trailer": "https://www.youtube.com/watch?v=HZ4IZc-3R7Y", "description": "Amigos descobrem como conjurar espíritos usando uma mão embalsamada." },
          { "title": "Invocação do Mal", "genre": "Terror", "rating": "8.1", "duration": "1h 52min", "year": "2013", "image": "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg", "trailer": "https://www.youtube.com/watch?v=k10ETZ41q5o", "description": "Investigadores paranormais ajudam uma família aterrorizada por uma presença sombria." },
          { "title": "Sorria", "genre": "Terror", "rating": "6.8", "duration": "1h 55min", "year": "2022", "image": "https://image.tmdb.org/t/p/w500/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg", "trailer": "https://www.youtube.com/watch?v=BcDK7lkzzsU", "description": "Uma médica começa a experimentar ocorrências aterrorizantes que não consegue explicar." },
          { "title": "M3GAN", "genre": "Terror", "rating": "7.0", "duration": "1h 42min", "year": "2022", "image": "https://image.tmdb.org/t/p/w500/d9nBoowhjiiYc4FBNtQkPY7c11H.jpg", "trailer": "https://www.youtube.com/watch?v=BRb4U99OU80", "description": "Uma boneca realista começa a ganhar vida própria e a tornar-se excessivamente protetora." },
          { "title": "X - A Marca da Morte", "genre": "Terror", "rating": "7.1", "duration": "1h 45min", "year": "2022", "image": "https://image.tmdb.org/t/p/w500/woT42Xk3TbCMwMEqAjyBoQ6IUKc.jpg", "trailer": "https://www.youtube.com/watch?v=2Q5h7e7L9tI", "description": "Uma equipa de filmagem é caçada por anfitriões idosos numa fazenda isolada." },
          { "title": "Pânico VI", "genre": "Terror", "rating": "7.3", "duration": "2h 02min", "year": "2023", "image": "https://image.tmdb.org/t/p/w500/wDWwtvkRRlgTiUr6TyLSMX8FCuZ.jpg", "trailer": "https://www.youtube.com/watch?v=h7B1iTQEi2s", "description": "Os sobreviventes de Ghostface iniciam um novo capítulo em Nova Iorque." }
        ]
      },
      {
        "id": "row-anime",
        "title": "Anime",
        "movies": [
          { "title": "Death Note", "genre": "Anime", "rating": "9.2", "duration": "23min/ep", "year": "2006", "image": "https://image.tmdb.org/t/p/w500/tCZFfYTIwrR7n94J6G14Y4hAFU6.jpg", "trailer": "https://www.youtube.com/watch?v=NlJZ-YgAt-c", "description": "Um estudante encontra um caderno capaz de matar qualquer pessoa." },
          { "title": "Jujutsu Kaisen", "genre": "Anime", "rating": "9.1", "duration": "24min/ep", "year": "2020", "image": "https://image.tmdb.org/t/p/w500/fHpKWq9ayzSk8nSwqRuaAUemRKh.jpg", "trailer": "https://www.youtube.com/watch?v=pkKu9hT-t68", "description": "Feiticeiros enfrentam maldições monstruosas em batalhas intensas." },
          { "title": "Demon Slayer", "genre": "Anime", "rating": "9.3", "duration": "24min/ep", "year": "2019", "image": "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg", "trailer": "https://www.youtube.com/watch?v=VQGCKyvzIM4", "description": "Um rapaz enfrenta demónios enquanto procura salvar a sua irmã." },
          { "title": "Chainsaw Man", "genre": "Anime", "rating": "8.9", "duration": "24min/ep", "year": "2022", "image": "https://image.tmdb.org/t/p/w500/yVtx7XGcJdvQZ4D5FigGzLhQn9g.jpg", "trailer": "https://www.youtube.com/watch?v=dFlDRhvM4L0", "description": "Um jovem transforma-se numa criatura brutal com motosserras." },
          { "title": "Solo Leveling", "genre": "Anime", "rating": "9.0", "duration": "23min/ep", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg", "trailer": "https://www.youtube.com/watch?v=V0hg5DVpGzE", "description": "O caçador mais fraco do mundo recebe poderes absurdos." },
          { "title": "One Piece", "genre": "Anime", "rating": "9.4", "duration": "24min/ep", "year": "1999", "image": "https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg", "trailer": "https://www.youtube.com/watch?v=S8_YwFLCh4U", "description": "Luffy e a sua tripulação procuram o maior tesouro do mundo." },
          { "title": "Cyberpunk: Edgerunners", "genre": "Anime", "rating": "8.8", "duration": "25min/ep", "year": "2022", "image": "https://image.tmdb.org/t/p/w500/lqcDVZ8pyk08AVftoS8j4dS5ixj.jpg", "trailer": "https://www.youtube.com/watch?v=JtqIas3bYhg", "description": "Um jovem tenta sobreviver numa cidade dominada por tecnologia." },
          { "title": "Attack on Titan", "genre": "Anime", "rating": "9.5", "duration": "24min/ep", "year": "2013", "image": "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg", "trailer": "https://www.youtube.com/watch?v=MGRm4IzK1SQ", "description": "Humanos lutam contra titãs gigantes para sobreviver." }
        ]
      },
      {
        "id": "row-scifi",
        "title": "Ficção Científica",
        "movies": [
          { "title": "Blade Runner 2049", "genre": "Sci-Fi", "rating": "8.6", "duration": "2h 44min", "year": "2017", "image": "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", "trailer": "https://www.youtube.com/watch?v=gCcx85zbxz4", "description": "Um jovem blade runner descobre um segredo que pode gerar o caos." },
          { "title": "A Chegada", "genre": "Sci-Fi", "rating": "8.4", "duration": "1h 56min", "year": "2016", "image": "https://image.tmdb.org/t/p/w500/3rDwbFpn6z5HJUgDjpfhEePx8VI.jpg", "trailer": "https://www.youtube.com/watch?v=tFMo3UJ4B4g", "description": "Uma linguista tenta comunicar com formas de vida alienígenas." },
          { "title": "Matrix", "genre": "Sci-Fi", "rating": "8.7", "duration": "2h 16min", "year": "1999", "image": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", "trailer": "https://www.youtube.com/watch?v=m8e-FF8MsqU", "description": "Um hacker descobre que a realidade é uma simulação." },
          { "title": "Ex Machina", "genre": "Sci-Fi", "rating": "7.7", "duration": "1h 48min", "year": "2014", "image": "https://image.tmdb.org/t/p/w500/dmJW8IAKHKxFNiUnoDR7JfsK7Rp.jpg", "trailer": "https://www.youtube.com/watch?v=bggbWo8Pq1s", "description": "Um programador participa num teste com uma IA avançada." },
          { "title": "Duna", "genre": "Sci-Fi", "rating": "8.5", "duration": "2h 35min", "year": "2021", "image": "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", "trailer": "https://www.youtube.com/watch?v=8g18jFHCLXk", "description": "O filho de uma família nobre protege o recurso mais vital da galáxia." },
          { "title": "Terminator 2", "genre": "Sci-Fi", "rating": "8.6", "duration": "2h 17min", "year": "1991", "image": "https://image.tmdb.org/t/p/w500/jFTVD4XoWQTcg7wdyJKa8PEds5q.jpg", "trailer": "https://www.youtube.com/watch?v=_R3QljxNjqQ", "description": "Um ciborgue deve proteger John Connor de um modelo mais avançado." },
          { "title": "Perdido em Marte", "genre": "Sci-Fi", "rating": "8.0", "duration": "2h 24min", "year": "2015", "image": "https://image.tmdb.org/t/p/w500/5BHuvQ6p9h9cCnJnBDhg5fLpFTc.jpg", "trailer": "https://www.youtube.com/watch?v=ej3ioUnTyMA", "description": "Um astronauta fica preso em Marte e usa a ciência para sobreviver." },
          { "title": "Interestelar", "genre": "Sci-Fi", "rating": "9.2", "duration": "2h 49min", "year": "2014", "image": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", "trailer": "https://www.youtube.com/watch?v=zSWdZVtXT7E", "description": "Exploradores viajam pelo espaço para salvar a humanidade." }
        ]
      },
      {
        "id": "row-new",
        "title": "Lançamentos",
        "movies": [
          { "title": "Deadpool & Wolverine", "genre": "Ação", "rating": "8.1", "duration": "2h 07min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg", "trailer": "https://www.youtube.com/watch?v=73_1biulkYk", "description": "Deadpool une forças com um Wolverine relutante para salvar o universo." },
          { "title": "Twisters", "genre": "Ação/Aventura", "rating": "7.2", "duration": "2h 02min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/pjnD08FMAqTDGJg8hanGjBFUjG7.jpg", "trailer": "https://www.youtube.com/watch?v=obL2pNYkzLI", "description": "Caçadores de tempestades enfrentam tornados devastadores." },
          { "title": "Divertida-Mente 2", "genre": "Animação", "rating": "8.6", "duration": "1h 36min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvVrZWNvXqBv.jpg", "trailer": "https://www.youtube.com/watch?v=LEjhY15eCx0", "description": "Novas emoções surgem na mente de Riley durante a adolescência." },
          { "title": "Planeta dos Macacos: O Reinado", "genre": "Ficção", "rating": "7.5", "duration": "2h 25min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/gq9JX6bXnQpoT8B75GjcAOBchZO.jpg", "trailer": "https://www.youtube.com/watch?v=XtR5Y3R8FvM", "description": "Muitas gerações após César, um novo líder macaco sobe ao poder." },
          { "title": "Bad Boys: Tudo ou Nada", "genre": "Ação", "rating": "7.0", "duration": "1h 55min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/nHlVi2x3eLEFhs8azcSTEFRLMJp.jpg", "trailer": "https://www.youtube.com/watch?v=UqTkY0dLxEE", "description": "Mike e Marcus regressam para uma missão pessoal e explosiva." },
          { "title": "Furiosa: Uma Saga Mad Max", "genre": "Ação", "rating": "7.8", "duration": "2h 28min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/iADOJ8ZymJ2Bc2J1WAB7xQZYoGf.jpg", "trailer": "https://www.youtube.com/watch?v=XJMuhwVlcaQ", "description": "A origem da guerreira Furiosa num mundo pós-apocalíptico." },
          { "title": "Um Lugar Silencioso: Dia Um", "genre": "Terror", "rating": "7.1", "duration": "1h 40min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/nbIrRGNnKqcZLwxNnWbueLvrHOs.jpg", "trailer": "https://www.youtube.com/watch?v=YPY7JITV9Fk", "description": "O primeiro dia da invasão que silenciou o mundo." },
          { "title": "O Dublê", "genre": "Ação/Comédia", "rating": "7.4", "duration": "2h 06min", "year": "2024", "image": "https://image.tmdb.org/t/p/w500/tqy1UzOVyohqMo2VbOgGPjoD99d.jpg", "trailer": "https://www.youtube.com/watch?v=cs3Kf0nAp7o", "description": "Um duplo de ação torna-se o herói da sua própria história real." }
        ]
      },
      {
        "id": "row-classics",
        "title": "Clássicos",
        "movies": [
          { "title": "Clube da Luta", "genre": "Drama", "rating": "8.8", "duration": "2h 19min", "year": "1999", "image": "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg", "trailer": "https://www.youtube.com/watch?v=SUXWAEX2jlg", "description": "Um trabalhador insone e um vendedor de sabão formam um clube secreto." },
          { "title": "Pulp Fiction", "genre": "Crime", "rating": "8.9", "duration": "2h 34min", "year": "1994", "image": "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", "trailer": "https://www.youtube.com/watch?v=s7EdQ4FqbhY", "description": "Histórias de crime cruzam-se numa narrativa icónica." },
          { "title": "O Iluminado", "genre": "Terror", "rating": "8.4", "duration": "2h 26min", "year": "1980", "image": "https://image.tmdb.org/t/p/w500/nRj5511mZdTl4saWEPoj9QroTIu.jpg", "trailer": "https://www.youtube.com/watch?v=5Cb3ik6zP2I", "description": "Uma família isolada num hotel é afetada por forças sinistras." },
          { "title": "Scarface", "genre": "Crime", "rating": "8.3", "duration": "2h 50min", "year": "1983", "image": "https://image.tmdb.org/t/p/w500/iQ5ztdjvteGeboxtmRdXEChJOHh.jpg", "trailer": "https://www.youtube.com/watch?v=7pQQHnqBa2E", "description": "A ascensão e queda de um imigrante cubano no mundo das drogas." },
          { "title": "Taxi Driver", "genre": "Drama", "rating": "8.2", "duration": "1h 54min", "year": "1976", "image": "https://image.tmdb.org/t/p/w500/ekstpH614fwDX8DUln1a2Opz0N8.jpg", "trailer": "https://www.youtube.com/watch?v=sLpMx8yH3iM", "description": "Um veterano de guerra torna-se motorista de táxi e vigia noturno." },
          { "title": "Alien: O Oitavo Passageiro", "genre": "Sci-Fi", "rating": "8.5", "duration": "1h 57min", "year": "1979", "image": "https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg", "trailer": "https://www.youtube.com/watch?v=LjLamj-b0I8", "description": "Uma criatura mortal caça a tripulação de uma nave espacial." },
          { "title": "Psicose", "genre": "Suspense", "rating": "8.5", "duration": "1h 49min", "year": "1960", "image": "https://image.tmdb.org/t/p/w500/81ve8PJh51tEyXGj8NqxPnQhYut.jpg", "trailer": "https://www.youtube.com/watch?v=DT3Q4O9E6vA", "description": "Uma secretária em fuga hospeda-se num motel isolado." },
          { "title": "O Poderoso Chefão", "genre": "Drama", "rating": "9.2", "duration": "2h 55min", "year": "1972", "image": "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", "trailer": "https://www.youtube.com/watch?v=sY1S34973zA", "description": "A história da família Corleone no mundo do crime." }
        ]
      }
    ]
  };

  // ═══════════════════════════════════════════════════
  //  CARREGAR FILMES (fetch ou fallback)
  // ═══════════════════════════════════════════════════
  let allMoviesData = [];

  function createCardHTML(movie, index) {
    const isNew = movie.rating === '—' || movie.duration === 'Em Breve';
    const badgeHTML = isNew ? '<div class="card-badge-new">NOVO</div>' : '';
    const rankHTML = index < 10 ? `<div class="card-rank">${index + 1}</div>` : '';

    return `
      <div class="card" data-trailer="${movie.trailer}" data-index="${allMoviesData.length}">
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

  function renderMovies(data) {
    allMoviesData = [];
    data.categories.forEach(category => {
      const row = document.getElementById(category.id);
      if (!row) return;

      let html = '';
      category.movies.forEach((movie, index) => {
        allMoviesData.push(movie);
        html += createCardHTML(movie, index);
      });
      row.innerHTML = html;
    });

    setupCardEvents();
    setupIntersectionObserver();
  }

  function loadMovies() {
    // Tenta carregar do filmes.json (funciona em deploy)
    fetch('filmes.json')
      .then(response => {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(data => {
        renderMovies(data);
        console.log('🎬 NOXFLIX — Dados carregados do filmes.json');
      })
      .catch(() => {
        // Fallback: usa dados inline (funciona localmente)
        console.log('📁 NOXFLIX — Usando dados fallback (modo local)');
        renderMovies(filmesDataFallback);
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

    // ─── CARDS — CLICK PARA DETALHES ───
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-play-btn') || e.target.closest('.card-fav-btn')) return;
        openCardDetailsModal(card);
      });
    });
  }

  // ═══════════════════════════════════════════════════
  //  MODAL DE DETALHES DO CARD
  // ═══════════════════════════════════════════════════
  function openCardDetailsModal(card) {
    const index = parseInt(card.dataset.index);
    const movie = allMoviesData[index];
    if (!movie) return;

    const detailsBody = document.getElementById('detailsBody');
    const detailsModal = document.getElementById('detailsModal');

    detailsBody.innerHTML = `
      <div class="details-section">
        <div class="details-label">🎬 NOME</div>
        <div class="details-value"><strong>${movie.title}</strong></div>
      </div>
      <div class="details-section">
        <div class="details-label">📅 ANO</div>
        <div class="details-value"><strong>${movie.year}</strong></div>
      </div>
      <div class="details-section">
        <div class="details-label">⏱️ DURAÇÃO</div>
        <div class="details-value"><strong>${movie.duration}</strong></div>
      </div>
      <div class="details-section">
        <div class="details-label">🎭 GÊNERO</div>
        <div class="details-tags"><span>${movie.genre}</span></div>
      </div>
      <div class="details-section">
        <div class="details-label">⭐ AVALIAÇÃO</div>
        <div class="details-value"><strong>${movie.rating}/10</strong></div>
      </div>
      <div class="details-divider"></div>
      <div class="details-section">
        <div class="details-label">📖 SOBRE</div>
        <div class="details-desc">${movie.description}</div>
      </div>
    `;

    detailsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

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
    row.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };

  // ═══════════════════════════════════════════════════
  //  MODAL DO TRAILER
  // ═══════════════════════════════════════════════════
  const modal = document.getElementById('trailerModal');
  const modalClose = document.getElementById('modalClose');
  const iframe = document.getElementById('trailerIframe');

  function openTrailerModal(trailerUrl) {
    if (trailerUrl && trailerUrl !== 'SEU_LINK_TRAILER' && trailerUrl !== '#' && trailerUrl !== '') {
      let embedUrl = trailerUrl;
      if (trailerUrl.includes('watch?v=')) {
        const videoId = trailerUrl.split('v=')[1]?.split('&')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      } else if (trailerUrl.includes('youtu.be/')) {
        const videoId = trailerUrl.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      } else if (!trailerUrl.includes('embed')) {
        embedUrl = trailerUrl;
      } else {
        embedUrl = trailerUrl.includes('?') ? `${trailerUrl}&autoplay=1` : `${trailerUrl}?autoplay=1`;
      }
      iframe.src = embedUrl;
    } else {
      iframe.src = 'about:blank';
      iframe.srcdoc = '<html style="background:#0B0B0B;display:flex;align-items:center;justify-content:center;height:100%"><div style="text-align:center;color:#555;font-family:sans-serif"><div style="font-size:3rem;margin-bottom:16px">🎬</div><p style="font-size:1rem">Adicione um link de trailer no <code style="color:#E50914">data-trailer</code></p></div></html>';
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // ═══════════════════════════════════════════════════
  //  MODAL DE DETALHES — HERO
  // ═══════════════════════════════════════════════════
  const detailsData = [
    {
      emoji: '🪄', title: 'Como Magica', duration: '2h 11min',
      genre: 'Fantasia • Aventura • Mistério', rating: '8.7/10',
      desc: 'Em um reino escondido entre dimensões, uma jovem descobre possuir poderes capazes de alterar a própria realidade. Enquanto forças sombrias tentam dominar o mundo mágico, ela precisará aprender a controlar suas habilidades antes que tudo seja destruído.',
      highlights: ['efeitos visuais mágicos', 'criaturas fantásticas', 'atmosfera cinematográfica', 'trilha épica']
    },
    {
      emoji: '🦸', title: 'Vingadores: Ultimato', duration: '3h 01min',
      genre: 'Ação • Ficção Científica • Super-herói', rating: '8.9/10',
      desc: 'Após a destruição causada por Thanos, os heróis restantes precisam se unir em uma missão desesperadora para restaurar o universo e mudar o destino de bilhões de vidas.',
      highlights: ['batalhas épicas', 'viagem no tempo', 'emoção intensa', 'encerramento histórico da saga']
    },
    {
      emoji: '⚒️', title: 'A Forja', duration: '2h 03min',
      genre: 'Drama • Motivacional • Fé', rating: '8.3/10',
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
        <div class="details-label"><span style="font-family:Outfit,sans-serif">${data.emoji}</span> NOME</div>
        <div class="details-value"><strong>${data.title}</strong></div>
      </div>
      <div class="details-section">
        <div class="details-label">⏱️ DURAÇÃO</div>
        <div class="details-value"><strong>${data.duration}</strong></div>
      </div>
      <div class="details-section">
        <div class="details-label">🎭 GÊNERO</div>
        <div class="details-tags">${data.genre.split(' • ').map(g => `<span>${g}</span>`).join('')}</div>
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
        <div class="details-highlights">${data.highlights.map(h => `<span>✦ ${h}</span>`).join('')}</div>
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
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => { btn.style.transform = ''; }, 300);
    } else {
      btn.textContent = '♡';
    }
  };

  // ═══════════════════════════════════════════════════
  //  SEARCH
  // ═══════════════════════════════════════════════════
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          searchInput.blur();
          searchInput.style.borderColor = '#E50914';
          setTimeout(() => { searchInput.style.borderColor = ''; }, 1000);
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
  //  INICIAR
  // ═══════════════════════════════════════════════════
  document.querySelectorAll('.cards-row').forEach((row) => {
    row.style.minHeight = '280px';
  });

  loadMovies();
});