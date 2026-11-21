/**
 * ClipForge AI - Admin Dashboard & SaaS Control Center
 */

window.AdminModule = (function () {
  'use strict';

  function init() {
    bindEvents();
    refresh();
  }

  function bindEvents() {
    const btnSaveSettings = document.getElementById('btnAdminSaveSettings');
    if (btnSaveSettings) {
      btnSaveSettings.addEventListener('click', saveAdminSettings);
    }
  }

  async function refresh() {
    await Promise.all([
      fetchMetrics(),
      fetchUsers(),
      fetchLogs()
    ]);
  }

  async function fetchMetrics() {
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.ok) {
        const m = await res.json();
        const uEl = document.getElementById('adminUsersCount');
        const vEl = document.getElementById('adminVideosCount');
        const cEl = document.getElementById('adminClipsCount');

        if (uEl) uEl.textContent = m.registered_users.toLocaleString();
        if (vEl) vEl.textContent = m.total_videos_processed.toLocaleString();
        if (cEl) cEl.textContent = m.total_clips_rendered.toLocaleString();
      }
    } catch (e) {
      console.warn('Metrics error:', e);
    }
  }

  async function fetchUsers() {
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) {
        const users = await res.json();
        renderUsersTable(users);
      }
    } catch (e) {
      console.warn('Users fetch error:', e);
    }
  }

  function renderUsersTable(users) {
    const tbody = document.querySelector('#adminUsersTable tbody');
    if (!tbody) return;

    tbody.innerHTML = users.map(u => `
      <tr>
        <td>
          <div style="font-weight:700;color:#fff;">${u.full_name || 'Creator'}</div>
          <div style="font-size:11px;color:var(--text-muted);">${u.email}</div>
        </td>
        <td>
          <span class="brand-badge" style="background:${u.plan === 'agency' ? 'rgba(236,72,153,0.15)' : 'rgba(139,92,246,0.15)'};color:${u.plan === 'agency' ? 'var(--accent-magenta)' : 'var(--primary-purple)'};">
            ${(u.plan || 'pro').toUpperCase()}
          </span>
        </td>
        <td><strong>${u.clips_used || 0}</strong> / ${u.clips_limit || 100}</td>
        <td>${((u.storage_used_mb || 0)/1024).toFixed(1)} / ${((u.storage_limit_mb || 10240)/1024).toFixed(0)} GB</td>
        <td>
          <span class="status-pill ${u.status === 'active' ? 'active' : 'suspended'}">
            ${u.status || 'active'}
          </span>
        </td>
        <td>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-secondary btn-sm" onclick="ClipForge.AdminModule.userAction('${u.id}', 'upgrade_plan')" title="Upgrade Tier">
              <i class="fa-solid fa-arrow-up" style="color:var(--accent-green)"></i>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="ClipForge.AdminModule.userAction('${u.id}', 'toggle_status')" title="Toggle Suspend">
              <i class="fa-solid fa-ban" style="color:var(--accent-amber)"></i>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="ClipForge.AdminModule.userAction('${u.id}', 'reset_quota')" title="Reset Quota">
              <i class="fa-solid fa-rotate-left" style="color:var(--accent-cyan)"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  async function userAction(userId, action) {
    try {
      const res = await fetch(`/api/admin/users/${userId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, plan: 'agency' })
      });
      if (res.ok) {
        ClipForge.showToast(`User action '${action}' applied!`, 'success');
        fetchUsers();
      }
    } catch (e) {
      ClipForge.showToast('Error applying user action', 'error');
    }
  }

  async function saveAdminSettings() {
    const whisper = document.getElementById('adminWhisperModel').value;
    const llm = document.getElementById('adminLlmEngine').value;

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whisper_model: whisper,
          llm_hook_engine: llm
        })
      });
      if (res.ok) {
        ClipForge.showToast('AI Model & Engine settings saved!', 'success');
      }
    } catch (e) {
      ClipForge.showToast('Failed to save settings', 'error');
    }
  }

  async function fetchLogs() {
    const container = document.getElementById('adminLogsContainer');
    if (!container) return;

    try {
      const res = await fetch('/api/admin/logs');
      if (res.ok) {
        const logs = await res.json();
        container.innerHTML = logs.map(l => `
          <div>
            <span style="color:var(--text-muted)">[${l.timestamp.split(' ')[1] || l.timestamp}]</span>
            <span style="color:${l.level === 'ERROR' ? '#ef4444' : (l.level === 'WARN' ? '#f59e0b' : 'var(--accent-cyan)')}">[${l.level}]</span>
            <strong style="color:var(--primary-purple)">[${l.module}]</strong> ${l.message}
            ${l.details ? `<span style="opacity:0.6;font-size:10px;">(${l.details})</span>` : ''}
          </div>
        `).join('');
      }
    } catch (e) {
      console.warn('Logs fetch error:', e);
    }
  }

  return {
    init,
    refresh,
    userAction
  };
})();
