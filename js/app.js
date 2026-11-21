/**
 * ClipForge AI - Core Application Controller & State
 */

window.ClipForge = (function () {
  'use strict';

  // Global App State
  const state = {
    currentUser: null,
    activeView: 'dashboard',
    currentProject: null,
    currentClip: null,
    projects: [],
    clips: []
  };

  // DOM Elements cache
  let dom = {};

  function init() {
    cacheDom();
    bindEvents();
    
    // Check initial route / view from hash
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    navigateTo(hash);

    // Initialize modules
    if (window.AuthModule) window.AuthModule.init();
    if (window.DashboardModule) window.DashboardModule.init();
    if (window.ImporterModule) window.ImporterModule.init();
    if (window.GeneratorModule) window.GeneratorModule.init();
    if (window.EditorModule) window.EditorModule.init();
    if (window.SubtitlesModule) window.SubtitlesModule.init();
    if (window.ExportModule) window.ExportModule.init();
    if (window.AdminModule) window.AdminModule.init();

    // Load initial sample project into active state
    loadInitialData();
  }

  function cacheDom() {
    dom.sidebar = document.getElementById('appSidebar');
    dom.btnToggleSidebar = document.getElementById('btnToggleSidebar');
    dom.navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    dom.pageViews = document.querySelectorAll('.page-view');
    dom.btnQuickCreate = document.getElementById('btnQuickCreate');
    dom.globalSearch = document.getElementById('globalSearchInput');
    dom.toastContainer = document.getElementById('toastContainer');
  }

  function bindEvents() {
    // Sidebar navigation clicks
    dom.navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.getAttribute('data-view');
        if (targetView) navigateTo(targetView);
        if (window.innerWidth <= 768) {
          dom.sidebar.classList.remove('mobile-open');
        }
      });
    });

    // Mobile sidebar toggle
    if (dom.btnToggleSidebar) {
      dom.btnToggleSidebar.addEventListener('click', () => {
        dom.sidebar.classList.toggle('mobile-open');
      });
    }

    // Quick create button in header
    if (dom.btnQuickCreate) {
      dom.btnQuickCreate.addEventListener('click', () => {
        navigateTo('importer');
      });
    }

    // Global Search
    if (dom.globalSearch) {
      dom.globalSearch.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (window.DashboardModule && state.activeView === 'dashboard') {
          window.DashboardModule.filterProjects(query);
        } else if (state.activeView === 'projects') {
          renderProjectsList(query);
        }
      });
    }

    // Hash change router listener
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      navigateTo(hash, false);
    });
  }

  function navigateTo(viewName, updateHash = true) {
    if (!viewName) return;
    const targetSection = document.getElementById(`view-${viewName}`);
    if (!targetSection) return;

    state.activeView = viewName;
    if (updateHash) {
      window.location.hash = viewName;
    }

    // Update active nav item
    dom.navItems.forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update visible view section
    dom.pageViews.forEach(view => {
      if (view.id === `view-${viewName}`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Refresh view specific data
    if (viewName === 'dashboard' && window.DashboardModule) {
      window.DashboardModule.refresh();
    } else if (viewName === 'projects') {
      loadProjectsList();
    } else if (viewName === 'admin' && window.AdminModule) {
      window.AdminModule.refresh();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Client-side fallback seed projects for Vercel / static deployments
  const SEED_PROJECTS = [
    {
      id: 'proj_ai_future',
      title: 'The Future of Artificial Intelligence - Lex & Sam Podcast',
      source_type: 'youtube',
      source_url: 'https://www.youtube.com/watch?v=L_Guz73e6fw',
      video_path: '/data/samples/demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      duration: 3840.0,
      clips_count: 5,
      created_at: '2026-11-21 12:00:00',
      clips: [
        {
          id: 'clip_ai_001',
          title: 'The Shocking Truth About AGI Nobody Tells You 🧠',
          hook: 'WAIT UNTIL YOU HEAR HOW CLOSE WE REALLY ARE 🤯',
          caption: 'The timeline is collapsing faster than anyone predicted. Are we ready for recursive self-improving AI? Drop your thoughts below! 👇',
          hashtags: '#AI #TechNews #ArtificialIntelligence #SamAltman #Singularity #Shorts #Reels',
          start_time: 2.0,
          end_time: 16.5,
          duration: 14.5,
          virality_score: 98,
          hook_rate: 99,
          retention_score: 97,
          rewatch_score: 95,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'hormozi',
          background_music: 'lofi',
          music_volume: 0.20,
          transcript: [
            {"word": "The", "start": 0.0, "end": 0.2},
            {"word": "secret", "start": 0.2, "end": 0.6},
            {"word": "to", "start": 0.6, "end": 0.8},
            {"word": "AGI", "start": 0.8, "end": 1.2},
            {"word": "is", "start": 1.2, "end": 1.4},
            {"word": "not", "start": 1.4, "end": 1.7},
            {"word": "what", "start": 1.7, "end": 1.9},
            {"word": "people", "start": 1.9, "end": 2.3},
            {"word": "think.", "start": 2.3, "end": 2.8},
            {"word": "It's", "start": 3.0, "end": 3.2},
            {"word": "all", "start": 3.2, "end": 3.4},
            {"word": "about", "start": 3.4, "end": 3.7},
            {"word": "recursive", "start": 3.7, "end": 4.4},
            {"word": "self-improvement.", "start": 4.4, "end": 5.4}
          ]
        },
        {
          id: 'clip_ai_002',
          title: 'Why 99% Of People Misunderstand Neural Networks',
          hook: 'STOP LEARNING TRADITIONAL CODING TODAY ❌',
          caption: 'Software engineering is changing at the core level. In 3 years, programming will be natural language orchestration.',
          hashtags: '#Coding #SoftwareEngineer #AIRevolution #MachineLearning #WebDev #Shorts',
          start_time: 18.0,
          end_time: 48.0,
          duration: 30.0,
          virality_score: 94,
          hook_rate: 96,
          retention_score: 92,
          rewatch_score: 91,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'blur_stack',
          caption_style: 'beast',
          background_music: 'phonk',
          music_volume: 0.25,
          transcript: [
            {"word": "If", "start": 0.0, "end": 0.2},
            {"word": "you", "start": 0.2, "end": 0.4},
            {"word": "are", "start": 0.4, "end": 0.6},
            {"word": "still", "start": 0.6, "end": 0.9},
            {"word": "coding", "start": 0.9, "end": 1.3},
            {"word": "the", "start": 1.3, "end": 1.5},
            {"word": "old", "start": 1.5, "end": 1.8},
            {"word": "way,", "start": 1.8, "end": 2.2},
            {"word": "you", "start": 2.2, "end": 2.4},
            {"word": "are", "start": 2.4, "end": 2.6},
            {"word": "falling", "start": 2.6, "end": 3.1},
            {"word": "behind.", "start": 3.1, "end": 3.6}
          ]
        }
      ]
    },
    {
      id: 'proj_hindi_tech',
      title: '₹1,00,000 Mystery Tech Box Unboxing (Hindi)',
      source_type: 'youtube',
      source_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_path: '/data/samples/demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      duration: 1420.0,
      clips_count: 4,
      created_at: '2026-11-21 11:30:00',
      clips: [
        {
          id: 'clip_hi_001',
          title: '₹1 लाख के बॉक्स में ये क्या निकला?! 😱🔥',
          hook: 'ये गैजेट भारत में पहली बार आया है! 🚀',
          caption: 'आखिरी 5 सेकंड देखना बिल्कुल मत भूलना! ये फीचर देखकर आप दंग रह जाएंगे। क्या आप इसे खरीदेंगे? 💬',
          hashtags: '#TechHindi #Unboxing #Gadgets #IndianTech #ShortsIndia #ViralReels #HindiTech',
          start_time: 1.0,
          end_time: 15.5,
          duration: 14.5,
          virality_score: 96,
          hook_rate: 98,
          retention_score: 95,
          rewatch_score: 93,
          language: 'hi',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'cyber',
          background_music: 'upbeat',
          music_volume: 0.30,
          transcript: [
            {"word": "इस", "start": 0.0, "end": 0.2},
            {"word": "बॉक्स", "start": 0.2, "end": 0.5},
            {"word": "में", "start": 0.5, "end": 0.7},
            {"word": "क्या", "start": 0.7, "end": 0.9},
            {"word": "निकला", "start": 0.9, "end": 1.3},
            {"word": "आप", "start": 1.3, "end": 1.5},
            {"word": "सोच", "start": 1.5, "end": 1.8},
            {"word": "भी", "start": 1.8, "end": 2.0},
            {"word": "नहीं", "start": 2.0, "end": 2.3},
            {"word": "सकते!", "start": 2.3, "end": 2.9}
          ]
        }
      ]
    },
    {
      id: 'proj_bengali_tech',
      title: '২০২৬ সালে সেরা ৩টি প্রোগ্রামিং ল্যাঙ্গুয়েজ (Bengali)',
      source_type: 'youtube',
      source_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      video_path: '/data/samples/demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      duration: 1890.0,
      clips_count: 3,
      created_at: '2026-11-21 10:15:00',
      clips: [
        {
          id: 'clip_bn_001',
          title: '২০২৬ এ কোডিং শুরু করার সেরা সঠিক উপায় 💻',
          hook: 'এই ভুলটা করলে ক্যারিয়ার শেষ হতে পারে ⚠️',
          caption: 'প্রোগ্রামিং শেখার আগে এই ৩টি গুরুত্বপূর্ণ বিষয় অবশ্যই জানা দরকার। বন্ধুদের সাথে শেয়ার করুন! 🚀',
          hashtags: '#BanglaTech #CodingInBengali #WebDevBangla #LearnProgramming #BanglaShorts',
          start_time: 0.5,
          end_time: 15.0,
          duration: 14.5,
          virality_score: 95,
          hook_rate: 97,
          retention_score: 94,
          rewatch_score: 91,
          language: 'bn',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'hormozi',
          background_music: 'ambient',
          music_volume: 0.20,
          transcript: [
            {"word": "আপনি", "start": 0.0, "end": 0.3},
            {"word": "যদি", "start": 0.3, "end": 0.5},
            {"word": "নতুন", "start": 0.5, "end": 0.8},
            {"word": "কোডিং", "start": 0.8, "end": 1.2},
            {"word": "শুরু", "start": 1.2, "end": 1.5},
            {"word": "করতে", "start": 1.5, "end": 1.8},
            {"word": "চান,", "start": 1.8, "end": 2.2}
          ]
        }
      ]
    },
    {
      id: 'proj_live_drone',
      title: 'World Drone Racing Championship - Official Live Stream VOD',
      source_type: 'youtube_live',
      source_url: 'https://www.youtube.com/live/exampleDroneVOD',
      video_path: '/data/samples/demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80',
      duration: 5200.0,
      clips_count: 4,
      created_at: '2026-11-21 09:00:00',
      clips: [
        {
          id: 'clip_live_001',
          title: 'Insane 200KM/H Drone Crash Reaction 🏁💥',
          hook: 'YOU WON\'T BELIEVE THIS DRONE SURVIVED 😱',
          caption: 'Full throttle gap through the burning ring! Incredible pilot reflexes caught on live stream broadcast.',
          hashtags: '#FPV #DroneRacing #ExtremeSports #LiveMoments #GamingReels #ViralClips',
          start_time: 3.0,
          end_time: 22.0,
          duration: 19.0,
          virality_score: 97,
          hook_rate: 99,
          retention_score: 96,
          rewatch_score: 94,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'gta',
          background_music: 'phonk',
          music_volume: 0.35,
          transcript: [
            {"word": "You", "start": 0.0, "end": 0.3},
            {"word": "won't", "start": 0.3, "end": 0.6},
            {"word": "believe", "start": 0.6, "end": 1.1},
            {"word": "this", "start": 1.1, "end": 1.4},
            {"word": "drone", "start": 1.4, "end": 1.8},
            {"word": "survived!", "start": 1.8, "end": 2.5}
          ]
        }
      ]
    }
  ];

  async function loadInitialData() {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        state.projects = await res.json();
      } else {
        throw new Error('Using fallback seed data');
      }
    } catch (e) {
      console.log('Using built-in Vercel offline seed projects');
      state.projects = JSON.parse(localStorage.getItem('clipforge_projects') || 'null') || SEED_PROJECTS;
    }

    if (state.projects.length > 0 && !state.currentProject) {
      await selectProject(state.projects[0].id);
    }
  }

  async function selectProject(projectId) {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (res.ok) {
        const projData = await res.json();
        applyProjectData(projData);
        return;
      }
    } catch (err) {}

    // Fallback search in memory
    const found = state.projects.find(p => p.id === projectId) || SEED_PROJECTS.find(p => p.id === projectId);
    if (found) {
      applyProjectData(found);
    }
  }

  function applyProjectData(projData) {
    state.currentProject = projData;
    state.clips = projData.clips || [];

    const titleEl = document.getElementById('activeProjTitle');
    if (titleEl) titleEl.textContent = projData.title;

    if (state.clips.length > 0) {
      state.currentClip = state.clips[0];
      if (window.EditorModule) {
        window.EditorModule.loadClip(state.currentClip, projData);
      }
      if (window.SubtitlesModule) {
        window.SubtitlesModule.loadTranscript(state.currentClip.transcript || []);
      }
    }

    if (window.GeneratorModule) {
      window.GeneratorModule.renderClips(state.clips);
    }
  }
    } catch (err) {
      console.error('Error selecting project:', err);
    }
  }

  function openImportModal() {
    navigateTo('importer');
  }

  function openImportTab(tabKey) {
    navigateTo('importer');
    const tabMap = {
      'youtube': 'tab-yt-url',
      'live': 'tab-yt-live',
      'upload': 'tab-upload',
      'samples': 'tab-samples'
    };
    const targetTabId = tabMap[tabKey] || 'tab-yt-url';
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${targetTabId}"]`);
    if (tabBtn) tabBtn.click();
  }

  function quickLoadEditor(projectId) {
    selectProject(projectId).then(() => {
      navigateTo('editor');
    });
  }

  function loadSampleProject(projectId) {
    selectProject(projectId).then(() => {
      showToast('Sample creator video loaded with AI analysis!', 'success');
      navigateTo('generator');
    });
  }

  async function loadProjectsList() {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        state.projects = await res.json();
        renderProjectsList();
      }
    } catch (e) {
      console.error('Failed to load projects:', e);
    }
  }

  function renderProjectsList(filterQuery = '') {
    const container = document.getElementById('allProjectsContainer');
    const countLabel = document.getElementById('projectsCountLabel');
    if (!container) return;

    let filtered = state.projects;
    if (filterQuery) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(filterQuery));
    }

    if (countLabel) countLabel.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size:36px;margin-bottom:12px;opacity:0.5;"></i>
          <p>No projects found. Import a new YouTube video or upload a file to get started!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => `
      <div class="project-card">
        <div class="project-thumb-wrap">
          <img src="${p.thumbnail_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'}" alt="${p.title}" class="project-thumb">
          <span class="source-type-pill ${p.source_type || 'youtube'}">
            ${p.source_type === 'youtube_live' ? '<span class="live-dot"></span> Live Stream' : (p.source_type || 'YouTube')}
          </span>
          <span class="thumb-overlay-badge">${formatTime(p.duration || 1800)}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <div class="project-meta-row">
            <span class="clip-count-pill"><i class="fa-solid fa-bolt"></i> ${p.clips_count || 4} AI Clips</span>
            <span>${p.created_at ? p.created_at.split(' ')[0] : 'Today'}</span>
          </div>
          <div class="project-actions">
            <button class="btn btn-primary btn-sm" onclick="ClipForge.quickLoadEditor('${p.id}')">
              <i class="fa-solid fa-film"></i> Open Studio
            </button>
            <button class="btn btn-secondary btn-sm" onclick="ClipForge.openRenameModal('${p.id}', '${escapeHtml(p.title)}')">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="btn btn-secondary btn-sm" style="color:#ef4444;" onclick="ClipForge.deleteProject('${p.id}')">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function openRenameModal(projId, currentTitle) {
    document.getElementById('renameProjectId').value = projId;
    document.getElementById('inputRenameTitle').value = currentTitle;
    openModal('modalRename');
  }

  async function deleteProject(projId) {
    if (!confirm('Are you sure you want to delete this project and all its generated clips?')) return;
    try {
      const res = await fetch(`/api/projects/${projId}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Project deleted successfully', 'info');
        loadProjectsList();
        if (state.currentProject && state.currentProject.id === projId) {
          state.currentProject = null;
          state.clips = [];
        }
      }
    } catch (e) {
      showToast('Error deleting project', 'error');
    }
  }

  // Modal helpers
  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  }

  // Toast Notifications
  function showToast(message, type = 'info') {
    if (!dom.toastContainer) dom.toastContainer = document.getElementById('toastContainer');
    if (!dom.toastContainer) return;

    const icons = {
      success: 'fa-circle-check',
      error: 'fa-circle-exclamation',
      info: 'fa-circle-info'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${icons[type] || 'fa-bell'}"></i>
      <span style="font-size:13px;font-weight:600;">${message}</span>
    `;

    dom.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function formatTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins >= 60) {
      const hrs = Math.floor(mins / 60);
      const remMins = mins % 60;
      return `${hrs}:${remMins < 10 ? '0' : ''}${remMins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function copyField(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      navigator.clipboard.writeText(el.value).then(() => {
        showToast('Copied to clipboard! 📋', 'success');
      });
    }
  }

  function escapeHtml(str) {
    return (str || '').replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Global project rename confirmation
  document.addEventListener('DOMContentLoaded', () => {
    init();
    const btnConfirmRename = document.getElementById('btnConfirmRename');
    if (btnConfirmRename) {
      btnConfirmRename.addEventListener('click', async () => {
        const projId = document.getElementById('renameProjectId').value;
        const newTitle = document.getElementById('inputRenameTitle').value.trim();
        if (!newTitle) return;

        try {
          const res = await fetch(`/api/projects/${projId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
          });
          if (res.ok) {
            showToast('Project title updated!', 'success');
            closeModal('modalRename');
            loadProjectsList();
            if (state.currentProject && state.currentProject.id === projId) {
              state.currentProject.title = newTitle;
              document.getElementById('activeProjTitle').textContent = newTitle;
            }
          }
        } catch (e) {
          showToast('Failed to update project title', 'error');
        }
      });
    }
  });

  return {
    state,
    navigateTo,
    selectProject,
    openImportModal,
    openImportTab,
    quickLoadEditor,
    loadSampleProject,
    deleteProject,
    openRenameModal,
    openModal,
    closeModal,
    showToast,
    formatTime,
    copyField
  };
})();
