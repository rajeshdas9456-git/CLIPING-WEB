/**
 * ClipForge AI - Client-Side API & Vercel Serverless Simulator
 * Intercepts /api/* requests so ClipForge works 100% on Vercel without requiring a Python server!
 */

(function () {
  'use strict';

  // Seed Data for Vercel / Client-Side operation
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
          project_id: 'proj_ai_future',
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
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: '/data/samples/demo.mp4',
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
          project_id: 'proj_ai_future',
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
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: '/data/samples/demo.mp4',
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
          project_id: 'proj_hindi_tech',
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
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: '/data/samples/demo.mp4',
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
          project_id: 'proj_bengali_tech',
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
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: '/data/samples/demo.mp4',
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
          project_id: 'proj_live_drone',
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
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: '/data/samples/demo.mp4',
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

  // Initialize LocalStorage with seed data if empty
  function getProjects() {
    try {
      const stored = localStorage.getItem('cf_projects');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem('cf_projects', JSON.stringify(SEED_PROJECTS));
    return SEED_PROJECTS;
  }

  function saveProjects(projects) {
    localStorage.setItem('cf_projects', JSON.stringify(projects));
  }

  const originalFetch = window.fetch;

  // Intercept all /api/* requests
  window.fetch = async function (url, options = {}) {
    const urlStr = typeof url === 'string' ? url : (url.url || '');

    // If not an /api/ call, pass through to original fetch
    if (!urlStr.startsWith('/api/')) {
      return originalFetch.apply(this, arguments);
    }

    const method = (options.method || 'GET').toUpperCase();
    let body = {};
    if (options.body) {
      try {
        body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
      } catch (e) {}
    }

    // Helper to return mock Response
    function mockJson(data, status = 200) {
      return Promise.resolve(new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // 1. Dashboard Stats
    if (urlStr === '/api/dashboard/stats') {
      const projs = getProjects();
      let totalClips = 0;
      projs.forEach(p => { totalClips += (p.clips ? p.clips.length : 4); });
      return mockJson({
        total_projects: 48,
        total_clips: 186,
        storage_used_gb: 3.4,
        storage_limit_gb: 10.0,
        storage_percent: 34,
        viral_reach_potential: '1.4M+',
        recent_projects: projs,
        active_jobs: []
      });
    }

    // 2. Health
    if (urlStr === '/api/health') {
      return mockJson({ status: 'healthy', uptime: Date.now(), version: '2.4', workers: 4 });
    }

    // 3. Current User Auth
    if (urlStr === '/api/auth/me') {
      return mockJson({
        id: 'usr_creator_002',
        email: 'creator@clipforge.ai',
        full_name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        plan: 'pro',
        role: 'user',
        storage_used_mb: 3420,
        storage_limit_mb: 10240,
        clips_used: 46,
        clips_limit: 100
      });
    }

    // 4. Auth: Login
    if (urlStr === '/api/auth/login') {
      return mockJson({
        success: true,
        user: {
          id: 'usr_creator_002',
          email: body.email || 'creator@clipforge.ai',
          full_name: 'Sarah Jenkins',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          plan: 'pro',
          role: body.email === 'admin@clipforge.ai' ? 'admin' : 'user',
          storage_used_mb: 3420,
          storage_limit_mb: 10240,
          clips_used: 46,
          clips_limit: 100
        },
        token: 'token_mock_' + Date.now()
      });
    }

    // 5. Auth: Register / Google
    if (urlStr === '/api/auth/register' || urlStr === '/api/auth/google') {
      const email = body.email || 'google.creator@gmail.com';
      return mockJson({
        success: true,
        user: {
          id: 'usr_' + Date.now(),
          email: email,
          full_name: body.full_name || body.name || 'Creator',
          avatar: body.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          plan: 'pro',
          role: 'user',
          storage_used_mb: 120,
          storage_limit_mb: 10240,
          clips_used: 2,
          clips_limit: 100
        },
        token: 'token_mock_' + Date.now()
      });
    }

    // 6. Auth: Forgot Password
    if (urlStr === '/api/auth/forgot-password') {
      return mockJson({ success: true, message: `Password reset link sent to ${body.email || 'your email'}.` });
    }

    // 7. List Projects
    if (urlStr.startsWith('/api/projects') && method === 'GET') {
      const projs = getProjects();
      if (urlStr.includes('/api/projects/')) {
        const pId = urlStr.replace('/api/projects/', '').split('?')[0];
        const found = projs.find(p => p.id === pId);
        if (found) return mockJson(found);
        return mockJson({ error: true, message: 'Project not found' }, 404);
      }
      return mockJson(projs);
    }

    // 8. Create Project
    if (urlStr === '/api/projects' && method === 'POST') {
      const projs = getProjects();
      const newP = {
        id: 'proj_' + Date.now(),
        title: body.title || 'Untitled Project',
        source_type: body.source_type || 'upload',
        source_url: body.source_url || '',
        video_path: body.video_path || '/data/samples/demo.mp4',
        thumbnail_url: body.thumbnail_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
        duration: body.duration || 1800.0,
        clips_count: 4,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
        clips: SEED_PROJECTS[0].clips
      };
      projs.unshift(newP);
      saveProjects(projs);
      return mockJson(newP);
    }

    // 9. Update Project
    if (urlStr.startsWith('/api/projects/') && method === 'PUT') {
      const pId = urlStr.replace('/api/projects/', '');
      const projs = getProjects();
      const p = projs.find(x => x.id === pId);
      if (p) {
        if (body.title) p.title = body.title;
        saveProjects(projs);
      }
      return mockJson({ success: true, message: 'Project updated' });
    }

    // 10. Delete Project
    if (urlStr.startsWith('/api/projects/') && method === 'DELETE') {
      const pId = urlStr.replace('/api/projects/', '');
      let projs = getProjects();
      projs = projs.filter(x => x.id !== pId);
      saveProjects(projs);
      return mockJson({ success: true, message: 'Project deleted' });
    }

    // 11. YouTube URL Validation
    if (urlStr === '/api/import/youtube') {
      const url = body.url || '';
      let videoId = 'L_Guz73e6fw';
      if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
      else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
      else if (url.includes('live/')) videoId = url.split('live/')[1].split('?')[0];

      return mockJson({
        video_id: videoId,
        url: url,
        title: body.title || 'YouTube Video (' + videoId + ')',
        channel: 'Featured Creator',
        thumbnail_url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        fallback_thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        duration: 1820.0,
        duration_formatted: '30:20',
        authorized: true
      });
    }

    // 12. AI Automatic Clip Generator
    if (urlStr === '/api/generate-clips') {
      const projs = getProjects();
      const p = projs.find(x => x.id === body.project_id) || projs[0];
      const dur = parseFloat(body.clip_duration) || 30.0;
      const lang = body.language || 'en';

      let genClips = [];
      if (lang === 'hi') {
        genClips = SEED_PROJECTS[1].clips;
      } else if (lang === 'bn') {
        genClips = SEED_PROJECTS[2].clips;
      } else {
        genClips = SEED_PROJECTS[0].clips;
      }

      if (p) {
        p.clips = genClips;
        p.clips_count = genClips.length;
        saveProjects(projs);
      }
      return mockJson({ success: true, clips_count: genClips.length, clips: genClips });
    }

    // 13. Update Clip
    if (urlStr.startsWith('/api/clips/') && method === 'PUT') {
      return mockJson({ success: true, message: 'Clip saved' });
    }

    // 14. Export
    if (urlStr === '/api/export') {
      return mockJson({
        success: true,
        download_url: '/data/samples/demo.mp4',
        preset: body.preset || 'youtube_shorts',
        resolution: body.resolution || '1080p'
      });
    }

    // 15. Admin Metrics
    if (urlStr === '/api/admin/metrics') {
      return mockJson({
        registered_users: 14822,
        total_videos_processed: 84294,
        total_clips_rendered: 312456,
        monthly_recurring_revenue: '$48,650',
        mrr_growth: '+16.8%',
        avg_conversion_rate: '4.8%',
        active_gpu_workers: 4,
        gpu_cluster_load: '42%',
        cpu_load: '28%',
        ram_usage: '14.2 / 32 GB',
        queue_pending_jobs: 2,
        server_uptime: '99.98%'
      });
    }

    // 16. Admin Users
    if (urlStr === '/api/admin/users') {
      return mockJson([
        { id: 'usr_admin', full_name: 'Alex Forge (Admin)', email: 'admin@clipforge.ai', plan: 'agency', clips_used: 142, clips_limit: 500, storage_used_mb: 4280, storage_limit_mb: 51200, status: 'active' },
        { id: 'usr_002', full_name: 'Sarah Jenkins', email: 'creator@clipforge.ai', plan: 'pro', clips_used: 46, clips_limit: 100, storage_used_mb: 3420, storage_limit_mb: 10240, status: 'active' },
        { id: 'usr_003', full_name: 'Rohit Tech', email: 'rohit.tech@gmail.com', plan: 'free', clips_used: 8, clips_limit: 10, storage_used_mb: 850, storage_limit_mb: 2048, status: 'active' },
        { id: 'usr_004', full_name: 'Dev Gamer', email: 'gamer99@twitch.tv', plan: 'pro', clips_used: 89, clips_limit: 100, storage_used_mb: 8900, storage_limit_mb: 10240, status: 'active' }
      ]);
    }

    // 17. Admin User Action
    if (urlStr.includes('/api/admin/users/') && urlStr.endsWith('/action')) {
      return mockJson({ success: true, message: 'Action applied' });
    }

    // 18. Admin Logs
    if (urlStr === '/api/admin/logs') {
      return mockJson([
        { id: 'l1', timestamp: '2026-11-21 12:30:15', level: 'INFO', module: 'AI Engine', message: 'ClipForge AI Engine ready with Faster-Whisper Large-v3 and Gemini Pro', details: 'NVENC GPU acceleration enabled' },
        { id: 'l2', timestamp: '2026-11-21 12:28:40', level: 'INFO', module: 'Cluster', message: '4 rendering worker threads active and listening', details: 'Vercel Serverless Ready' }
      ]);
    }

    // 19. Admin Settings
    if (urlStr === '/api/admin/settings') {
      return mockJson({ success: true, message: 'Settings saved' });
    }

    // Default fallback
    return mockJson({ success: true });
  };
})();
