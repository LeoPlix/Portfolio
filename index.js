/**
 * Leonor Guedes — Portfolio Engine
 * GitHub API Sync, i18n Multilingual Switcher (PT/EN) & Bubbly UI
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
    nav_sobre: "Sobre",
    nav_projetos: "Projetos",
    nav_experiencia: "Experiência",
    nav_skills: "Skills",
    nav_contacto: "Contacto",
    
    hero_pill: "Engenharia Informática @ IST",
    hero_sub: "SINFO Dev Team & Game Dev",
    hero_bio: "Estudante no Instituto Superior Técnico. Desenvolvo software com foco em código limpo e sistemas eficientes — desde projetos de engenharia em Go e C a jogos em Unity e Godot desenvolvidos em equipa para a Steam.",
    hero_btn_projects: "Explorar Projetos",

    sobre_title: "Sobre Mim",
    sobre_sub: "Rigor concetual, desenvolvimento prático e trabalho em equipa.",
    card1_title: "Engenharia & Algoritmos",
    card1_text: "Formação sólida nos alicerces da computação no IST: análise e síntese de algoritmos, sistemas operativos, estruturas de dados avançadas e arquitetura de computadores.",
    card2_title: "Desenvolvimento de Software",
    card2_text: "Foco em código legível, modular e escalável. Experiência prática na criação de ferramentas e serviços em Go, Python, C#, C/C++ e arquiteturas de sistemas.",
    card3_title: "Game Dev & Trabalho em Equipa",
    card3_text: "Membro ativa do núcleo autónomo de Game Dev Técnico, um espaço centrado no incentivo ao trabalho em equipa. Desenvolvemos jogos em Unity e Godot, trabalhando atualmente num projeto direcionado para publicação na Steam.",

    projetos_title: "Projetos",
    projetos_sub: "Destaque principal e repositórios no GitHub.",
    featured_tag: "Projeto em Destaque",
    featured_desc: "Plataforma modular desenvolvida para simplificar a gestão, agendamento e submissão de exames e avaliações académicas, garantindo controlo seguro de permissões e uma experiência fluida.",
    btn_github: "Ver no GitHub",
    other_repos_title: "Outros Repositórios",

    experiencia_title: "Experiência",
    experiencia_sub: "Atividades académicas, envolvimento em núcleos e desenvolvimento de software.",
    date_present: "2025 – Presente",
    exp1_role: "SINFO Dev Team • Infraestrutura & Operações",
    exp1_text: "Colaboração na organização e suporte tecnológico da maior conferência académica de informática da Europa, gerida exclusivamente por estudantes.",
    exp2_title: "Game Dev Técnico & Lançamento na Steam",
    exp2_role: "Núcleo Académico de Game Dev • Unity & Godot",
    exp2_text: "Membro ativa do núcleo de Game Dev Técnico, focado no trabalho de equipa, colaboração e partilha técnica. Desenvolvimento de jogos em motores como Unity e Godot, trabalhando ativamente na criação de um projeto para publicação na Steam.",
    exp3_role: "Licenciatura em Engenharia Informática e de Computadores",
    exp3_text: "Percurso académico exigente focado em Análise e Síntese de Algoritmos (ASA), Sistemas Operativos (SO), Estruturas de Dados e Engenharia de Software.",

    skills_title: "Skills & Tecnologias",
    skills_cat_languages: "Linguagens",
    skills_cat_web: "Web & Backend",
    skills_cat_tools: "Ferramentas & Game Dev",
    skill_backend_arch: "Arquitetura Backend",

    contacto_title: "Vamos conversar?",
    contacto_sub: "Disponível para discutir projetos de engenharia de software, desenvolvimento de jogos ou novas oportunidades de colaboração.",
    back_top: "Topo",
    view_code: "Ver no GitHub"
  },
  en: {
    nav_sobre: "About",
    nav_projetos: "Projects",
    nav_experiencia: "Experience",
    nav_skills: "Skills",
    nav_contacto: "Contact",
    
    hero_pill: "Computer Engineering @ IST",
    hero_sub: "SINFO Dev Team & Game Dev",
    hero_bio: "Computer Engineering student at Instituto Superior Técnico. I build clean, efficient software — from engineering projects in Go and C to team-developed games in Unity and Godot targeting Steam.",
    hero_btn_projects: "Explore Projects",

    sobre_title: "About Me",
    sobre_sub: "Conceptual rigor, practical development, and teamwork.",
    card1_title: "Engineering & Algorithms",
    card1_text: "Solid foundation in core computer science at IST: algorithm analysis, operating systems, advanced data structures, and computer architecture.",
    card2_title: "Software Development",
    card2_text: "Focus on clean, modular, and scalable code. Hands-on experience building tools and services in Go, Python, C#, C/C++, and system architectures.",
    card3_title: "Game Dev & Teamwork",
    card3_text: "Active member of Game Dev Técnico, a student group focused on teamwork and collaboration. We build games in Unity and Godot, currently working on a project for release on Steam.",

    projetos_title: "Projects",
    projetos_sub: "Main highlight and GitHub repositories.",
    featured_tag: "Featured Project",
    featured_desc: "Modular platform designed to streamline exam management, scheduling, and submission for academic assessments, ensuring secure access control and a smooth user experience.",
    btn_github: "View on GitHub",
    other_repos_title: "Other Repositories",

    experiencia_title: "Experience",
    experiencia_sub: "Academic activities, student organizations, and software development.",
    date_present: "2025 – Present",
    exp1_role: "SINFO Dev Team • Infrastructure & Operations",
    exp1_text: "Collaborating in organizing and providing technological support for Europe's largest student-run computer science conference.",
    exp2_title: "Game Dev Técnico & Steam Release",
    exp2_role: "Student Game Dev Group • Unity & Godot",
    exp2_text: "Active member of Game Dev Técnico, focusing on teamwork, collaboration, and technical sharing. Developing games in engines like Unity and Godot, actively working on a game for Steam publication.",
    exp3_role: "B.Sc. in Computer Science and Engineering",
    exp3_text: "Rigorous academic program focusing on Analysis and Synthesis of Algorithms (ASA), Operating Systems (SO), Data Structures, and Software Engineering.",

    skills_title: "Skills & Technologies",
    skills_cat_languages: "Languages",
    skills_cat_web: "Web & Backend",
    skills_cat_tools: "Tools & Game Dev",
    skill_backend_arch: "Backend Architecture",

    contacto_title: "Let's Talk",
    contacto_sub: "Open to discussing software engineering projects, game development, or new collaboration opportunities.",
    back_top: "Top",
    view_code: "View on GitHub"
  }
};

function initLanguageSwitcher() {
  const langToggleBtn = document.getElementById('lang-toggle');
  const langText = document.getElementById('lang-text');

  // Aplicar idioma guardado ou inicial
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
    langText.textContent = lang === 'pt' ? '🇵🇹 PT' : '🇬🇧 EN';
  }

  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      // Preservar ícones internos se existirem
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

  // Re-renderizar cartões do GitHub para atualizar texto do botão
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
   3. ScrollSpy for Active Section Highlighting
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
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   4. Fetch Profile Avatar
   -------------------------------------------------------------------------- */
async function fetchGitHubAvatar() {
  const avatarImg = document.getElementById('hero-profile-img');
  if (!avatarImg) return;

  try {
    const res = await fetch('https://api.github.com/users/LeoPlix');
    if (res.ok) {
      const data = await res.json();
      if (data.avatar_url) avatarImg.src = data.avatar_url;
    }
  } catch (err) {
    console.warn('Avatar fallback:', err);
  }
}

/* --------------------------------------------------------------------------
   5. GitHub Repos Sync & Bubbly Cards Render
   -------------------------------------------------------------------------- */
const EXCLUDED_REPOS = ['ExamManagementPlatform', 'Portfolio'];

const FALLBACK_REPOS = [
  {
    name: 'Star-Battle-Solver',
    html_url: 'https://github.com/LeoPlix/Star-Battle-Solver',
    description_pt: 'Motor de resolução lógica para o puzzle Star Battle (Lógica para Programação no IST).',
    description_en: 'Logic solver engine for the Star Battle puzzle (Logic for Programming at IST).',
    language: 'Prolog',
    stargazers_count: 0
  },
  {
    name: 'Library-Management-System',
    html_url: 'https://github.com/LeoPlix/Library-Management-System',
    description_pt: 'Sistema de gestão de biblioteca em C# com orientação a objetos e controlo de empréstimos.',
    description_en: 'Object-oriented C# library management system with book loan control.',
    language: 'C#',
    stargazers_count: 0
  },
  {
    name: 'Orbito-Strategy-Game-in-Python',
    html_url: 'https://github.com/LeoPlix/Orbito-Strategy-Game-in-Python',
    description_pt: 'Implementação interativa do jogo de tabuleiro Orbito com avaliação de jogadas.',
    description_en: 'Interactive Python implementation of the Orbito board game with move evaluation.',
    language: 'Python',
    stargazers_count: 0
  },
  {
    name: 'MNK-Game-in-Python',
    html_url: 'https://github.com/LeoPlix/MNK-Game-in-Python',
    description_pt: 'Motor de jogo m,n,k com algoritmos de pesquisa heurística.',
    description_en: 'General m,n,k board game engine with heuristic search algorithms.',
    language: 'Python',
    stargazers_count: 0
  },
  {
    name: 'Personal_Project-SpeedWalkingPlatform',
    html_url: 'https://github.com/LeoPlix/Personal_Project-SpeedWalkingPlatform',
    description_pt: 'Plataforma em Go para cálculo de métricas e desempenho de marcha rápida.',
    description_en: 'Go platform for speed walking metrics computation and tracking.',
    language: 'Go',
    stargazers_count: 0
  },
  {
    name: 'ASA-Project-1',
    html_url: 'https://github.com/LeoPlix/ASA-Project-1',
    description_pt: 'Algoritmos de grafos e otimização em C++ (Análise e Síntese de Algoritmos).',
    description_en: 'Graph algorithms and optimization in C++ (Analysis & Synthesis of Algorithms).',
    language: 'C++',
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
      if (countBadge) countBadge.textContent = `${filtered.length} Repos`;
    } else {
      window.currentReposData = FALLBACK_REPOS;
      renderRepos(FALLBACK_REPOS, gridContainer);
      if (countBadge) countBadge.textContent = `${FALLBACK_REPOS.length} Repos`;
    }
  } catch (err) {
    console.warn('Utilizando repositórios de reserva:', err);
    window.currentReposData = FALLBACK_REPOS;
    renderRepos(FALLBACK_REPOS, gridContainer);
    if (countBadge) countBadge.textContent = `${FALLBACK_REPOS.length} Repos`;
  }
}

function renderRepos(repos, container) {
  container.innerHTML = '';
  const btnLabel = TRANSLATIONS[currentLang].view_code || 'Ver no GitHub';

  repos.forEach(repo => {
    const lang = repo.language || 'Geral';
    const card = document.createElement('article');
    card.className = 'bubbly-card';

    let desc = repo.description;
    if (repo[`description_${currentLang}`]) {
      desc = repo[`description_${currentLang}`];
    } else if (!desc) {
      desc = currentLang === 'pt' ? 'Repositório de código aberto no GitHub.' : 'Open source repository on GitHub.';
    }

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.8rem;">
        <span class="tag-bubble" style="background: var(--mint-fill); color: var(--mint-accent); border: none;">
          ${lang}
        </span>
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted);">
          <i class="fa-regular fa-star"></i> ${repo.stargazers_count || 0}
        </span>
      </div>

      <h4 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="color: var(--text-dark);">
          ${formatRepoName(repo.name)}
        </a>
      </h4>

      <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.2rem; line-height: 1.5;">
        ${escapeHTML(desc)}
      </p>

      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="font-weight: 700; font-size: 0.88rem; color: var(--mint-accent); display: inline-flex; align-items: center; gap: 0.4rem;">
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
