/**
 * ClipForge AI - Client-Side API & Vercel Serverless Simulator (v2.5)
 * Generates 10+ High-Retention Viral Shorts & Reels with 4K Ultra HD Support!
 */

(function () {
  'use strict';

  // Seed Data: 10 High-Hook Viral Clips per Project
  const SEED_PROJECTS = [
    {
      id: 'proj_ai_future',
      title: 'The Future of Artificial Intelligence - Lex & Sam Podcast',
      source_type: 'youtube',
      source_url: 'https://www.youtube.com/watch?v=L_Guz73e6fw',
      video_path: 'data/samples/demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      duration: 3840.0,
      clips_count: 10,
      created_at: '2026-11-21 12:00:00',
      clips: [
        {
          id: 'clip_ai_001',
          project_id: 'proj_ai_future',
          title: 'The Secret About AGI Nobody In Silicon Valley Talks About 🧠',
          hook: 'WAIT FOR THE END: AI JUST CROSSED THE LINE 🚨',
          caption: 'The timeline is collapsing faster than anyone predicted. Are we ready for recursive self-improving AI? Drop your thoughts below! 👇',
          hashtags: '#AI #TechNews #ArtificialIntelligence #SamAltman #Singularity #Shorts #Reels #4K',
          start_time: 2.0,
          end_time: 17.0,
          duration: 15.0,
          virality_score: 99,
          hook_rate: 99,
          retention_score: 98,
          rewatch_score: 96,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'hormozi',
          background_music: 'lofi',
          music_volume: 0.20,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
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
          title: 'OpenAI Just Admitted The Timeline Is Collapsing Faster ⚠️',
          hook: 'DON\'T SWIPE AWAY: YOUR JOB IN 2026 🤯',
          caption: 'Software engineering is changing at the core level. In 3 years, programming will be natural language orchestration.',
          hashtags: '#Coding #SoftwareEngineer #AIRevolution #MachineLearning #WebDev #Shorts #Viral',
          start_time: 18.0,
          end_time: 48.0,
          duration: 30.0,
          virality_score: 98,
          hook_rate: 97,
          retention_score: 95,
          rewatch_score: 93,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'blur_stack',
          caption_style: 'beast',
          background_music: 'phonk',
          music_volume: 0.25,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "Once", "start": 0.0, "end": 0.3},
            {"word": "a", "start": 0.3, "end": 0.4},
            {"word": "model", "start": 0.4, "end": 0.8},
            {"word": "learns", "start": 0.8, "end": 1.2},
            {"word": "how", "start": 1.2, "end": 1.4},
            {"word": "to", "start": 1.4, "end": 1.6},
            {"word": "code", "start": 1.6, "end": 2.0},
            {"word": "better", "start": 2.0, "end": 2.4},
            {"word": "models,", "start": 2.4, "end": 3.0},
            {"word": "the", "start": 3.2, "end": 3.4},
            {"word": "entire", "start": 3.4, "end": 3.8},
            {"word": "timeline", "start": 3.8, "end": 4.3},
            {"word": "collapses.", "start": 4.3, "end": 5.0}
          ]
        },
        {
          id: 'clip_ai_003',
          project_id: 'proj_ai_future',
          title: 'Stop Learning Traditional Coding Today! ❌ (Do This Instead)',
          hook: 'NOBODY WILL CODE LIKE THIS NEXT YEAR 💻',
          caption: 'If you are still writing raw syntax by hand, you are falling behind. Focus on prompt architecture and agent workflows.',
          hashtags: '#TechCareer #ProgrammingTips #FutureOfWork #DevCommunity #ReelsTech',
          start_time: 50.0,
          end_time: 65.0,
          duration: 15.0,
          virality_score: 97,
          hook_rate: 98,
          retention_score: 96,
          rewatch_score: 94,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'cyber',
          background_music: 'ambient',
          music_volume: 0.20,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "If", "start": 0.0, "end": 0.2},
            {"word": "you", "start": 0.2, "end": 0.4},
            {"word": "are", "start": 0.4, "end": 0.6},
            {"word": "still", "start": 0.6, "end": 0.9},
            {"word": "writing", "start": 0.9, "end": 1.3},
            {"word": "syntax", "start": 1.3, "end": 1.7},
            {"word": "by", "start": 1.7, "end": 1.9},
            {"word": "hand,", "start": 1.9, "end": 2.3},
            {"word": "you", "start": 2.4, "end": 2.6},
            {"word": "are", "start": 2.6, "end": 2.8},
            {"word": "falling", "start": 2.8, "end": 3.2},
            {"word": "behind.", "start": 3.2, "end": 3.8}
          ]
        },
        {
          id: 'clip_ai_004',
          project_id: 'proj_ai_future',
          title: 'Sam Altman Revealed The Uncensored Reality of Superintelligence 🔥',
          hook: 'THEY TRIED TO HIDE THIS INTERVIEW CLIP 🤫',
          caption: 'When the first superintelligent system goes live, all current market valuations will change in minutes.',
          hashtags: '#OpenAI #SamAltman #ArtificialIntelligence #ViralPodcast #ShortsFeed',
          start_time: 70.0,
          end_time: 115.0,
          duration: 45.0,
          virality_score: 96,
          hook_rate: 97,
          retention_score: 94,
          rewatch_score: 92,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'hormozi',
          background_music: 'phonk',
          music_volume: 0.25,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "When", "start": 0.0, "end": 0.3},
            {"word": "superintelligence", "start": 0.3, "end": 1.2},
            {"word": "arrives,", "start": 1.2, "end": 1.8},
            {"word": "the", "start": 2.0, "end": 2.2},
            {"word": "economic", "start": 2.2, "end": 2.7},
            {"word": "rules", "start": 2.7, "end": 3.1},
            {"word": "will", "start": 3.1, "end": 3.3},
            {"word": "change", "start": 3.3, "end": 3.8},
            {"word": "forever.", "start": 3.8, "end": 4.5}
          ]
        },
        {
          id: 'clip_ai_005',
          project_id: 'proj_ai_future',
          title: 'The #1 Mistake 99% Of Creators Make in The First 3 Seconds 🚨',
          hook: 'THIS SINGLE MISTAKE RUINS YOUR RETENTION ⚠️',
          caption: 'Stop introducing yourself! Start immediately in the middle of high tension or curious action.',
          hashtags: '#CreatorTips #RetentionHacks #ShortsViral #ReelsGrowth #ContentStrategy',
          start_time: 120.0,
          end_time: 150.0,
          duration: 30.0,
          virality_score: 95,
          hook_rate: 96,
          retention_score: 94,
          rewatch_score: 93,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'beast',
          background_music: 'lofi',
          music_volume: 0.20,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "Fix", "start": 0.0, "end": 0.3},
            {"word": "the", "start": 0.3, "end": 0.5},
            {"word": "first", "start": 0.5, "end": 0.8},
            {"word": "three", "start": 0.8, "end": 1.1},
            {"word": "seconds", "start": 1.1, "end": 1.6},
            {"word": "and", "start": 1.6, "end": 1.8},
            {"word": "the", "start": 1.8, "end": 2.0},
            {"word": "algorithm", "start": 2.0, "end": 2.6},
            {"word": "rewards", "start": 2.6, "end": 3.0},
            {"word": "you.", "start": 3.0, "end": 3.5}
          ]
        },
        {
          id: 'clip_ai_006',
          project_id: 'proj_ai_future',
          title: 'His Jaw Dropped When Lex Asked The Dark Ethics Question 😱',
          hook: 'LOOK AT HIS EYES RIGHT HERE... 💀',
          caption: 'There was an intense silence in the room before this answer. Watch until the final sentence!',
          hashtags: '#DeepConversation #PodcastHighlights #ViralMoments #Chills #TrendingNow',
          start_time: 155.0,
          end_time: 170.0,
          duration: 15.0,
          virality_score: 94,
          hook_rate: 96,
          retention_score: 92,
          rewatch_score: 91,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'clean',
          background_music: 'ambient',
          music_volume: 0.15,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "There", "start": 0.0, "end": 0.2},
            {"word": "was", "start": 0.2, "end": 0.4},
            {"word": "an", "start": 0.4, "end": 0.6},
            {"word": "absolute", "start": 0.6, "end": 1.1},
            {"word": "silence", "start": 1.1, "end": 1.6},
            {"word": "in", "start": 1.6, "end": 1.8},
            {"word": "the", "start": 1.8, "end": 2.0},
            {"word": "studio.", "start": 2.0, "end": 2.6}
          ]
        },
        {
          id: 'clip_ai_007',
          project_id: 'proj_ai_future',
          title: 'The Step-By-Step Blueprint to Explode on YouTube Shorts 📈',
          hook: 'COPY THIS 3-STEP VIRAL FORMULA 🚀',
          caption: 'Save this post! 1) Curiosity gap hook, 2) Fast visual dynamic cut, 3) Seamless loop conclusion.',
          hashtags: '#ShortsFormula #GrowthHacks #ViralClips #CreatorEconomy #AlgorithmSecrets',
          start_time: 180.0,
          end_time: 240.0,
          duration: 60.0,
          virality_score: 93,
          hook_rate: 95,
          retention_score: 93,
          rewatch_score: 92,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'hormozi',
          background_music: 'lofi',
          music_volume: 0.20,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "Step", "start": 0.0, "end": 0.3},
            {"word": "one", "start": 0.3, "end": 0.6},
            {"word": "is", "start": 0.6, "end": 0.8},
            {"word": "the", "start": 0.8, "end": 1.0},
            {"word": "hook.", "start": 1.0, "end": 1.4},
            {"word": "Step", "start": 1.8, "end": 2.1},
            {"word": "two", "start": 2.1, "end": 2.4},
            {"word": "is", "start": 2.4, "end": 2.6},
            {"word": "pacing.", "start": 2.6, "end": 3.1}
          ]
        },
        {
          id: 'clip_ai_008',
          project_id: 'proj_ai_future',
          title: 'Why Clean Energy Will Be Worth More Than Gold in 2027 ⚡',
          hook: 'THIS ASSET WILL DOMINATE THE WORLD 💰',
          caption: 'Whoever owns the gigawatts of clean power and GPU compute clusters controls global wealth.',
          hashtags: '#Energy #Compute #TechTrends #Investing #FutureEconomy #Shorts',
          start_time: 250.0,
          end_time: 280.0,
          duration: 30.0,
          virality_score: 92,
          hook_rate: 94,
          retention_score: 91,
          rewatch_score: 90,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'cyber',
          background_music: 'phonk',
          music_volume: 0.25,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "Energy", "start": 0.0, "end": 0.4},
            {"word": "and", "start": 0.4, "end": 0.6},
            {"word": "compute", "start": 0.6, "end": 1.1},
            {"word": "are", "start": 1.1, "end": 1.3},
            {"word": "the", "start": 1.3, "end": 1.5},
            {"word": "new", "start": 1.5, "end": 1.8},
            {"word": "global", "start": 1.8, "end": 2.3},
            {"word": "currency.", "start": 2.3, "end": 3.0}
          ]
        },
        {
          id: 'clip_ai_009',
          project_id: 'proj_ai_future',
          title: 'The Most Powerful Motivational Speech of The Year 💪',
          hook: 'LISTEN TO THIS BEFORE YOU SLEEP TONIGHT 🌙',
          caption: 'Nobody is coming to do the hard work for you. Build relentless self-discipline and watch everything shift.',
          hashtags: '#Motivation #Discipline #Mindset #HardWork #Grindset #ReelsDaily',
          start_time: 290.0,
          end_time: 305.0,
          duration: 15.0,
          virality_score: 91,
          hook_rate: 93,
          retention_score: 90,
          rewatch_score: 91,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'hormozi',
          background_music: 'ambient',
          music_volume: 0.20,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "Your", "start": 0.0, "end": 0.2},
            {"word": "future", "start": 0.2, "end": 0.6},
            {"word": "self", "start": 0.6, "end": 0.9},
            {"word": "is", "start": 0.9, "end": 1.1},
            {"word": "counting", "start": 1.1, "end": 1.6},
            {"word": "on", "start": 1.6, "end": 1.8},
            {"word": "you", "start": 1.8, "end": 2.0},
            {"word": "today.", "start": 2.0, "end": 2.5}
          ]
        },
        {
          id: 'clip_ai_010',
          project_id: 'proj_ai_future',
          title: 'The Unexpected Twist That Broke The Entire Internet 😂',
          hook: 'I WAS NOT READY FOR THAT PUNCHLINE 🤣',
          caption: 'Wait till the last 4 seconds! The chat was completely howling in laughter. Share this with a friend!',
          hashtags: '#ComedyReels #FunnyMoments #EpicTwist #PodcastHumor #ViralLaughs',
          start_time: 310.0,
          end_time: 355.0,
          duration: 45.0,
          virality_score: 90,
          hook_rate: 92,
          retention_score: 89,
          rewatch_score: 91,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'gta',
          background_music: 'lofi',
          music_volume: 0.20,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "Nobody", "start": 0.0, "end": 0.4},
            {"word": "in", "start": 0.4, "end": 0.6},
            {"word": "the", "start": 0.6, "end": 0.8},
            {"word": "room", "start": 0.8, "end": 1.1},
            {"word": "expected", "start": 1.1, "end": 1.6},
            {"word": "that", "start": 1.6, "end": 1.8},
            {"word": "answer!", "start": 1.8, "end": 2.4}
          ]
        }
      ]
    },
    {
      id: 'proj_hindi_tech',
      title: '₹1,00,000 Mystery Tech Box Unboxing (Hindi)',
      source_type: 'youtube',
      source_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      video_path: 'data/samples/demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      duration: 1420.0,
      clips_count: 8,
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
          end_time: 16.0,
          duration: 15.0,
          virality_score: 98,
          hook_rate: 99,
          retention_score: 97,
          rewatch_score: 95,
          language: 'hi',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'cyber',
          background_music: 'upbeat',
          music_volume: 0.30,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
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
        },
        {
          id: 'clip_hi_002',
          project_id: 'proj_hindi_tech',
          title: 'ये 3 सीक्रेट फीचर्स देख कर होश उड़ जाएंगे ⚡',
          hook: '99% लोग ये ट्रिक नहीं जानते! 💡',
          caption: 'अगर आपके पास स्मार्टफोन है तो ये सेटिंग तुरंत ऑन कर लीजिए!',
          hashtags: '#AndroidTricks #PhoneHacks #HindiTech #TechShorts',
          start_time: 20.0,
          end_time: 50.0,
          duration: 30.0,
          virality_score: 96,
          hook_rate: 97,
          retention_score: 94,
          rewatch_score: 92,
          language: 'hi',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'hormozi',
          background_music: 'phonk',
          music_volume: 0.25,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
          transcript: [
            {"word": "अगर", "start": 0.0, "end": 0.2},
            {"word": "आप", "start": 0.2, "end": 0.4},
            {"word": "भी", "start": 0.4, "end": 0.6},
            {"word": "यह", "start": 0.6, "end": 0.8},
            {"word": "गलती", "start": 0.8, "end": 1.2},
            {"word": "कर", "start": 1.2, "end": 1.4},
            {"word": "रहे", "start": 1.4, "end": 1.6},
            {"word": "हैं", "start": 1.6, "end": 1.8},
            {"word": "तो", "start": 1.8, "end": 2.0},
            {"word": "रुकिए!", "start": 2.0, "end": 2.5}
          ]
        }
      ]
    },
    {
      id: 'proj_bengali_tech',
      title: '২০২৬ সালে সেরা ৩টি প্রোগ্রামিং ল্যাঙ্গুয়েজ (Bengali)',
      source_type: 'youtube',
      source_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
      video_path: 'data/samples/demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      duration: 1890.0,
      clips_count: 8,
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
          end_time: 15.5,
          duration: 15.0,
          virality_score: 97,
          hook_rate: 98,
          retention_score: 96,
          rewatch_score: 93,
          language: 'bn',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'hormozi',
          background_music: 'ambient',
          music_volume: 0.20,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
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
      video_path: 'data/samples/demo.mp4',
      thumbnail_url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80',
      duration: 5200.0,
      clips_count: 8,
      created_at: '2026-11-21 09:00:00',
      clips: [
        {
          id: 'clip_live_001',
          project_id: 'proj_live_drone',
          title: 'Insane 200KM/H Drone Crash Reaction 🏁💥',
          hook: 'YOU WON\'T BELIEVE THIS DRONE SURVIVED 😱',
          caption: 'Full throttle gap through the burning ring! Incredible pilot reflexes caught on live stream broadcast.',
          hashtags: '#FPV #DroneRacing #ExtremeSports #LiveMoments #GamingReels #ViralClips #4K',
          start_time: 3.0,
          end_time: 22.0,
          duration: 19.0,
          virality_score: 99,
          hook_rate: 99,
          retention_score: 97,
          rewatch_score: 95,
          language: 'en',
          aspect_ratio: '9:16',
          layout_preset: 'smart_center',
          caption_style: 'gta',
          background_music: 'phonk',
          music_volume: 0.35,
          intro_enabled: 1,
          outro_enabled: 1,
          video_url: 'data/samples/demo.mp4',
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

  function getProjects() {
    try {
      const stored = localStorage.getItem('cf_projects_v2');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem('cf_projects_v2', JSON.stringify(SEED_PROJECTS));
    return SEED_PROJECTS;
  }

  function saveProjects(projects) {
    localStorage.setItem('cf_projects_v2', JSON.stringify(projects));
  }

  const originalFetch = window.fetch;

  window.fetch = async function (url, options = {}) {
    const urlStr = typeof url === 'string' ? url : (url.url || '');

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

    function mockJson(data, status = 200) {
      return Promise.resolve(new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // Dashboard Stats
    if (urlStr === '/api/dashboard/stats') {
      const projs = getProjects();
      let totalClips = 0;
      projs.forEach(p => { totalClips += (p.clips ? p.clips.length : 10); });
      return mockJson({
        total_projects: 48,
        total_clips: Math.max(186, totalClips),
        storage_used_gb: 3.4,
        storage_limit_gb: 10.0,
        storage_percent: 34,
        viral_reach_potential: '2.8M+',
        recent_projects: projs,
        active_jobs: []
      });
    }

    if (urlStr === '/api/health') {
      return mockJson({ status: 'healthy', uptime: Date.now(), version: '2.5', workers: 4, gpu_4k: true });
    }

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

    if (urlStr === '/api/auth/forgot-password') {
      return mockJson({ success: true, message: `Password reset link sent to ${body.email || 'your email'}.` });
    }

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

    if (urlStr === '/api/projects' && method === 'POST') {
      const projs = getProjects();
      const newP = {
        id: 'proj_' + Date.now(),
        title: body.title || 'Untitled Project',
        source_type: body.source_type || 'upload',
        source_url: body.source_url || '',
        video_path: body.video_path || 'data/samples/demo.mp4',
        thumbnail_url: body.thumbnail_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
        duration: body.duration || 1800.0,
        clips_count: 10,
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
        clips: SEED_PROJECTS[0].clips
      };
      projs.unshift(newP);
      saveProjects(projs);
      return mockJson(newP);
    }

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

    if (urlStr.startsWith('/api/projects/') && method === 'DELETE') {
      const pId = urlStr.replace('/api/projects/', '');
      let projs = getProjects();
      projs = projs.filter(x => x.id !== pId);
      saveProjects(projs);
      return mockJson({ success: true, message: 'Project deleted' });
    }

    if (urlStr === '/api/import/youtube') {
      const url = body.url || '';
      let videoId = 'L_Guz73e6fw';
      if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
      else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
      else if (url.includes('live/')) videoId = url.split('live/')[1].split('?')[0];

      return mockJson({
        video_id: videoId,
        url: url,
        title: body.title || 'YouTube 4K Broadcast (' + videoId + ')',
        channel: 'Top Notch Featured Creator',
        thumbnail_url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        fallback_thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        duration: 1820.0,
        duration_formatted: '30:20',
        authorized: true,
        quality: '4K Ultra HD (60fps)'
      });
    }

    // AI Automatic Clip Generator: Returns 10 High Retention Moments
    if (urlStr === '/api/generate-clips') {
      const projs = getProjects();
      const p = projs.find(x => x.id === body.project_id) || projs[0];
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

    if (urlStr.startsWith('/api/clips/') && method === 'PUT') {
      return mockJson({ success: true, message: 'Clip saved in 4K resolution' });
    }

    // Export Endpoint
    if (urlStr === '/api/export') {
      return mockJson({
        success: true,
        download_url: 'data/samples/demo.mp4',
        preset: body.preset || 'youtube_shorts',
        resolution: body.resolution || '4k',
        quality_label: '4K Ultra HD (2160x3840 @ 60 FPS, High Bitrate)',
        bitrate_mbps: 35.0
      });
    }

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

    if (urlStr === '/api/admin/users') {
      return mockJson([
        { id: 'usr_admin', full_name: 'Alex Forge (Admin)', email: 'admin@clipforge.ai', plan: 'agency', clips_used: 142, clips_limit: 500, storage_used_mb: 4280, storage_limit_mb: 51200, status: 'active' },
        { id: 'usr_002', full_name: 'Sarah Jenkins', email: 'creator@clipforge.ai', plan: 'pro', clips_used: 46, clips_limit: 100, storage_used_mb: 3420, storage_limit_mb: 10240, status: 'active' },
        { id: 'usr_003', full_name: 'Rohit Tech', email: 'rohit.tech@gmail.com', plan: 'free', clips_used: 8, clips_limit: 10, storage_used_mb: 850, storage_limit_mb: 2048, status: 'active' },
        { id: 'usr_004', full_name: 'Dev Gamer', email: 'gamer99@twitch.tv', plan: 'pro', clips_used: 89, clips_limit: 100, storage_used_mb: 8900, storage_limit_mb: 10240, status: 'active' }
      ]);
    }

    if (urlStr.includes('/api/admin/users/') && urlStr.endsWith('/action')) {
      return mockJson({ success: true, message: 'Action applied' });
    }

    if (urlStr === '/api/admin/logs') {
      return mockJson([
        { id: 'l1', timestamp: '2026-11-21 12:30:15', level: 'INFO', module: '4K Render Pipeline', message: 'NVENC 4K Ultra HD encoder initialized (3840x2160, 60 FPS, ProRes/H.265)', details: 'Bitrate: 35 Mbps' },
        { id: 'l2', timestamp: '2026-11-21 12:28:40', level: 'INFO', module: 'Cluster', message: '4 rendering worker threads active and listening', details: 'Vercel Serverless Ready' }
      ]);
    }

    if (urlStr === '/api/admin/settings') {
      return mockJson({ success: true, message: 'Settings saved' });
    }

    return mockJson({ success: true });
  };
})();
