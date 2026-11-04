/**
 * Leonor Costa Guedes — Portfolio Engine
 * Clean Geometric System, Multilingual i18n (PT/EN) & GitHub Sync
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
    nav_competencias: "Competências",
    nav_contacto: "Contacto",

    // Hero
    hero_status: "Engenharia Informática @ IST • Disponível para Desafios",
    hero_role: "Estudante de Engenharia Informática no IST • SINFO Dev Team • Game Dev",
    hero_bio: "Dedicada à criação de software de alto desempenho, arquiteturas de sistemas robustas e game development. Combino rigor técnico de engenharia com gosto pelo trabalho colaborativo e aprendizagem contínua.",
    meta_inst_label: "Instituição",
    meta_loc_label: "Localização",
    meta_focus_label: "Áreas de Foco",
    hero_btn_projects: "Ver Projetos",
    hero_btn_contact: "Contactar",

    // Sobre
    sobre_tag: "PERFIL PROFISSIONAL",
    sobre_title: "Sobre Mim",
    sobre_sub: "Engenharia rigorosa, arquiteturas de sistemas e espírito de equipa.",
    sobre_quote: "\"Focada, altamente empenhada e movida por uma profunda curiosidade técnica, sou uma estudante de Engenharia Informática e de Computadores dedicada à criação de software de alto desempenho e arquiteturas de sistemas robustas. Procuro uma experiência profissional enriquecedora que desafie as minhas competências técnicas e me permita contribuir para projetos relevantes.\"",
    card1_title: "Backend & Arquiteturas",
    card1_text: "Construção de aplicações escaláveis e serviços modulares em Go, C#, Python e Next.js. Foco em APIs RESTful, modelação de bases de dados (PostgreSQL, MongoDB) e conteinerização em Docker.",
    card2_title: "Game Dev & Equipa",
    card2_text: "Membro do núcleo de Game Dev Técnico. Colaboração estreita em equipas multidisciplinares no desenvolvimento de jogos em Unity e Godot, incluindo um título atualmente em produção para a Steam.",
    card3_title: "Sistemas & Baixo Nível",
    card3_text: "Bases sólidas do IST em sistemas operativos, processos concorrentes, comunicação em rede via sockets, gestão de memória e desenvolvimento em C/C++ e interfaces de terminal com ncurses.",

    // Formação
    formacao_tag: "PERCURSO ACADÉMICO",
    formacao_title: "Formação Académica",
    formacao_sub: "Ensino superior de excelência no Instituto Superior Técnico e percurso secundário.",
    edu_ist_degree: "Licenciatura em Engenharia Informática e de Computadores",
    edu_ist_date: "Setembro de 2024 — Presente",
    edu_ist_grade: "Média: 15,6 / 20",
    edu_courses_title: "Unidades Curriculares Nucleares & Classificações:",
    course1_name: "Lógica para Programação",
    course2_name: "Interação Pessoa-Máquina",
    course3_name: "Programação Orientada a Objetos",
    course4_name: "Sistemas Operativos",
    edu_sec_degree: "Ensino Secundário (Ciências e Tecnologias)",
    edu_sec_date: "Setembro de 2021 — Junho de 2024",
    edu_sec_grade: "Média: 19 / 20",
    edu_sec_desc: "Conclusão com distinção e sólida preparação em Matemática, Física e lógica analítica.",

    // Experiência
    exp_tag: "EXPERIÊNCIA & COLABORAÇÃO",
    exp_title: "Experiência",
    exp_sub: "Envolvimento ativo em núcleos e desenvolvimento tecnológico no ecossistema universitário.",
    sinfo_date: "Novembro de 2025 — Presente",
    sinfo_role: "Membro da Equipa de Desenvolvimento",
    sinfo_bullet1: "Desenvolvimento de soluções de software de alto desempenho para as aplicações web da conferência, utilizando uma stack tecnológica diversificada que inclui Go, Next.js, C# e JavaScript.",
    sinfo_bullet2: "Colaboração estreita com a comissão organizadora e colegas de desenvolvimento para garantir uma execução técnica impecável na maior conferência de tecnologia organizada por estudantes em Portugal.",
    gamedev_date: "Dezembro de 2025 — Presente",
    gamedev_role: "Membro",
    gamedev_bullet1: "Colaboração em equipas multidisciplinares, resolvendo desafios técnicos num ambiente dinâmico e acelerado de desenvolvimento de jogos.",
    gamedev_bullet2: "Atualmente a desenvolver um projeto colaborativo de um jogo que está previsto ser publicado e lançado na plataforma Steam.",

    // Projetos
    projetos_tag: "ENGENHARIA DE SOFTWARE",
    projetos_title: "Projetos Pessoais & Académicos",
    projetos_sub: "Aplicações full-stack, comunicação em rede de baixo nível e repositórios de código aberto.",
    proj1_kicker: "PROJETO EM DESTAQUE • FULL-STACK",
    proj1_title: "Plataforma de Gestão de Exames",
    proj1_desc: "Desenvolvimento de uma aplicação web full-stack concebida para a gestão abrangente de exames, classificação, administração escolar e análise estatística com controlo seguro de permissões.",
    proj2_kicker: "SISTEMAS & REDES • BAIXO NÍVEL",
    proj2_title: "Jogo Pacman Cliente-Servidor",
    proj2_desc: "Implementação de renderização baseada em terminal utilizando a biblioteca ncurses e gestão da troca de dados em tempo real através de comunicação em rede (sockets). Gestão de estados concorrentes, suporte a múltiplos clientes e parsing de níveis personalizados.",
    btn_view_repo: "Repositório no GitHub",
    btn_view_github_profile: "Explorar no GitHub",
    other_repos_title: "Outros Repositórios no GitHub",
    link_all_repos: "Ver todos no GitHub",
    view_code: "Ver Código",

    // Competências
    skills_tag: "MATRIZ TÉCNICA",
    skills_title: "Competências",
    skills_sub: "Stack de desenvolvimento, bases de dados, técnicas de engenharia e idiomas.",
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
    contacto_tag: "VAMOS CONVERSAR",
    contacto_title: "Contacto",
    contacto_sub: "Disponível para discutir projetos, oportunidades profissionais e colaborações técnicas.",
    contact_label_email: "E-mail Principal",
    contact_label_phone: "Telefone",
    footer_sub: "Engenharia Informática @ IST • Lisboa, Portugal",
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

    // Hero
    hero_status: "Computer Science @ IST • Open to Challenges",
    hero_role: "Computer Science Student @ IST • SINFO Dev Team • Game Dev",
    hero_bio: "Dedicated to creating high-performance software, robust system architectures, and game development. Combining disciplined engineering rigor with a passion for teamwork and continuous learning.",
    meta_inst_label: "Institution",
    meta_loc_label: "Location",
    meta_focus_label: "Focus Areas",
    hero_btn_projects: "View Projects",
    hero_btn_contact: "Contact Me",

    // Sobre
    sobre_tag: "PROFESSIONAL PROFILE",
    sobre_title: "About Me",
    sobre_sub: "Rigorous engineering, system architectures, and collaborative drive.",
    sobre_quote: "\"Focused, highly committed, and driven by deep technical curiosity, I am a Computer Science and Engineering student dedicated to creating high-performance software and robust system architectures. I seek an enriching professional experience that challenges my technical skills and allows me to contribute to relevant projects.\"",
    card1_title: "Backend & Architecture",
    card1_text: "Building scalable applications and modular services in Go, C#, Python, and Next.js. Focused on RESTful APIs, database modeling (PostgreSQL, MongoDB), and Docker containerization.",
    card2_title: "Game Dev & Teamwork",
    card2_text: "Member of Game Dev Técnico. Close collaboration within multidisciplinary teams developing games in Unity and Godot, including a project currently in production for Steam.",
    card3_title: "Systems & Low-Level",
    card3_text: "Solid IST foundations in operating systems, concurrent processes, network sockets, memory management, and development in C/C++ with ncurses terminal interfaces.",

    // Formação
    formacao_tag: "ACADEMIC BACKGROUND",
    formacao_title: "Education",
    formacao_sub: "Top-tier higher education at Instituto Superior Técnico and secondary education.",
    edu_ist_degree: "BSc in Computer Science and Engineering",
    edu_ist_date: "September 2024 — Present",
    edu_ist_grade: "GPA: 15.6 / 20",
    edu_courses_title: "Core Coursework & Grades:",
    course1_name: "Logic for Programming",
    course2_name: "Human-Computer Interaction",
    course3_name: "Object-Oriented Programming",
    course4_name: "Operating Systems",
    edu_sec_degree: "Secondary Education (Sciences & Technology)",
    edu_sec_date: "September 2021 — June 2024",
    edu_sec_grade: "GPA: 19 / 20",
    edu_sec_desc: "Graduated with honors, with strong foundations in Mathematics, Physics, and analytical logic.",

    // Experiência
    exp_tag: "EXPERIENCE & COLLABORATION",
    exp_title: "Experience",
    exp_sub: "Active student organization involvement and technical development within university.",
    sinfo_date: "November 2025 — Present",
    sinfo_role: "Dev Team Member",
    sinfo_bullet1: "Developing high-performance software solutions for conference web applications utilizing a diverse stack including Go, Next.js, C#, and JavaScript.",
    sinfo_bullet2: "Collaborating closely with the organizing committee and development peers to ensure seamless technical execution for Portugal’s largest student-run tech conference.",
    gamedev_date: "December 2025 — Present",
    gamedev_role: "Member",
    gamedev_bullet1: "Collaborating closely within multidisciplinary teams, solving technical challenges in a dynamic and fast-paced game development environment.",
    gamedev_bullet2: "Currently developing a collaborative game project scheduled to be published and released on the Steam platform.",

    // Projetos
    projetos_tag: "SOFTWARE ENGINEERING",
    projetos_title: "Personal & Academic Projects",
    projetos_sub: "Full-stack web applications, low-level networked systems, and open-source repositories.",
    proj1_kicker: "FEATURED PROJECT • FULL-STACK",
    proj1_title: "Exam Management Platform",
    proj1_desc: "Developed a full-stack web application designed for comprehensive exam management, grading, school administration, and statistical analysis with granular access control.",
    proj2_kicker: "SYSTEMS & NETWORKING • LOW-LEVEL",
    proj2_title: "Client-Server Pacman Game",
    proj2_desc: "Implemented terminal-based rendering utilizing the ncurses library and real-time network data communication. Handled concurrent game states, multiple client connections, and custom level parsing.",
    btn_view_repo: "GitHub Repository",
    btn_view_github_profile: "Explore on GitHub",
    other_repos_title: "Other GitHub Repositories",
    link_all_repos: "View all on GitHub",
    view_code: "View Code",

    // Competências
    skills_tag: "TECHNICAL MATRIX",
    skills_title: "Skills & Tech Stack",
    skills_sub: "Development stack, databases, engineering techniques, and spoken languages.",
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
    contacto_tag: "GET IN TOUCH",
    contacto_title: "Contact",
    contacto_sub: "Open to discussing software projects, professional opportunities, and technical collaborations.",
    contact_label_email: "Primary Email",
    contact_label_phone: "Phone",
    footer_sub: "Computer Science @ IST • Lisbon, Portugal",
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
  const mobileImg = document.getElementById('hero-profile-img-mobile');

  try {
    const res = await fetch('https://api.github.com/users/LeoPlix');
    if (res.ok) {
      const data = await res.json();
      if (data.avatar_url) {
        if (desktopImg) desktopImg.src = data.avatar_url;
        if (mobileImg) mobileImg.src = data.avatar_url;
      }
    }
  } catch (err) {
    console.warn('Avatar fallback used:', err);
  }
}

/* --------------------------------------------------------------------------
   5. GitHub Repositories Sync
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
    card.className = 'repo-geo-card';

    let desc = repo.description;
    if (repo[`description_${currentLang}`]) {
      desc = repo[`description_${currentLang}`];
    } else if (!desc) {
      desc = currentLang === 'pt' ? 'Repositório de código aberto no GitHub.' : 'Open source repository on GitHub.';
    }

    card.innerHTML = `
      <div>
        <div class="repo-card-header">
          <span class="repo-lang-tag">${escapeHTML(lang)}</span>
          <span class="repo-stars">
            <i class="fa-regular fa-star"></i> ${repo.stargazers_count || 0}
          </span>
        </div>

        <h4 class="repo-card-title">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(formatRepoName(repo.name))}
          </a>
        </h4>

        <p class="repo-card-desc">
          ${escapeHTML(desc)}
        </p>
      </div>

      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card-link">
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
