/**
 * ClipForge AI - AI Automatic Clip Generator (Core Engine)
 */

window.GeneratorModule = (function () {
  'use strict';

  let selectedDuration = 30;

  function init() {
    bindEvents();
  }

  function bindEvents() {
    // Duration Buttons (15s, 30s, 45s, 60s)
    const durationBtns = document.querySelectorAll('.duration-btn');
    durationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        durationBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-secondary');
        });
        btn.classList.add('btn-primary', 'active');
        btn.classList.remove('btn-secondary');
        selectedDuration = parseInt(btn.getAttribute('data-dur'), 10) || 30;
      });
    });

    // Run AI Generator button
    const btnRun = document.getElementById('btnRunAiGenerator');
    if (btnRun) {
      btnRun.addEventListener('click', runGenerator);
    }
  }

  async function runGenerator() {
    const btnRun = document.getElementById('btnRunAiGenerator');
    if (!ClipForge.state.currentProject) {
      ClipForge.showToast('Please select or import a video first', 'error');
      ClipForge.navigateTo('importer');
      return;
    }

    const flavor = document.getElementById('selectMomentFlavor').value;
    const lang = document.getElementById('selectGeneratorLang').value;

    btnRun.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing Video Moments...';
    btnRun.disabled = true;

    try {
      const res = await fetch('/api/generate-clips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: ClipForge.state.currentProject.id,
          clip_duration: selectedDuration,
          content_style: flavor,
          language: lang
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        ClipForge.state.clips = data.clips;
        renderClips(data.clips);
        ClipForge.showToast(`AI successfully generated ${data.clips.length} viral clips! 🚀`, 'success');
      } else {
        ClipForge.showToast(data.message || 'Generation failed', 'error');
      }
    } catch (e) {
      ClipForge.showToast('Error during AI clip generation', 'error');
    } finally {
      btnRun.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Viral Clips';
      btnRun.disabled = false;
    }
  }

  function renderClips(clips) {
    const container = document.getElementById('generatedClipsContainer');
    const heading = document.getElementById('generatedClipsHeading');
    if (!container) return;

    if (heading) {
      heading.textContent = `Generated AI Clips (${clips.length} Viral Moments Found)`;
    }

    if (clips.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">
          <i class="fa-solid fa-wand-magic-sparkles" style="font-size:36px;margin-bottom:12px;opacity:0.5;"></i>
          <p>No clips generated yet. Click 'Generate Viral Clips' above!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = clips.map((c, idx) => `
      <div class="project-card" style="border-color:${idx === 0 ? 'rgba(139, 92, 246, 0.5)' : 'var(--border-subtle)'};">
        <div class="project-thumb-wrap">
          <img src="${c.thumbnail_url || (ClipForge.state.currentProject && ClipForge.state.currentProject.thumbnail_url) || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'}" alt="${c.title}" class="project-thumb">
          
          <!-- Top Right Virality Score Badge -->
          <div style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);border:1px solid rgba(250,204,21,0.5);color:#facc15;font-weight:900;font-size:12px;padding:4px 8px;border-radius:6px;display:flex;align-items:center;gap:4px;">
            <i class="fa-solid fa-fire"></i> ${c.virality_score}/100 Score
          </div>

          <!-- Bottom Left Timestamp Duration -->
          <span class="thumb-overlay-badge" style="left:10px;right:auto;">
            <i class="fa-regular fa-clock"></i> ${formatTimestamp(c.start_time)} - ${formatTimestamp(c.end_time)} (${c.duration}s)
          </span>
        </div>

        <div class="project-body">
          <!-- Opening Hook Badge -->
          <div style="background:rgba(255,235,59,0.12);border:1px solid rgba(255,235,59,0.3);color:#ffeb3b;font-size:11px;font-weight:800;padding:5px 8px;border-radius:6px;line-height:1.3;">
            <span style="color:#fff;opacity:0.7;">OPENING HOOK:</span> ${c.hook || 'WATCH TILL THE END 🚨'}
          </div>

          <h3 class="project-title" style="font-size:14px;margin-top:4px;">${c.title}</h3>

          <p style="font-size:12px;color:var(--text-secondary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            ${c.caption || ''}
          </p>

          <div style="font-size:11px;color:var(--accent-cyan);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${c.hashtags || ''}
          </div>

          <!-- Virality Breakdown Bar -->
          <div style="display:flex;gap:12px;font-size:10px;color:var(--text-muted);border-top:1px solid var(--border-subtle);padding-top:8px;">
            <span>Hook Rate: <strong style="color:var(--accent-green)">${c.hook_rate || 96}%</strong></span>
            <span>Retention: <strong style="color:var(--accent-cyan)">${c.retention_score || 93}%</strong></span>
            <span>Re-watch: <strong style="color:#facc15">${c.rewatch_score || 91}%</strong></span>
          </div>

          <div class="project-actions" style="margin-top:8px;">
            <button class="btn btn-primary btn-sm" style="flex:1;" onclick="ClipForge.GeneratorModule.openInEditor('${c.id}')">
              <i class="fa-solid fa-film"></i> Edit in Studio
            </button>
            <button class="btn btn-secondary btn-sm" onclick="ClipForge.GeneratorModule.quickExportClip('${c.id}')" title="Quick Export">
              <i class="fa-solid fa-share-nodes"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function openInEditor(clipId) {
    const clip = ClipForge.state.clips.find(c => c.id === clipId);
    if (clip && window.EditorModule) {
      ClipForge.state.currentClip = clip;
      window.EditorModule.loadClip(clip, ClipForge.state.currentProject);
      if (window.SubtitlesModule) {
        window.SubtitlesModule.loadTranscript(clip.transcript || []);
      }
      ClipForge.navigateTo('editor');
    }
  }

  function quickExportClip(clipId) {
    const clip = ClipForge.state.clips.find(c => c.id === clipId);
    if (clip && window.ExportModule) {
      ClipForge.state.currentClip = clip;
      window.ExportModule.setupForClip(clip);
      ClipForge.navigateTo('export');
    }
  }

  function formatTimestamp(seconds) {
    seconds = Math.max(0, Math.floor(seconds || 0));
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  return {
    init,
    renderClips,
    openInEditor,
    quickExportClip
  };
})();
