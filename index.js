/**
 * Leonor Guedes | Personal Portfolio Engine (Vanilla JS ES6+)
 * Sincronização com GitHub API e Interatividade de UI
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initSkillAnimations();
  fetchGitHubAvatar();
  fetchGitHubRepos();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isExpanded = navMenu.classList.contains('active');
    navToggle.setAttribute('aria-expanded', isExpanded);
    navToggle.innerHTML = isExpanded ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Fechar menu ao clicar em qualquer link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* --------------------------------------------------------------------------
   2. ScrollSpy / Active Navigation Highlight
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

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
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   3. Skill Progress Bar Animation on Scroll
   -------------------------------------------------------------------------- */
function initSkillAnimations() {
  const skillBars = document.querySelectorAll('.skill-progress');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => {
          entry.target.style.width = targetWidth;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => observer.observe(bar));
}

/* --------------------------------------------------------------------------
   4. Sync GitHub User Profile Avatar
   -------------------------------------------------------------------------- */
async function fetchGitHubAvatar() {
  const avatarImg = document.getElementById('hero-profile-img');
  if (!avatarImg) return;

  try {
    const response = await fetch('https://api.github.com/users/LeoPlix');
    if (!response.ok) throw new Error('Falha ao obter perfil do GitHub');
    const userData = await response.json();
    if (userData.avatar_url) {
      avatarImg.src = userData.avatar_url;
    }
  } catch (error) {
    console.warn('Utilizando avatar de reserva do GitHub:', error);
  }
}

/* --------------------------------------------------------------------------
   5. GitHub API Repositories Sync & Rendering
   -------------------------------------------------------------------------- */
const EXCLUDED_REPOS = ['ExamManagementPlatform', 'Portfolio'];

// Mapeamento de Cores para Linguagens de Programação
const LANGUAGE_COLORS = {
  'Go': '#00ADD8',
  'Python': '#3572A5',
  'C#': '#178600',
  'C++': '#f34b7d',
  'C': '#555555',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'HTML': '#e34c26',
  'Prolog': '#74283c',
  'Shell': '#89e051'
};

// Fallback Repositories caso a API devolva erro ou atinja o rate limit
const FALLBACK_REPOS = [
  {
    name: 'Star-Battle-Solver',
    html_url: 'https://github.com/LeoPlix/Star-Battle-Solver',
    description: 'Motor de resolução lógica e análise de regras para o puzzle Star Battle. Desenvolvido para a cadeira de Lógica para Programação no IST.',
    language: 'Prolog',
    stargazers_count: 0,
    forks_count: 0
  },
  {
    name: 'Library-Management-System',
    html_url: 'https://github.com/LeoPlix/Library-Management-System',
    description: 'Sistema completo de gestão de biblioteca em C# com arquitetura orientada a objetos, controlo de empréstimos, pesquisa e catálogo.',
    language: 'C#',
    stargazers_count: 0,
    forks_count: 0
  },
  {
    name: 'Orbito-Strategy-Game-in-Python',
    html_url: 'https://github.com/LeoPlix/Orbito-Strategy-Game-in-Python',
    description: 'Implementação interativa do jogo de tabuleiro de estratégia Orbito em Python, com interface de utilizador e avaliação de jogadas.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0
  },
  {
    name: 'MNK-Game-in-Python',
    html_url: 'https://github.com/LeoPlix/MNK-Game-in-Python',
    description: 'Motor de jogo generalizado m,n,k (estilo 5 em linha / Galinha) com algoritmos de pesquisa heurística e estado de jogo.',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0
  },
  {
    name: 'Personal_Project-SpeedWalkingPlatform',
    html_url: 'https://github.com/LeoPlix/Personal_Project-SpeedWalkingPlatform',
    description: 'Plataforma de cálculo de métricas de desempenho e tracking para atletas de marcha rápida desenvolvida em Go.',
    language: 'Go',
    stargazers_count: 0,
    forks_count: 0
  },
  {
    name: 'ASA-Project-1',
    html_url: 'https://github.com/LeoPlix/ASA-Project-1',
    description: 'Projeto de Análise e Síntese de Algoritmos no Instituto Superior Técnico. Foco em algoritmos de grafos e otimização em C++.',
    language: 'C++',
    stargazers_count: 0,
    forks_count: 0
  },
  {
    name: 'SO-Project-2',
    html_url: 'https://github.com/LeoPlix/SO-Project-2',
    description: 'Projeto avançado de Sistemas Operativos (IST) em C: gestão de processos, memória concorrência e sincronização de threads.',
    language: 'C',
    stargazers_count: 0,
    forks_count: 0
  }
];

async function fetchGitHubRepos() {
  const gridContainer = document.getElementById('projects-grid');
  const countBadge = document.getElementById('repos-count-badge');
  if (!gridContainer) return;

  try {
    const response = await fetch('https://api.github.com/users/LeoPlix/repos?sort=updated&per_page=100');
    
    if (!response.ok) {
      throw new Error(`Resposta HTTP inválida (${response.status})`);
    }

    const repos = await response.json();
    
    // Filtrar repositórios de destaque fixo ou internos
    const filteredRepos = repos.filter(repo => !EXCLUDED_REPOS.includes(repo.name) && !repo.fork);

    if (filteredRepos.length > 0) {
      renderRepos(filteredRepos, gridContainer);
      if (countBadge) countBadge.innerHTML = `<span>${filteredRepos.length} Repositórios Sincronizados</span>`;
    } else {
      renderRepos(FALLBACK_REPOS, gridContainer);
      if (countBadge) countBadge.innerHTML = `<span>${FALLBACK_REPOS.length} Repositórios em Exibição</span>`;
    }

  } catch (error) {
    console.warn('Erro ao carregar repositórios do GitHub API, a utilizar dados locais de reserva:', error);
    renderRepos(FALLBACK_REPOS, gridContainer);
    if (countBadge) {
      countBadge.innerHTML = `<span><i class="fa-solid fa-cloud"></i> Repositórios Ativos (${FALLBACK_REPOS.length})</span>`;
    }
  }
}

function renderRepos(repos, container) {
  container.innerHTML = '';

  repos.forEach(repo => {
    const lang = repo.language || 'Geral';
    const langColor = LANGUAGE_COLORS[lang] || '#74C69D';
    const desc = repo.description || 'Repositório de código aberto no GitHub com implementação em Engenharia Informática.';

    const card = document.createElement('article');
    card.className = 'repo-card glass-card';

    card.innerHTML = `
      <div>
        <div class="repo-card-header">
          <i class="fa-solid fa-folder-closed repo-folder-icon"></i>
          <div class="repo-stars">
            <i class="fa-regular fa-star"></i>
            <span>${repo.stargazers_count || 0}</span>
          </div>
        </div>

        <h4 class="repo-title">
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            ${formatRepoName(repo.name)}
          </a>
        </h4>

        <p class="repo-desc">${escapeHTML(desc)}</p>
      </div>

      <div class="repo-footer">
        <div class="repo-lang">
          <span class="lang-dot" style="background-color: ${langColor};"></span>
          <span>${lang}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-link">
          <span>Ver Código</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

function formatRepoName(name) {
  return name.replace(/[-_]/g, ' ');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
