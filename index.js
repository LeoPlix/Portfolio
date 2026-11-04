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
    hero_greeting: "Olá, sou a Leonor,",
    hero_h1_part1: "A SOFTWARE",
    hero_h1_part2: "& Game Dev",
    hero_h1_part3: "ENGINEER",
    hero_subtext: "Estudante de Engenharia Informática no IST. Desenvolvo software com foco em sistemas de alto desempenho, arquiteturas robustas e desenvolvimento colaborativo de jogos para a Steam.",
    hero_btn_contact: "CONTACTAR",
    hero_btn_projects: "VER PROJETOS",

    // Stats
    stat_gpa_label: "Média Licenciatura IST",
    stat_logic_label: "Lógica para Programação",
    stat_sec_label: "Média Ensino Secundário",
    stat_sinfo_label: "SINFO & Game Dev Técnico",

    // 4-Column Feature Strip
    feat1_title: "BACKEND & ARQUITETURA",
    feat1_desc: "Serviços escaláveis e ferramentas em Go, C#, Next.js, Docker e bases de dados relacionais e NoSQL.",
    feat2_title: "GAME DEV & STEAM",
    feat2_desc: "Trabalho colaborativo no Game Dev Técnico em Unity e Godot, direcionado para lançamento na Steam.",
    feat3_title: "SISTEMAS & BAIXO NÍVEL",
    feat3_desc: "Programação em C/C++, troca de dados em tempo real via sockets de rede e ncurses.",
    feat4_title: "FORMAÇÃO NO IST",
    feat4_desc: "Rigor analítico, síntese de algoritmos complexos, sistemas operativos e estruturas de dados.",

    // Tech Strip
    tech_strip_title: "STACK TECNOLÓGICA",
    tech_strip_sub: "Linguagens, ferramentas e ambientes aplicados no IST e projetos",

    // Sobre
    sobre_big_title: "CRIANDO SOFTWARE EFICIENTE & ARQUITETURAS ROBUSTAS",
    sobre_lead: "Focada, altamente empenhada e movida por uma profunda curiosidade técnica, sou uma estudante de Engenharia Informática e de Computadores dedicada à criação de software de alto desempenho e arquiteturas de sistemas robustas.",
    sobre_body: "Procuro uma experiência profissional enriquecedora que desafie as minhas competências técnicas e me permita contribuir para projetos relevantes. A minha abordagem combina uma mentalidade de engenharia disciplinada com uma paixão pela aprendizagem contínua, colaboração multidisciplinar e resolução de problemas complexos.",

    // Formação
    formacao_kicker: "PERCURSO ACADÉMICO",
    formacao_title: "FORMAÇÃO ACADÉMICA",
    formacao_sub: "Ensino superior no Instituto Superior Técnico e ensino secundário com distinção.",
    edu_ist_degree: "Licenciatura em Engenharia Informática e de Computadores",
    stamp_gpa: "MÉDIA GLOBAL",
    edu_ist_date: "Setembro de 2024 — Presente",
    edu_courses_subtitle: "Unidades Curriculares Nucleares & Classificações:",
    course1_name: "Lógica para Programação",
    course2_name: "Interação Pessoa-Máquina",
    course3_name: "Programação Orientada a Objetos",
    course4_name: "Sistemas Operativos",
    edu_sec_degree: "Ensino Secundário (Ciências e Tecnologias)",
    stamp_sec_gpa: "MÉDIA FINAL",
    edu_sec_date: "Setembro de 2021 — Junho de 2024",
    edu_sec_desc: "Conclusão com distinção, desenvolvendo alicerces sólidos em Matemática, Física e resolução sistemática de problemas lógicos.",

    // Experiência
    exp_kicker: "COLABORAÇÃO & NÚCLEOS",
    exp_title: "EXPERIÊNCIA",
    exp_sub: "Envolvimento técnico em organizações académicas e desenvolvimento de jogos.",
    sinfo_date: "Novembro de 2025 — Presente",
    sinfo_role: "Membro da Equipa de Desenvolvimento",
    sinfo_bullet1: "Desenvolvimento de soluções de software de alto desempenho para as aplicações web da conferência, utilizando uma stack tecnológica diversificada que inclui Go, Next.js, C# e JavaScript.",
    sinfo_bullet2: "Colaboração estreita com a comissão organizadora e colegas de desenvolvimento para garantir uma execução técnica impecável na maior conferência de tecnologia organizada por estudantes em Portugal.",
    gamedev_date: "Dezembro de 2025 — Presente",
    gamedev_role: "Membro",
    gamedev_bullet1: "Colaboração em equipas multidisciplinares, resolvendo desafios técnicos num ambiente dinâmico e acelerado de desenvolvimento de jogos.",
    gamedev_bullet2: "Atualmente a desenvolver um projeto colaborativo de um jogo que está previsto ser publicado e lançado na plataforma Steam.",

    // Projetos
    proj_kicker: "CASOS DE ESTUDO & SOFTWARE",
    proj_title: "PORTFOLIO",
    proj_sub: "Aplicações full-stack, sistemas em rede de baixo nível e repositórios de código aberto.",
    proj1_badge: "FULL-STACK WEB PLATFORM",
    proj1_title: "Plataforma de Gestão de Exames",
    proj1_desc: "Desenvolvimento de uma aplicação web full-stack concebida para a gestão abrangente de exames, classificação, administração escolar e análise estatística, integrando controlo seguro de acessos e arquitetura modular.",
    btn_view_repo: "Ver no GitHub",
    proj2_badge: "SISTEMAS & REDES • BAIXO NÍVEL",
    proj2_title: "Jogo Pacman Cliente-Servidor",
    proj2_desc: "Implementação de renderização baseada em terminal utilizando a biblioteca ncurses e gestão da troca de dados em tempo real através de comunicação em rede (sockets). Gestão de estados de jogo concorrentes, suporte a múltiplas ligações de clientes e lógica de parsing de níveis personalizados.",
    btn_view_github_profile: "Explorar Código",
    other_repos_title: "OUTROS REPOSITÓRIOS NO GITHUB",
    link_all_repos: "Ver todos no GitHub",
    view_code: "Ver Código",

    // Competências
    skills_kicker: "COMPETÊNCIAS TÉCNICAS",
    skills_title: "SKILLS & TECNOLOGIAS",
    skills_sub: "Matriz de competências técnicas, bases de dados e ferramentas de engenharia.",
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
    contacto_kicker: "VAMOS CONVERSAR",
    contacto_title: "CONTACTO",
    contacto_sub: "Disponível para discutir projetos de engenharia de software, game dev ou oportunidades de estágio.",
    contact_label_email: "E-mail Principal",
    contact_label_phone: "Telefone",
    footer_sub: "Engenharia Informática no Instituto Superior Técnico • Lisboa, Portugal",
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
    hero_greeting: "Hey, I'm Leonor,",
    hero_h1_part1: "A SOFTWARE",
    hero_h1_part2: "& Game Dev",
    hero_h1_part3: "ENGINEER",
    hero_subtext: "Computer Science student at IST. I develop high-performance software, robust system architectures, and collaborative games for Steam.",
    hero_btn_contact: "CONTACT ME",
    hero_btn_projects: "VIEW PROJECTS",

    // Stats
    stat_gpa_label: "BSc GPA at IST",
    stat_logic_label: "Logic for Programming",
    stat_sec_label: "Secondary Education GPA",
    stat_sinfo_label: "SINFO & Game Dev Técnico",

    // 4-Column Feature Strip
    feat1_title: "BACKEND & ARCHITECTURE",
    feat1_desc: "Scalable services and tools in Go, C#, Next.js, Docker, and relational & NoSQL databases.",
    feat2_title: "GAME DEV & STEAM",
    feat2_desc: "Multidisciplinary game development in Unity & Godot with planned release on Steam.",
    feat3_title: "SYSTEMS & LOW-LEVEL",
    feat3_desc: "C/C++ programming, real-time data exchange via network sockets, and ncurses.",
    feat4_title: "IST ENGINEERING",
    feat4_desc: "Analytical rigor, synthesis of complex algorithms, operating systems, and data structures.",

    // Tech Strip
    tech_strip_title: "TECH STACK & TOOLS",
    tech_strip_sub: "Languages, tools, and environments applied across IST coursework and projects",

    // Sobre
    sobre_big_title: "CRAFTING HIGH-PERFORMANCE SOFTWARE & ROBUST SYSTEMS",
    sobre_lead: "Focused, highly committed, and driven by deep technical curiosity, I am a Computer Science and Engineering student dedicated to creating high-performance software and robust system architectures.",
    sobre_body: "I seek an enriching professional experience that challenges my technical skills and allows me to contribute to relevant projects. My approach combines a disciplined engineering mindset with a passion for continuous learning, multidisciplinary teamwork, and solving complex problems.",

    // Formação
    formacao_kicker: "ACADEMIC BACKGROUND",
    formacao_title: "EDUCATION",
    formacao_sub: "Top-tier higher education at Instituto Superior Técnico and secondary education with honors.",
    edu_ist_degree: "BSc in Computer Science and Engineering",
    stamp_gpa: "GLOBAL GPA",
    edu_ist_date: "September 2024 — Present",
    edu_courses_subtitle: "Core Coursework & Grades:",
    course1_name: "Logic for Programming",
    course2_name: "Human-Computer Interaction",
    course3_name: "Object-Oriented Programming",
    course4_name: "Operating Systems",
    edu_sec_degree: "Secondary Education (Sciences & Technology)",
    stamp_sec_gpa: "FINAL GPA",
    edu_sec_date: "September 2021 — June 2024",
    edu_sec_desc: "Graduated with honors, establishing strong foundations in Mathematics, Physics, and analytical logic.",

    // Experiência
    exp_kicker: "COLLABORATION & TEAMS",
    exp_title: "EXPERIENCE",
    exp_sub: "Technical involvement in student organizations and game development.",
    sinfo_date: "November 2025 — Present",
    sinfo_role: "Dev Team Member",
    sinfo_bullet1: "Developing high-performance software solutions for conference web applications utilizing a diverse stack including Go, Next.js, C#, and JavaScript.",
    sinfo_bullet2: "Collaborating closely with the organizing committee and development peers to ensure seamless technical execution for Portugal’s largest student-run tech conference.",
    gamedev_date: "December 2025 — Present",
    gamedev_role: "Member",
    gamedev_bullet1: "Collaborating closely within multidisciplinary teams, solving technical challenges in a dynamic and fast-paced game development environment.",
    gamedev_bullet2: "Currently developing a collaborative game project scheduled to be published and released on the Steam platform.",

    // Projetos
    proj_kicker: "CASE STUDIES & SOFTWARE",
    proj_title: "PORTFOLIO",
    proj_sub: "Full-stack web applications, low-level networked systems, and open-source repositories.",
    proj1_badge: "FULL-STACK WEB PLATFORM",
    proj1_title: "Exam Management Platform",
    proj1_desc: "Developed a full-stack web application designed for comprehensive exam management, grading, school administration, and statistical analysis with granular access control.",
    btn_view_repo: "View on GitHub",
    proj2_badge: "SYSTEMS & NETWORKING • LOW-LEVEL",
    proj2_title: "Client-Server Pacman Game",
    proj2_desc: "Implemented terminal-based rendering utilizing the ncurses library and real-time network data communication. Handled concurrent game states, multiple client connections, and custom level parsing.",
    btn_view_github_profile: "Explore Code",
    other_repos_title: "OTHER GITHUB REPOSITORIES",
    link_all_repos: "View all on GitHub",
    view_code: "View Code",

    // Competências
    skills_kicker: "TECHNICAL MATRIX",
    skills_title: "SKILLS & TECHNOLOGIES",
    skills_sub: "Technical matrix, databases, and engineering tools.",
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
    contacto_kicker: "GET IN TOUCH",
    contacto_title: "CONTACT",
    contacto_sub: "Open to discussing software engineering projects, game dev, or internship opportunities.",
    contact_label_email: "Primary Email",
    contact_label_phone: "Phone",
    footer_sub: "Computer Science at Instituto Superior Técnico • Lisbon, Portugal",
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
    description_pt: 'Motor de resolução lógica para o puzzle Star Battle (UC Lógica para Programação no IST: 20/20).',
    description_en: 'Logic solver engine for the Star Battle puzzle (Logic for Programming at IST: 20/20).',
    language: 'Prolog',
    stargazers_count: 0
  },
  {
    name: 'Library-Management-System',
    html_url: 'https://github.com/LeoPlix/Library-Management-System',
    description_pt: 'Sistema de gestão de biblioteca em C# com arquitetura orientada a objetos (UC POO no IST: 17/20).',
    description_en: 'Object-oriented C# library management system with loan tracking (OOP course at IST: 17/20).',
    language: 'C#',
    stargazers_count: 0
  },
  {
    name: 'SpeedWalkingPlatform',
    html_url: 'https://github.com/LeoPlix/Personal_Project-SpeedWalkingPlatform',
    description_pt: 'Plataforma em Go para cálculo de métricas de desempenho de marcha atlética.',
    description_en: 'Go platform for computing athletic speed walking metrics and progress analytics.',
    language: 'Go',
    stargazers_count: 0
  },
  {
    name: 'ASA-Project-Graph-Algorithms',
    html_url: 'https://github.com/LeoPlix/ASA-Project-1',
    description_pt: 'Algoritmos de grafos, conectividade e otimização em C++ (Análise e Síntese de Algoritmos).',
    description_en: 'Graph algorithms, connectivity, and optimization in C++ (Analysis and Synthesis of Algorithms).',
    language: 'C++',
    stargazers_count: 0
  },
  {
    name: 'Orbito-Strategy-Game',
    html_url: 'https://github.com/LeoPlix/Orbito-Strategy-Game-in-Python',
    description_pt: 'Implementação interativa do jogo de tabuleiro Orbito com heurísticas de avaliação em Python.',
    description_en: 'Interactive implementation of the Orbito board game with Python evaluation heuristics.',
    language: 'Python',
    stargazers_count: 0
  },
  {
    name: 'MNK-Game-Engine',
    html_url: 'https://github.com/LeoPlix/MNK-Game-in-Python',
    description_pt: 'Motor de jogo genérico m,n,k com algoritmos de pesquisa heurística.',
    description_en: 'Generic m,n,k board game engine with heuristic search algorithms.',
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
  const btnLabel = TRANSLATIONS[currentLang].view_code || 'Ver Código';

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
