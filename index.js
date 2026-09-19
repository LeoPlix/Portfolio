/**
 * Leonor Guedes — Portfolio JavaScript Engine
 * GitHub API Sync & Bubbly UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollSpy();
  fetchGitHubAvatar();
  fetchGitHubRepos();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation Toggle
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
   2. ScrollSpy for Active Section Highlighting
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
   3. Fetch Profile Avatar
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
   4. GitHub Repos Sync & Bubbly Cards Render
   -------------------------------------------------------------------------- */
const EXCLUDED_REPOS = ['ExamManagementPlatform', 'Portfolio'];

const FALLBACK_REPOS = [
  {
    name: 'Star-Battle-Solver',
    html_url: 'https://github.com/LeoPlix/Star-Battle-Solver',
    description: 'Motor de resolução lógica para o puzzle Star Battle (Lógica para Programação no IST).',
    language: 'Prolog',
    stargazers_count: 0
  },
  {
    name: 'Library-Management-System',
    html_url: 'https://github.com/LeoPlix/Library-Management-System',
    description: 'Sistema de gestão de biblioteca em C# com orientação a objetos e controlo de empréstimos.',
    language: 'C#',
    stargazers_count: 0
  },
  {
    name: 'Orbito-Strategy-Game-in-Python',
    html_url: 'https://github.com/LeoPlix/Orbito-Strategy-Game-in-Python',
    description: 'Implementação interativa do jogo de tabuleiro Orbito com avaliação de jogadas.',
    language: 'Python',
    stargazers_count: 0
  },
  {
    name: 'MNK-Game-in-Python',
    html_url: 'https://github.com/LeoPlix/MNK-Game-in-Python',
    description: 'Motor de jogo m,n,k com algoritmos de pesquisa heurística.',
    language: 'Python',
    stargazers_count: 0
  },
  {
    name: 'Personal_Project-SpeedWalkingPlatform',
    html_url: 'https://github.com/LeoPlix/Personal_Project-SpeedWalkingPlatform',
    description: 'Plataforma em Go para cálculo de métricas e desempenho de marcha rápida.',
    language: 'Go',
    stargazers_count: 0
  },
  {
    name: 'ASA-Project-1',
    html_url: 'https://github.com/LeoPlix/ASA-Project-1',
    description: 'Algoritmos de grafos e otimização em C++ (Análise e Síntese de Algoritmos).',
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
      renderRepos(filtered, gridContainer);
      if (countBadge) countBadge.textContent = `${filtered.length} Repos`;
    } else {
      renderRepos(FALLBACK_REPOS, gridContainer);
      if (countBadge) countBadge.textContent = `${FALLBACK_REPOS.length} Repos`;
    }
  } catch (err) {
    console.warn('Utilizando repositórios de reserva:', err);
    renderRepos(FALLBACK_REPOS, gridContainer);
    if (countBadge) countBadge.textContent = `${FALLBACK_REPOS.length} Repos`;
  }
}

function renderRepos(repos, container) {
  container.innerHTML = '';

  repos.forEach(repo => {
    const lang = repo.language || 'Geral';
    const card = document.createElement('article');
    card.className = 'bubbly-card';

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
        ${escapeHTML(repo.description || 'Repositório de código aberto no GitHub.')}
      </p>

      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="font-weight: 700; font-size: 0.88rem; color: var(--mint-accent); display: inline-flex; align-items: center; gap: 0.4rem;">
        <span>Ver no GitHub</span>
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
