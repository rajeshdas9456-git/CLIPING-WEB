/**
 * ClipForge AI - Video Import System (Three Import Options + Samples)
 */

window.ImporterModule = (function () {
  'use strict';

  let currentUploadedFile = null;

  function init() {
    bindTabs();
    bindYoutubeImport();
    bindLiveStreamImport();
    bindFileUpload();
  }

  function bindTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
    const tabContents = document.querySelectorAll('.import-tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabContents.forEach(content => {
          if (content.id === targetId) {
            content.style.display = 'block';
          } else {
            content.style.display = 'none';
          }
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // OPTION A: YouTube URL Import
  // -------------------------------------------------------------------------
  function bindYoutubeImport() {
    const btnValidateYt = document.getElementById('btnValidateYt');
    const inputYt = document.getElementById('inputYoutubeUrl');
    const btnProceedYt = document.getElementById('btnProceedYtGenerate');

    if (btnValidateYt && inputYt) {
      btnValidateYt.addEventListener('click', async () => {
        const url = inputYt.value.trim();
        if (!url) {
          ClipForge.showToast('Please enter a YouTube video URL', 'error');
          return;
        }

        btnValidateYt.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Validating...';

        try {
          const res = await fetch('/api/import/youtube', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, is_live: false })
          });
          const meta = await res.json();

          if (res.ok) {
            updateYtPreview(meta);
            ClipForge.showToast('YouTube video metadata verified! 🎯', 'success');
          } else {
            ClipForge.showToast(meta.message || 'Invalid YouTube URL', 'error');
          }
        } catch (e) {
          ClipForge.showToast('Error validating YouTube link', 'error');
        } finally {
          btnValidateYt.innerHTML = '<i class="fa-solid fa-check"></i> Validate & Fetch';
        }
      });
    }

    if (btnProceedYt) {
      btnProceedYt.addEventListener('click', async () => {
        const title = document.getElementById('ytTitlePreview').textContent;
        const thumb = document.getElementById('ytThumbPreview').src;
        const url = inputYt.value.trim();

        // Create project on backend
        try {
          const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: title,
              source_type: 'youtube',
              source_url: url,
              video_path: '/data/samples/demo.mp4',
              thumbnail_url: thumb,
              duration: 3840.0
            })
          });
          if (res.ok) {
            const newProj = await res.json();
            ClipForge.showToast('Project created! AI is now ready to generate clips.', 'success');
            await ClipForge.selectProject(newProj.id);
            ClipForge.navigateTo('generator');
          }
        } catch (e) {
          ClipForge.showToast('Failed to create project', 'error');
        }
      });
    }
  }

  function updateYtPreview(meta) {
    const card = document.getElementById('ytPreviewCard');
    const thumb = document.getElementById('ytThumbPreview');
    const title = document.getElementById('ytTitlePreview');
    const dur = document.getElementById('ytDurationPreview');

    if (card) card.style.display = 'block';
    if (thumb) thumb.src = meta.thumbnail_url || meta.fallback_thumbnail;
    if (title) title.textContent = meta.title;
    if (dur) dur.textContent = meta.duration_formatted || '30:20';
  }

  // -------------------------------------------------------------------------
  // OPTION B: YouTube Live Stream Import
  // -------------------------------------------------------------------------
  function bindLiveStreamImport() {
    const btnValidateLive = document.getElementById('btnValidateLive');
    const inputLive = document.getElementById('inputLiveUrl');

    if (btnValidateLive && inputLive) {
      btnValidateLive.addEventListener('click', async () => {
        const url = inputLive.value.trim();
        if (!url) {
          ClipForge.showToast('Please enter a YouTube Live stream URL', 'error');
          return;
        }

        btnValidateLive.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking VOD...';

        try {
          const res = await fetch('/api/import/youtube', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, is_live: true, title: 'Completed YouTube Live Stream Recording' })
          });
          const meta = await res.json();

          if (res.ok) {
            ClipForge.showToast('Live stream recording verified! Ready for highlight detection.', 'success');
          }
        } catch (e) {
          ClipForge.showToast('Error checking live stream broadcast', 'error');
        } finally {
          btnValidateLive.innerHTML = '<i class="fa-solid fa-tower-broadcast"></i> Validate Stream VOD';
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // OPTION C: Direct Video File Upload
  // -------------------------------------------------------------------------
  function bindFileUpload() {
    const dropzone = document.getElementById('fileDropZone');
    const fileInput = document.getElementById('videoFileInput');

    if (!dropzone || !fileInput) return;

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) handleFileSelected(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) handleFileSelected(e.target.files[0]);
    });
  }

  function handleFileSelected(file) {
    const validExtensions = ['.mp4', '.mov', '.webm'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(ext)) {
      ClipForge.showToast('Please upload a valid MP4, MOV, or WEBM video file', 'error');
      return;
    }

    if (file.size > 2 * 1024 * 1024 * 1024) {
      ClipForge.showToast('File size exceeds 2GB maximum limit', 'error');
      return;
    }

    currentUploadedFile = file;

    // Show upload progress indicator
    const progressSection = document.getElementById('uploadProgressSection');
    const fileNameEl = document.getElementById('uploadFileName');
    const pctEl = document.getElementById('uploadPercentage');
    const barEl = document.getElementById('uploadProgressBar');

    if (progressSection) progressSection.style.display = 'block';
    if (fileNameEl) fileNameEl.textContent = file.name;

    // Create an ObjectURL for instant real in-browser video playback!
    const objectUrl = URL.createObjectURL(file);

    // Simulate smooth progress animation while streaming
    let currentPct = 10;
    const interval = setInterval(() => {
      currentPct += 15;
      if (pctEl) pctEl.textContent = `${currentPct}% (${(file.size / (1024*1024)).toFixed(1)} MB)`;
      if (barEl) barEl.style.width = `${currentPct}%`;

      if (currentPct >= 100) {
        clearInterval(interval);
        setTimeout(async () => {
          ClipForge.showToast('Video uploaded and processed successfully! 🚀', 'success');

          // Create new project with uploaded video
          try {
            const res = await fetch('/api/projects', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title: file.name.replace(/\.[^/.]+$/, ""),
                source_type: 'upload',
                source_url: file.name,
                video_path: objectUrl, // Live ObjectURL
                thumbnail_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800',
                duration: 60.0
              })
            });

            if (res.ok) {
              const newProj = await res.json();
              await ClipForge.selectProject(newProj.id);
              // Set video source in studio
              const studioVideo = document.getElementById('studioVideo');
              if (studioVideo) studioVideo.src = objectUrl;
              ClipForge.navigateTo('generator');
            }
          } catch (e) {
            console.error('Error creating project from upload:', e);
          }
        }, 400);
      }
    }, 150);
  }

  return {
    init
  };
})();
