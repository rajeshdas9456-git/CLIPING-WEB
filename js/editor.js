/**
 * ClipForge AI - Video Editor Studio & Timeline Scrubber
 */

window.EditorModule = (function () {
  'use strict';

  let videoEl = null;
  let activeClip = null;
  let activeProject = null;
  let isPlaying = false;
  let isLooping = true;
  let currentRatio = '9-16';
  let currentFraming = 'smart_center';
  let currentCaptionStyle = 'hormozi';
  let audioContext = null;
  let bgMusicOscillator = null;
  let bgMusicGain = null;
  let musicType = 'lofi';
  let musicVol = 0.2;

  // Trim times
  let startTime = 2.0;
  let endTime = 16.5;

  function init() {
    videoEl = document.getElementById('studioVideo');
    bindPlaybackEvents();
    bindRatioButtons();
    bindFramingMode();
    bindStudioTabs();
    bindStylePresets();
    bindMusicControls();
    bindTimelineDragging();
    drawSyntheticWaveform();
  }

  function loadClip(clip, project) {
    activeClip = clip;
    activeProject = project;

    const titleEl = document.getElementById('studioClipTitle');
    if (titleEl) titleEl.textContent = clip.title;

    startTime = parseFloat(clip.start_time) || 0.0;
    endTime = parseFloat(clip.end_time) || (startTime + 30.0);

    // Update Hook
    const hookBanner = document.getElementById('overlayHookBanner');
    const inputHook = document.getElementById('inputHookText');
    if (hookBanner) hookBanner.textContent = clip.hook || 'WATCH TILL THE END 🚨';
    if (inputHook) inputHook.value = clip.hook || '';

    // Update Caption Text
    const inputCap = document.getElementById('inputCaptionText');
    if (inputCap) inputCap.value = clip.caption || '';

    // Update Hashtags
    const inputTags = document.getElementById('inputHashtagsText');
    if (inputTags) inputTags.value = clip.hashtags || '';

    // Update Virality Score in Studio
    const scoreEl = document.getElementById('studioViralityScore');
    if (scoreEl) scoreEl.textContent = clip.virality_score || 98;

    // Set Video Source
    if (videoEl) {
      const src = clip.video_url || (project && project.video_path) || 'data/samples/demo.mp4';
      if (!videoEl.src.includes(src)) {
        videoEl.src = src;
      }
      const seekToStart = () => {
        videoEl.currentTime = startTime;
        updateTimecodes();
        updateTimelineHandles();
      };
      if (videoEl.readyState >= 1) {
        seekToStart();
      } else {
        videoEl.addEventListener('loadedmetadata', seekToStart, { once: true });
      }
    }

    // Set Aspect Ratio
    setAspectRatio(clip.aspect_ratio ? clip.aspect_ratio.replace(':', '-') : '9-16');

    // Set Caption Style Preset
    setCaptionStyle(clip.caption_style || 'hormozi');

    // Populate Word Pills
    renderTranscriptPills(clip.transcript || []);

    updateTimecodes();
    updateTimelineHandles();
  }

  function bindPlaybackEvents() {
    const btnPlayPause = document.getElementById('btnTimelinePlayPause');
    const btnRewind = document.getElementById('btnTimelineRewind');
    const btnForward = document.getElementById('btnTimelineForward');
    const btnLoop = document.getElementById('btnTimelineLoop');
    const btnMute = document.getElementById('btnMuteToggle');
    const speedSelect = document.getElementById('selectPlaybackSpeed');
    const btnSave = document.getElementById('btnStudioSaveClip');
    const btnExportNow = document.getElementById('btnStudioExportNow');

    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', togglePlayPause);
    }

    if (btnRewind && videoEl) {
      btnRewind.addEventListener('click', () => {
        videoEl.currentTime = Math.max(startTime, videoEl.currentTime - 5);
      });
    }

    if (btnForward && videoEl) {
      btnForward.addEventListener('click', () => {
        videoEl.currentTime = Math.min(endTime, videoEl.currentTime + 5);
      });
    }

    if (btnLoop) {
      btnLoop.addEventListener('click', () => {
        isLooping = !isLooping;
        btnLoop.style.color = isLooping ? 'var(--accent-cyan)' : 'var(--text-muted)';
      });
    }

    if (btnMute && videoEl) {
      btnMute.addEventListener('click', () => {
        videoEl.muted = !videoEl.muted;
        btnMute.innerHTML = videoEl.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
      });
    }

    if (speedSelect && videoEl) {
      speedSelect.addEventListener('change', (e) => {
        videoEl.playbackRate = parseFloat(e.target.value) || 1.0;
      });
    }

    // Time update for playhead & real-time animated captions
    if (videoEl) {
      videoEl.addEventListener('timeupdate', onVideoTimeUpdate);
      videoEl.addEventListener('ended', () => {
        if (isLooping) {
          videoEl.currentTime = startTime;
          videoEl.play();
        } else {
          pauseVideo();
        }
      });
    }

    if (btnSave) {
      btnSave.addEventListener('click', saveClipChanges);
    }

    if (btnExportNow) {
      btnExportNow.addEventListener('click', () => {
        if (activeClip && window.ExportModule) {
          window.ExportModule.setupForClip(activeClip);
          ClipForge.navigateTo('export');
        }
      });
    }

    // Hook text edit input
    const inputHook = document.getElementById('inputHookText');
    if (inputHook) {
      inputHook.addEventListener('input', (e) => {
        const banner = document.getElementById('overlayHookBanner');
        if (banner) banner.textContent = e.target.value.trim() || 'WATCH TILL THE END';
      });
    }

    const checkHook = document.getElementById('checkHookBannerEnabled');
    if (checkHook) {
      checkHook.addEventListener('change', (e) => {
        const banner = document.getElementById('overlayHookBanner');
        if (banner) banner.style.display = e.target.checked ? 'block' : 'none';
      });
    }

    const checkOutro = document.getElementById('checkOutroEnabled');
    if (checkOutro) {
      checkOutro.addEventListener('change', (e) => {
        const badge = document.getElementById('overlayOutroBadge');
        if (badge) badge.style.display = e.target.checked ? 'flex' : 'none';
      });
    }

    // Subtitle Vertical Y slider
    const sliderY = document.getElementById('sliderCaptionY');
    if (sliderY) {
      sliderY.addEventListener('input', (e) => {
        const container = document.getElementById('overlayCaptionsContainer');
        const label = document.getElementById('labelCaptionY');
        if (container) container.style.bottom = `${e.target.value}px`;
        if (label) label.textContent = `${e.target.value}px from bottom`;
      });
    }
  }

  function togglePlayPause() {
    if (!videoEl) return;
    if (videoEl.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  }

  function playVideo() {
    if (!videoEl) return;
    if (videoEl.currentTime < startTime || videoEl.currentTime >= endTime) {
      videoEl.currentTime = startTime;
    }
    videoEl.play();
    isPlaying = true;
    updatePlayPauseButton();
    startBgMusic();
  }

  function pauseVideo() {
    if (!videoEl) return;
    videoEl.pause();
    isPlaying = false;
    updatePlayPauseButton();
    stopBgMusic();
  }

  function updatePlayPauseButton() {
    const btn = document.getElementById('btnTimelinePlayPause');
    if (btn) {
      btn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i> Pause' : '<i class="fa-solid fa-play"></i> Play';
    }
  }

  function onVideoTimeUpdate() {
    if (!videoEl) return;
    const curr = videoEl.currentTime;

    // Loop restraint inside trim bounds
    if (curr >= endTime) {
      if (isLooping) {
        videoEl.currentTime = startTime;
      } else {
        pauseVideo();
        videoEl.currentTime = startTime;
      }
    }

    // Update timecode display
    const tcCurrent = document.getElementById('tcCurrent');
    if (tcCurrent) tcCurrent.textContent = formatTimecode(curr);

    // Update playhead scrubber position
    const playhead = document.getElementById('timelinePlayhead');
    const track = document.getElementById('timelineTrack');
    if (playhead && track) {
      const maxDuration = (activeProject && activeProject.duration) || 60.0;
      const pct = Math.min(100, Math.max(0, (curr / maxDuration) * 100));
      playhead.style.left = `${pct}%`;
    }

    // Animate word-by-word subtitles (Karaoke glow!)
    updateActiveWordSubtitle(curr - startTime);
  }

  function updateActiveWordSubtitle(clipRelativeSec) {
    const words = (activeClip && activeClip.transcript) || [];
    if (!words || words.length === 0) return;

    const phraseContainer = document.getElementById('overlayCaptionPhrase');
    if (!phraseContainer) return;

    // Find current active word
    let activeIndex = -1;
    for (let i = 0; i < words.length; i++) {
      if (clipRelativeSec >= words[i].start && clipRelativeSec <= words[i].end) {
        activeIndex = i;
        break;
      }
    }

    // If past all words or between, pick closest
    if (activeIndex === -1) {
      for (let i = 0; i < words.length; i++) {
        if (clipRelativeSec < words[i].start) {
          activeIndex = Math.max(0, i - 1);
          break;
        }
      }
    }
    if (activeIndex === -1 && words.length > 0) activeIndex = words.length - 1;

    // Render 4-5 words around active word
    const windowStart = Math.max(0, activeIndex - 2);
    const windowEnd = Math.min(words.length, windowStart + 5);
    const visibleWords = words.slice(windowStart, windowEnd);

    phraseContainer.innerHTML = visibleWords.map((w, idx) => {
      const isWordActive = (windowStart + idx) === activeIndex;
      return `<span class="caption-word ${isWordActive ? 'active-word' : ''}">${w.word}</span>`;
    }).join(' ');
  }

  // -------------------------------------------------------------------------
  // Aspect Ratio & Layout Framing
  // -------------------------------------------------------------------------
  function bindRatioButtons() {
    const aspectBtns = document.querySelectorAll('.aspect-btn');
    aspectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        aspectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const ratio = btn.getAttribute('data-ratio');
        setAspectRatio(ratio);
      });
    });
  }

  function setAspectRatio(ratio) {
    currentRatio = ratio;
    const stage = document.getElementById('playerStage');
    if (!stage) return;

    stage.classList.remove('ratio-9-16', 'ratio-16-9', 'ratio-1-1');
    stage.classList.add(`ratio-${ratio}`);
  }

  function bindFramingMode() {
    const select = document.getElementById('selectFramingMode');
    if (select) {
      select.addEventListener('change', (e) => {
        currentFraming = e.target.value;
        const stage = document.getElementById('playerStage');
        const splitBottom = document.getElementById('stageSplitBottom');

        if (!stage) return;
        stage.classList.remove('mode-blur', 'mode-split');

        if (currentFraming === 'blur_stack') {
          stage.classList.add('mode-blur');
          if (splitBottom) splitBottom.style.display = 'none';
        } else if (currentFraming === 'split_screen') {
          stage.classList.add('mode-split');
          if (splitBottom) splitBottom.style.display = 'flex';
        } else {
          if (splitBottom) splitBottom.style.display = 'none';
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // Subtitle Style Presets
  // -------------------------------------------------------------------------
  function bindStylePresets() {
    const presetBtns = document.querySelectorAll('.style-preset-btn[data-style]');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const style = btn.getAttribute('data-style');
        setCaptionStyle(style);
      });
    });
  }

  function setCaptionStyle(styleName) {
    currentCaptionStyle = styleName;
    const stage = document.getElementById('playerStage');
    if (!stage) return;

    stage.classList.remove('style-hormozi', 'style-beast', 'style-cyber', 'style-clean', 'style-gta');
    stage.classList.add(`style-${styleName}`);
  }

  function renderTranscriptPills(words) {
    const list = document.getElementById('studioWordList');
    if (!list) return;

    if (words.length === 0) {
      list.innerHTML = `<span style="font-size:11px;color:var(--text-muted)">No transcript words.</span>`;
      return;
    }

    list.innerHTML = words.map((w, idx) => `
      <span class="transcript-word-pill" data-idx="${idx}" onclick="ClipForge.EditorModule.jumpToWord(${w.start})">
        ${w.word}
      </span>
    `).join('');
  }

  function jumpToWord(startSec) {
    if (videoEl) {
      videoEl.currentTime = startTime + startSec;
    }
  }

  // -------------------------------------------------------------------------
  // Timeline Scrubber & Trim Handles Dragger
  // -------------------------------------------------------------------------
  function bindTimelineDragging() {
    const track = document.getElementById('timelineTrack');
    const startHandle = document.getElementById('handleStartTrim');
    const endHandle = document.getElementById('handleEndTrim');

    let dragging = null;

    if (startHandle) {
      startHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        dragging = 'start';
      });
    }

    if (endHandle) {
      endHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        dragging = 'end';
      });
    }

    if (track) {
      track.addEventListener('click', (e) => {
        if (dragging) return;
        const rect = track.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = clickX / rect.width;
        const maxDuration = (activeProject && activeProject.duration) || 60.0;
        const targetTime = pct * maxDuration;
        if (videoEl) videoEl.currentTime = targetTime;
      });
    }

    window.addEventListener('mousemove', (e) => {
      if (!dragging || !track) return;
      const rect = track.getBoundingClientRect();
      const clientX = Math.max(rect.left, Math.min(rect.right, e.clientX));
      const pct = (clientX - rect.left) / rect.width;
      const maxDuration = (activeProject && activeProject.duration) || 60.0;
      const timeVal = round1(pct * maxDuration);

      if (dragging === 'start') {
        if (timeVal < endTime - 3.0) {
          startTime = Math.max(0, timeVal);
          if (videoEl) videoEl.currentTime = startTime;
        }
      } else if (dragging === 'end') {
        if (timeVal > startTime + 3.0) {
          endTime = Math.min(maxDuration, timeVal);
        }
      }

      updateTimecodes();
      updateTimelineHandles();
    });

    window.addEventListener('mouseup', () => {
      dragging = null;
    });
  }

  function updateTimelineHandles() {
    const maxDuration = (activeProject && activeProject.duration) || 60.0;
    const startHandle = document.getElementById('handleStartTrim');
    const endHandle = document.getElementById('handleEndTrim');
    const activeRange = document.getElementById('timelineActiveRange');

    const startPct = (startTime / maxDuration) * 100;
    const endPct = (endTime / maxDuration) * 100;

    if (startHandle) startHandle.style.left = `${startPct}%`;
    if (endHandle) endHandle.style.left = `${endPct}%`;
    if (activeRange) {
      activeRange.style.left = `${startPct}%`;
      activeRange.style.width = `${endPct - startPct}%`;
    }
  }

  function updateTimecodes() {
    const tcTotal = document.getElementById('tcTotal');
    const tcClipLen = document.getElementById('tcClipLength');

    const clipLen = Math.max(0, endTime - startTime);
    if (tcTotal) tcTotal.textContent = formatTimecode(endTime);
    if (tcClipLen) tcClipLen.textContent = `${clipLen.toFixed(1)}s`;
  }

  function formatTimecode(sec) {
    sec = Math.max(0, sec || 0);
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    const ms = Math.floor((sec % 1) * 10);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}.${ms}`;
  }

  function drawSyntheticWaveform() {
    const canvas = document.getElementById('waveformCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = (canvas.width = canvas.parentElement.clientWidth || 800);
    const h = (canvas.height = 70);

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#1e2438';

    const bars = Math.floor(w / 4);
    for (let i = 0; i < bars; i++) {
      const barH = Math.sin(i * 0.15) * 15 + Math.cos(i * 0.3) * 10 + 20 + (Math.random() * 12);
      const x = i * 4;
      const y = (h - barH) / 2;
      ctx.fillRect(x, y, 2.5, barH);
    }
  }

  // -------------------------------------------------------------------------
  // Background Royalty-Free Music Generator (Web Audio API Synthesizer)
  // -------------------------------------------------------------------------
  function bindMusicControls() {
    const trackItems = document.querySelectorAll('.music-track-item');
    trackItems.forEach(item => {
      item.addEventListener('click', () => {
        trackItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        musicType = item.getAttribute('data-music');
        ClipForge.showToast(`Background music set: ${musicType.toUpperCase()}`, 'info');
      });
    });

    const sliderVol = document.getElementById('sliderMusicVol');
    if (sliderVol) {
      sliderVol.addEventListener('input', (e) => {
        musicVol = parseInt(e.target.value, 10) / 100;
        document.getElementById('labelMusicVol').textContent = `${e.target.value}%`;
        if (bgMusicGain) bgMusicGain.gain.value = musicVol;
      });
    }
  }

  function startBgMusic() {
    if (musicType === 'none') return;
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      bgMusicOscillator = audioContext.createOscillator();
      bgMusicGain = audioContext.createGain();

      bgMusicOscillator.type = musicType === 'phonk' ? 'sawtooth' : 'sine';
      bgMusicOscillator.frequency.setValueAtTime(musicType === 'lofi' ? 120 : 80, audioContext.currentTime);

      bgMusicGain.gain.setValueAtTime(musicVol * 0.15, audioContext.currentTime);

      bgMusicOscillator.connect(bgMusicGain);
      bgMusicGain.connect(audioContext.destination);

      bgMusicOscillator.start();
    } catch (e) {
      console.warn('Web Audio synthesis fallback:', e);
    }
  }

  function stopBgMusic() {
    try {
      if (bgMusicOscillator) {
        bgMusicOscillator.stop();
        bgMusicOscillator.disconnect();
        bgMusicOscillator = null;
      }
    } catch (e) {}
  }

  function bindStudioTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn[data-studiotab]');
    const panels = document.querySelectorAll('.sidebar-panel-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-studiotab');

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        panels.forEach(p => {
          if (p.id === targetId) {
            p.style.display = 'block';
          } else {
            p.style.display = 'none';
          }
        });
      });
    });
  }

  async function saveClipChanges() {
    if (!activeClip) return;
    const btnSave = document.getElementById('btnStudioSaveClip');
    btnSave.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

    const hook = document.getElementById('inputHookText').value.trim();
    const caption = document.getElementById('inputCaptionText').value.trim();
    const tags = document.getElementById('inputHashtagsText').value.trim();

    try {
      const res = await fetch(`/api/clips/${activeClip.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hook: hook,
          caption: caption,
          hashtags: tags,
          start_time: startTime,
          end_time: endTime,
          duration: round1(endTime - startTime),
          aspect_ratio: currentRatio.replace('-', ':'),
          layout_preset: currentFraming,
          caption_style: currentCaptionStyle,
          background_music: musicType,
          music_volume: musicVol
        })
      });

      if (res.ok) {
        ClipForge.showToast('Clip modifications saved successfully! ✨', 'success');
      }
    } catch (e) {
      ClipForge.showToast('Error saving clip', 'error');
    } finally {
      btnSave.innerHTML = '<i class="fa-regular fa-floppy-disk"></i> Save Changes';
    }
  }

  function round1(num) {
    return Math.round(num * 10) / 10;
  }

  return {
    init,
    loadClip,
    jumpToWord
  };
})();
