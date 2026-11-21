/**
 * ClipForge AI - Dashboard Controller
 */

window.DashboardModule = (function () {
  'use strict';

  function init() {
    refresh();
  }

  async function refresh() {
    try {
      const res = await fetch('/api/dashboard/stats');
      if (res.ok) {
        const data = await res.json();
        renderStats(data);
        renderRecentProjects(data.recent_projects || []);
      }
    } catch (e) {
      console.warn('Dashboard stats error:', e);
    }
  }

  function renderStats(stats) {
    const vEl = document.getElementById('statTotalVideos');
    const cEl = document.getElementById('statTotalClips');
    const sEl = document.getElementById('statStorageUsed');

    if (vEl) vEl.textContent = stats.total_projects || 48;
    if (cEl) cEl.textContent = stats.total_clips || 186;
    if (sEl) sEl.textContent = `${stats.storage_used_gb || 3.4} GB`;
  }

  function renderRecentProjects(projects) {
    const container = document.getElementById('dashboardRecentProjects');
    if (!container) return;

    if (projects.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">
          <p>No projects yet. Click 'Quick Create' to get started!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = projects.map(p => `
      <div class="project-card">
        <div class="project-thumb-wrap">
          <img src="${p.thumbnail_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'}" alt="${p.title}" class="project-thumb">
          <span class="source-type-pill ${p.source_type || 'youtube'}">
            ${p.source_type === 'youtube_live' ? '<span class="live-dot"></span> Live Stream' : (p.source_type || 'YouTube')}
          </span>
          <span class="thumb-overlay-badge">${ClipForge.formatTime(p.duration || 1800)}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <div class="project-meta-row">
            <span class="clip-count-pill"><i class="fa-solid fa-bolt"></i> AI Moments Ready</span>
            <span>${p.created_at ? p.created_at.split(' ')[0] : 'Today'}</span>
          </div>
          <div class="project-actions">
            <button class="btn btn-primary btn-sm" onclick="ClipForge.quickLoadEditor('${p.id}')">
              <i class="fa-solid fa-film"></i> Open Studio
            </button>
            <button class="btn btn-secondary btn-sm" onclick="ClipForge.loadSampleProject('${p.id}')">
              <i class="fa-solid fa-wand-magic-sparkles"></i> View Clips
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function filterProjects(query) {
    const cards = document.querySelectorAll('#dashboardRecentProjects .project-card');
    cards.forEach(card => {
      const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
      if (title.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  return {
    init,
    refresh,
    filterProjects
  };
})();
