/**
 * ClipForge AI - Social Media Export Center & Copy Kit
 */

window.ExportModule = (function () {
  'use strict';

  let selectedPreset = 'youtube_shorts';
  let selectedResolution = '1080p';

  function init() {
    bindPresets();
    bindResolutions();
    bindExportActions();
  }

  function setupForClip(clip) {
    if (!clip) return;

    const titleEl = document.getElementById('exportKitTitle');
    const capEl = document.getElementById('exportKitCaption');

    if (titleEl) titleEl.value = clip.title || 'ClipForge AI Viral Clip';
    if (capEl) {
      capEl.value = `${clip.caption || ''}\n\n${clip.hashtags || '#Shorts #Reels #Viral'}`;
    }
  }

  function bindPresets() {
    const presetBtns = document.querySelectorAll('.style-preset-btn[data-export-preset]');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedPreset = btn.getAttribute('data-export-preset');
        ClipForge.showToast(`Selected Preset: ${selectedPreset.replace('_', ' ').toUpperCase()}`, 'info');
      });
    });
  }

  function bindResolutions() {
    const resBtns = document.querySelectorAll('.export-res-btn');
    resBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        resBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-secondary');
        });
        btn.classList.add('btn-primary', 'active');
        btn.classList.remove('btn-secondary');
        selectedResolution = btn.getAttribute('data-res');
        ClipForge.showToast(`Export Quality set to: ${selectedResolution.toUpperCase()}`, 'info');
      });
    });
  }

  function bindExportActions() {
    const btnSingle = document.getElementById('btnDownloadSingleExport');
    const btnBatch = document.getElementById('btnBatchExportAll');
    const btnCopyKit = document.getElementById('btnCopyEntireSocialKit');

    if (btnSingle) {
      btnSingle.addEventListener('click', () => triggerExport(false));
    }

    if (btnBatch) {
      btnBatch.addEventListener('click', () => triggerExport(true));
    }

    if (btnCopyKit) {
      btnCopyKit.addEventListener('click', copyEntireKit);
    }
  }

  async function triggerExport(isBatch = false) {
    const btn = isBatch ? document.getElementById('btnBatchExportAll') : document.getElementById('btnDownloadSingleExport');
    const originalText = btn.innerHTML;

    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Rendering (${selectedResolution})...`;
    btn.disabled = true;

    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clip_id: ClipForge.state.currentClip ? ClipForge.state.currentClip.id : null,
          project_id: ClipForge.state.currentProject ? ClipForge.state.currentProject.id : null,
          preset: selectedPreset,
          resolution: selectedResolution,
          export_all: isBatch
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        ClipForge.showToast(isBatch ? 'All clips packaged & downloaded! 📦' : 'Clip exported in high quality! 🎬', 'success');

        // Trigger real file download
        const a = document.createElement('a');
        a.href = data.download_url || '/data/samples/demo.mp4';
        a.download = isBatch ? 'clipforge_all_clips.zip' : `clipforge_${selectedPreset}_${selectedResolution}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (e) {
      ClipForge.showToast('Export failed', 'error');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }

  function copyEntireKit() {
    const title = document.getElementById('exportKitTitle').value;
    const caption = document.getElementById('exportKitCaption').value;

    const fullKit = `🎬 TITLE:\n${title}\n\n📝 CAPTION & HASHTAGS:\n${caption}\n\n⏰ POSTING WINDOW: 6:30 PM - 8:45 PM\n(Generated with ClipForge AI)`;

    navigator.clipboard.writeText(fullKit).then(() => {
      ClipForge.showToast('Full Social Media Publishing Kit Copied! 📋🔥', 'success');
    });
  }

  return {
    init,
    setupForClip
  };
})();
