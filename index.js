/**
 * Leonor Costa Guedes — Portfolio Engine
 * Editorial Architecture, Multilingual i18n (PT/EN) & GitHub Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initMobileMenu();
  initScrollSpy();
  fetchGitHubAvatar();
  fetchGitHubRepos();
});

/* --------------------------------------------------------------------------
   1. i18n Translation Dictionary & Switcher
   -------------------------------------------------------------------------- */
let currentLang = localStorage.getItem('portfolio_lang') || 'pt';

const TRANSLATIONS = {
  pt: {
    // Nav
    nav_sobre: "Sobre",
    nav_formacao: "Formação",
    nav_experiencia: "Experiência",
    nav_projetos: "Projetos",
    nav_competencias: "Skills",
    nav_contacto: "Contacto",
    nav_menu_btn: "MENU",

    // Hero
    hero_greeting: "Olá! Sou a Leonor,",
    hero_h1_part1: "SOFTWARE",
    hero_h1_part2: "NO TÉCNICO",
    hero_subtext: "Estudante de Engenharia Informática no Instituto Superior Técnico. Gosto de resolver problemas em backend, perceber como os sistemas funcionam por dentro e desenvolver projetos em equipa.",
    hero_btn_contact: "FALAR COMIGO",
    hero_btn_projects: "VER PROJETOS",

    // Stats
    stat_gpa_label: "Média Licenciatura IST",
    stat_logic_label: "Lógica para Programação",
    stat_sec_label: "Média Ensino Secundário",
    stat_sinfo_label: "SINFO & Game Dev Técnico",

    // 4-Column Feature Strip
    feat1_title: "BACKEND & APIS",
    feat1_desc: "Criar serviços e ferramentas em Go e C#, desenhar APIs REST e estruturar bases de dados relacionais e NoSQL.",
    feat2_title: "DESENVOLVIMENTO DE JOGOS",
    feat2_desc: "Trabalhar em equipa no núcleo de Game Dev do Técnico com Unity e Godot, a caminho de um lançamento na Steam.",
    feat3_title: "SISTEMAS & BAIXO NÍVEL",
    feat3_desc: "Programar em C/C++, lidar com sockets de rede em tempo real, processos concorrentes e interfaces em terminal.",
    feat4_title: "VIDA NO TÉCNICO",
    feat4_desc: "Aprender algoritmos a sério no IST, debugar código até tarde e colaborar ativamente nos núcleos académicos.",

    // Tech Strip
    tech_strip_title: "O QUE COSTUMO USAR",
    tech_strip_sub: "Linguagens e ferramentas com que já trabalhei em projetos e cadeiras do curso",

    // Sobre
    sobre_big_title: "UM POUCO SOBRE MIM",
    sobre_lead: "Focada, altamente empenhada e movida por uma profunda curiosidade técnica, sou estudante de Engenharia Informática e de Computadores no IST, dedicada à criação de software de alto desempenho e arquiteturas de sistemas robustas.",
    sobre_body: "Procuro uma experiência profissional enriquecedora que desafie as minhas competências técnicas e me permita contribuir para projetos relevantes. A minha abordagem combina uma mentalidade de engenharia disciplinada com uma paixão pela aprendizagem contínua, colaboração em equipa e resolução de problemas práticos.",

    // Formação
    formacao_kicker: "ONDE ESTUDEI",
    formacao_title: "FORMAÇÃO ACADÉMICA",
    formacao_sub: "O meu percurso escolar e as cadeiras onde mais me destaquei.",
    edu_ist_degree: "Licenciatura em Engenharia Informática e de Computadores",
    stamp_gpa: "MÉDIA ATUAL",
    edu_ist_date: "Setembro de 2024 — Presente",
    edu_courses_subtitle: "Algumas cadeiras concluídas e classificações:",
    course1_name: "Lógica para Programação",
    course2_name: "Interação Pessoa-Máquina",
    course3_name: "Programação Orientada a Objetos",
    course4_name: "Sistemas Operativos",
    edu_sec_degree: "Ensino Secundário (Ciências e Tecnologias)",
    stamp_sec_gpa: "MÉDIA FINAL",
    edu_sec_date: "Setembro de 2021 — Junho de 2024",
    edu_sec_desc: "Concluí o secundário com média de 19 valores, com grande foco em Matemática e Física antes de entrar no Técnico.",

    // Experiência
    exp_kicker: "NÚCLEOS & ATIVIDADES",
    exp_title: "EXPERIÊNCIA",
    exp_sub: "O que faço fora das salas de aula no IST.",
    sinfo_date: "Novembro de 2025 — Presente",
    sinfo_role: "Membro da Equipa de Desenvolvimento",
    sinfo_bullet1: "Desenvolvimento de soluções de software de alto desempenho para as aplicações web da conferência, utilizando uma stack tecnológica diversificada que inclui Go, Next.js, C# e JavaScript.",
    sinfo_bullet2: "Colaboração estreita com a comissão organizadora e colegas de desenvolvimento para garantir uma execução técnica impecável na maior conferência de tecnologia organizada por estudantes em Portugal.",
    gamedev_date: "Dezembro de 2025 — Presente",
    gamedev_role: "Membro",
    gamedev_bullet1: "Colaboração em equipas multidisciplinares, resolvendo desafios técnicos num ambiente dinâmico e acelerado de desenvolvimento de jogos.",
    gamedev_bullet2: "Atualmente a desenvolver um projeto colaborativo de um jogo que está previsto ser publicado e lançado na plataforma Steam.",

    // Projetos
    proj_kicker: "PROJETOS EM DESTAQUE",
    proj_title: "PORTFOLIO",
    proj_sub: "Algumas coisas que desenvolvi para cadeiras do curso e por iniciativa própria.",
    proj1_badge: "PROJETO WEB FULL-STACK",
    proj1_title: "Plataforma de Gestão de Exames",
    proj1_desc: "Aplicação web completa concebida para simplificar a gestão e agendamento de exames, pautas de avaliação escolar e análise estatística de notas, com autenticação e controlo de permissões.",
    btn_view_repo: "Ver no GitHub",
    proj2_badge: "SISTEMAS & REDES EM C",
    proj2_title: "Jogo Pacman Cliente-Servidor",
    proj2_desc: "Pacman multijogador em tempo real jogado no terminal através da biblioteca ncurses. Implementa comunicação em rede via sockets, gestão de múltiplos clientes em simultâneo e leitura de mapas personalizados.",
    btn_view_github_profile: "Ver no GitHub",
    other_repos_title: "OUTROS REPOSITÓRIOS NO GITHUB",
    link_all_repos: "Ver todos no GitHub",
    view_code: "Ver no GitHub",

    // Competências
    skills_kicker: "CONHECIMENTOS",
    skills_title: "SKILLS & TECNOLOGIAS",
    skills_sub: "As tecnologias e ferramentas que uso no dia a dia.",
    skills_cat_web: "Desenvolvimento Web & Backend",
    sk_backend: "Desenvolvimento Backend",
    sk_webdesign: "Web Design & Frontend",
    skills_cat_tools: "Bases de Dados & Ferramentas",
    skills_cat_techniques: "Técnicas & Sistemas",
    sk_apimgmt: "Gestão de APIs & REST",
    sk_sysarch: "Arquitetura de Sistemas",
    sk_gamedesign: "Design de Jogos",
    sk_physics: "Física 2D",
    skills_cat_languages: "Idiomas",
    lang_pt: "Português — Língua Materna / Nativo",
    lang_en: "Inglês — Fluente (Comunicação Técnica & Escrita)",

    // Contacto
    contacto_kicker: "MANDA MENSAGEM",
    contacto_title: "CONTACTO",
    contacto_sub: "Se quiseres conversar sobre tecnologia, jogos, estágio ou só dizer olá, manda mensagem!",
    contact_label_email: "E-mail Principal",
    contact_label_phone: "Telefone",
    footer_sub: "Estudante de Engenharia Informática no Instituto Superior Técnico • Lisboa, Portugal",
    back_top: "Topo"
  },
  en: {
    // Nav
    nav_sobre: "About",
    nav_formacao: "Education",
    nav_experiencia: "Experience",
    nav_projetos: "Projects",
    nav_competencias: "Skills",
    nav_contacto: "Contact",
    nav_menu_btn: "MENU",

    // Hero
    hero_greeting: "Hi! I'm Leonor,",
    hero_h1_part1: "SOFTWARE",
    hero_h1_part2: "AT TÉCNICO",
    hero_subtext: "Computer Science student at Instituto Superior Técnico in Lisbon. I like solving backend problems, understanding how systems work under the hood, and building projects in teams.",
    hero_btn_contact: "GET IN TOUCH",
    hero_btn_projects: "VIEW PROJECTS",

    // Stats
    stat_gpa_label: "BSc GPA at IST",
    stat_logic_label: "Logic for Programming",
    stat_sec_label: "Secondary School GPA",
    stat_sinfo_label: "SINFO & Game Dev Técnico",

    // 4-Column Feature Strip
    feat1_title: "BACKEND & APIS",
    feat1_desc: "Building services in Go & C#, designing REST APIs, and modeling SQL & NoSQL databases.",
    feat2_title: "GAME DEVELOPMENT",
    feat2_desc: "Building games with Game Dev Técnico in Unity & Godot, currently working on a Steam title.",
    feat3_title: "SYSTEMS & LOW-LEVEL",
    feat3_desc: "Writing C/C++, network communication via sockets, concurrency, and terminal-based interfaces.",
    feat4_title: "STUDENT LIFE @ IST",
    feat4_desc: "Tackling tough CS coursework at Técnico, learning deep algorithms, and building with student groups.",

    // Tech Strip
    tech_strip_title: "TOOLS & TECH I USE",
    tech_strip_sub: "Languages and tools I work with across university courses and personal projects",

    // Sobre
    sobre_big_title: "A BIT ABOUT ME",
    sobre_lead: "Focused, highly committed, and driven by deep technical curiosity, I am a Computer Science and Engineering student at IST dedicated to creating high-performance software and robust system architectures.",
    sobre_body: "I seek an enriching professional experience that challenges my technical skills and allows me to contribute to impactful projects. My approach combines a disciplined engineering mindset with a passion for continuous learning, teamwork, and practical problem-solving.",

    // Formação
    formacao_kicker: "ACADEMIC JOURNEY",
    formacao_title: "EDUCATION",
    formacao_sub: "My academic trajectory and top university coursework.",
    edu_ist_degree: "BSc in Computer Science and Engineering",
    stamp_gpa: "CURRENT GPA",
    edu_ist_date: "September 2024 — Present",
    edu_courses_subtitle: "Notable completed courses & grades:",
    course1_name: "Logic for Programming",
    course2_name: "Human-Computer Interaction",
    course3_name: "Object-Oriented Programming",
    course4_name: "Operating Systems",
    edu_sec_degree: "Secondary Education (Sciences & Technology)",
    stamp_sec_gpa: "FINAL GPA",
    edu_sec_date: "September 2021 — June 2024",
    edu_sec_desc: "Graduated secondary school with a 19/20 GPA, with strong focus on Math and Physics before entering IST.",

    // Experiência
    exp_kicker: "ACTIVITIES & GROUPS",
    exp_title: "EXPERIENCE",
    exp_sub: "What I'm building outside the lecture halls at IST.",
    sinfo_date: "November 2025 — Present",
    sinfo_role: "Dev Team Member",
    sinfo_bullet1: "Developing conference web applications with a tech stack that includes Go, Next.js, C#, and JavaScript.",
    sinfo_bullet2: "Collaborating closely with the organizing committee to make sure all tech runs seamlessly for Europe's largest student-organized tech conference.",
    gamedev_date: "December 2025 — Present",
    gamedev_role: "Member",
    gamedev_bullet1: "Collaborating in multidisciplinary teams to solve gameplay and engine mechanics challenges.",
    gamedev_bullet2: "Actively developing a collaborative game project scheduled to be published on Steam.",

    // Projetos
    proj_kicker: "FEATURED WORK",
    proj_title: "PORTFOLIO",
    proj_sub: "Things I've built for university coursework and personal curiosity.",
    proj1_badge: "FULL-STACK WEB APP",
    proj1_title: "Exam Management Platform",
    proj1_desc: "A full-stack web application built to manage exams, grade records, and class statistics with secure role-based access.",
    btn_view_repo: "View on GitHub",
    proj2_badge: "SYSTEMS & NETWORKING IN C",
    proj2_title: "Client-Server Pacman Game",
    proj2_desc: "Real-time multiplayer Pacman played in the terminal using ncurses, networked socket exchange, concurrency, and custom level parsing.",
    btn_view_github_profile: "View on GitHub",
    other_repos_title: "OTHER GITHUB REPOSITORIES",
    link_all_repos: "View all on GitHub",
    view_code: "View on GitHub",

    // Competências
    skills_kicker: "WHAT I KNOW",
    skills_title: "SKILLS & TECH",
    skills_sub: "Technologies and tools I use on a regular basis.",
    skills_cat_web: "Web & Backend Development",
    sk_backend: "Backend Development",
    sk_webdesign: "Web Design & Frontend",
    skills_cat_tools: "Databases & Tools",
    skills_cat_techniques: "Techniques & Systems",
    sk_apimgmt: "API Management & REST",
    sk_sysarch: "Systems Architecture",
    sk_gamedesign: "Game Design",
    sk_physics: "2D Physics",
    skills_cat_languages: "Languages",
    lang_pt: "Portuguese — Native Language",
    lang_en: "English — Fluent (Technical & Written Communication)",

    // Contacto
    contacto_kicker: "SAY HELLO",
    contacto_title: "CONTACT",
    contacto_sub: "Whether you'd like to talk about code, games, internship opportunities, or just say hi, feel free to reach out!",
    contact_label_email: "Primary Email",
    contact_label_phone: "Phone",
    footer_sub: "Computer Science student at Instituto Superior Técnico • Lisbon, Portugal",
    back_top: "Top"
  }
};

function initLanguageSwitcher() {
  const langToggleBtn = document.getElementById('lang-toggle');
  
  applyLanguage(currentLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('portfolio_lang', currentLang);
      applyLanguage(currentLang);
    });
  }
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  
  const langText = document.getElementById('lang-text');
  if (langText) {
    langText.textContent = lang === 'pt' ? 'PT' : 'EN';
  }

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      const icon = el.querySelector('i');
      if (icon) {
        el.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
            node.nodeValue = ' ' + TRANSLATIONS[lang][key];
          }
        });
      } else {
        el.textContent = TRANSLATIONS[lang][key];
      }
    }
  });

  const gridContainer = document.getElementById('projects-grid');
  if (gridContainer && window.currentReposData) {
    renderRepos(window.currentReposData, gridContainer);
  }
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   3. ScrollSpy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. Profile Avatar Fetch
   -------------------------------------------------------------------------- */
async function fetchGitHubAvatar() {
  const desktopImg = document.getElementById('hero-profile-img');

  try {
    const res = await fetch('https://api.github.com/users/LeoPlix');
    if (res.ok) {
      const data = await res.json();
      if (data.avatar_url && desktopImg) {
        desktopImg.src = data.avatar_url;
      }
    }
  } catch (err) {
    console.warn('Avatar fallback used:', err);
  }
}

/* --------------------------------------------------------------------------
   5. GitHub Repositories Sync & Editorial Cards Render
   -------------------------------------------------------------------------- */
const EXCLUDED_REPOS = ['ExamManagementPlatform', 'Portfolio'];

const FALLBACK_REPOS = [
  {
    name: 'Star-Battle-Solver',
    html_url: 'https://github.com/LeoPlix/Star-Battle-Solver',
    description_pt: 'Solver em Prolog para o puzzle Star Battle feito para a cadeira de Lógica para Programação (onde tirei 20!).',
    description_en: 'Logic solver in Prolog for the Star Battle puzzle built for Logic for Programming at IST (where I got 20/20!).',
    language: 'Prolog',
    stargazers_count: 0
  },
  {
    name: 'Library-Management-System',
    html_url: 'https://github.com/LeoPlix/Library-Management-System',
    description_pt: 'Sistema de gestão de biblioteca em C# com arquitetura orientada a objetos feito para POO no IST (17/20).',
    description_en: 'Object-oriented library management system in C# built for OOP at IST (17/20).',
    language: 'C#',
    stargazers_count: 0
  },
  {
    name: 'SpeedWalkingPlatform',
    html_url: 'https://github.com/LeoPlix/Personal_Project-SpeedWalkingPlatform',
    description_pt: 'Projeto pessoal em Go para registar e calcular métricas de rendimento de marcha atlética.',
    description_en: 'Personal Go platform for tracking and computing athletic speed walking performance metrics.',
    language: 'Go',
    stargazers_count: 0
  },
  {
    name: 'ASA-Project-Graph-Algorithms',
    html_url: 'https://github.com/LeoPlix/ASA-Project-1',
    description_pt: 'Algoritmos de grafos, caminhos e conectividade em C++ para Análise e Síntese de Algoritmos.',
    description_en: 'Graph algorithms, paths, and connectivity in C++ built for Analysis & Synthesis of Algorithms.',
    language: 'C++',
    stargazers_count: 0
  },
  {
    name: 'Orbito-Strategy-Game',
    html_url: 'https://github.com/LeoPlix/Orbito-Strategy-Game-in-Python',
    description_pt: 'Jogo de tabuleiro Orbito interativo em Python com avaliação de jogadas e pesquisa heurística.',
    description_en: 'Interactive Python implementation of the Orbito board game with move evaluation heuristics.',
    language: 'Python',
    stargazers_count: 0
  },
  {
    name: 'MNK-Game-Engine',
    html_url: 'https://github.com/LeoPlix/MNK-Game-in-Python',
    description_pt: 'Motor de jogo genérico m,n,k em Python com algoritmos de pesquisa heurística.',
    description_en: 'Generic m,n,k board game engine in Python with heuristic search algorithms.',
    language: 'Python',
    stargazers_count: 0
  }
];

async function fetchGitHubRepos() {
  const gridContainer = document.getElementById('projects-grid');
  const countBadge = document.getElementById('repos-count-badge');
  if (!gridContainer) return;

  try {
    const res = await fetch('https://api.github.com/users/LeoPlix/repos?sort=updated&per_page=100');
    if (!res.ok) throw new Error('API Rate Limit ou Erro HTTP');
    const repos = await res.json();
    const filtered = repos.filter(repo => !EXCLUDED_REPOS.includes(repo.name) && !repo.fork);

    if (filtered.length > 0) {
      window.currentReposData = filtered;
      renderRepos(filtered, gridContainer);
      if (countBadge) countBadge.textContent = `${filtered.length} Repositórios`;
    } else {
      window.currentReposData = FALLBACK_REPOS;
      renderRepos(FALLBACK_REPOS, gridContainer);
      if (countBadge) countBadge.textContent = `${FALLBACK_REPOS.length} Repositórios`;
    }
  } catch (err) {
    console.warn('Fallback repos loaded:', err);
    window.currentReposData = FALLBACK_REPOS;
    renderRepos(FALLBACK_REPOS, gridContainer);
    if (countBadge) countBadge.textContent = `${FALLBACK_REPOS.length} Repositórios`;
  }
}

function renderRepos(repos, container) {
  container.innerHTML = '';
  const btnLabel = TRANSLATIONS[currentLang].view_code || 'Ver no GitHub';

  repos.forEach(repo => {
    const lang = repo.language || 'Software';
    const card = document.createElement('article');
    card.className = 'repo-card-editorial';

    let desc = repo.description;
    if (repo[`description_${currentLang}`]) {
      desc = repo[`description_${currentLang}`];
    } else if (!desc) {
      desc = currentLang === 'pt' ? 'Repositório de código aberto no GitHub.' : 'Open source repository on GitHub.';
    }

    card.innerHTML = `
      <div>
        <div class="repo-card-top-line">
          <span class="repo-badge-lang">${escapeHTML(lang)}</span>
          <span class="repo-stars-count">
            <i class="fa-regular fa-star"></i> ${repo.stargazers_count || 0}
          </span>
        </div>

        <h4 class="repo-heading">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(formatRepoName(repo.name))}
          </a>
        </h4>

        <p class="repo-desc-text">
          ${escapeHTML(desc)}
        </p>
      </div>

      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-footer-link">
        <span>${btnLabel}</span>
        <i class="fa-solid fa-arrow-right"></i>
      </a>
    `;

    container.appendChild(card);
  });
}

function formatRepoName(name) {
  return name.replace(/[-_]/g, ' ');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
}
