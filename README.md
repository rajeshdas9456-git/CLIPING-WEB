# ClipForge AI ⚡
### AI-Powered YouTube to Shorts & Reels Generator

**ClipForge AI** is a modern, professional, fully responsive AI video clipping SaaS platform inspired by OpusClip, Vizard AI, CapCut, and VEED.io. It turns long-form YouTube videos, live stream broadcasts, and uploaded video files into viral, captioned 9:16 Shorts and Reels in seconds.

---

## 🌟 Key Features

### 1. Modern SaaS UI/UX Design
- **Dark Premium Aesthetic**: Black and charcoal background (`#08090D`, `#0E1118`, `#141824`) with electric purple (`#8B5CF6`) and cyber blue (`#3B82F6`) neon gradient accents.
- **Glassmorphism**: Backdrop blur cards with gradient borders.
- **Responsive Navigation**: Full desktop sidebar and mobile responsive navigation drawer.
- **Live Notifications**: Toast notifications and real-time pipeline status banner.

### 2. Comprehensive Dashboard
- **Key Metrics**: Total videos processed, clips generated, storage usage meter (3.4 GB / 10 GB), estimated viral reach (1.4M+ views).
- **Quick Create & New Project**: Instant modal and tab shortcuts.
- **Recent Projects Grid**: Project cards with hover preview, clip counts, source tags, and studio launch buttons.

### 3. Video Import System (Three Import Options + Samples)
- **A. YouTube URL**: Paste any YouTube link (`youtube.com/watch?v=...`, `youtu.be/...`, `youtube.com/shorts/...`). Instant regex validation, metadata fetch, author, duration, and thumbnail preview.
- **B. YouTube Live Stream**: Import supported completed live-stream recordings or VOD broadcasts. Live status indicators and legal copyright notices.
- **C. Upload Video**: Drag-and-drop zone supporting `.mp4`, `.mov`, `.webm` up to 2GB. Live progress bar and instant in-browser video playback via HTML5 blob URLs.
- **D. Ready-to-Test Creator Samples**: 4 pre-analyzed videos (AI Podcast, Hindi Mystery Box Unboxing, Bengali Coding Guide, Live Drone Racing) for instant testing.

### 4. AI Automatic Clip Generator (Core Engine)
- **Automatic Moment Detection**: AI scans audio energy spikes, sentence sentiment, and keywords across 7 styles:
  - 🎯 Viral Hooks & High Energy
  - 😂 Funny Moments & Reactions
  - 🧠 Educational & Actionable Info
  - 🔥 Motivational Speeches
  - 💬 Important Conversations
  - 📖 Engaging Storytelling Moments
- **Duration Presets**: 15s (Flash Hook), 30s (TikTok/Reels optimal), 45s, 60s, or Custom duration.
- **Viral Output per Clip**:
  - Exact start and end timestamps.
  - **AI Virality Score** (e.g. 98/100) with **Hook Rate**, **Retention Rate**, and **Re-Watchability** breakdown.
  - AI-generated viral title.
  - Social media caption with emojis.
  - Trending hashtags (`#Shorts #Reels #Viral`).
  - **Opening Hook Header Suggestion** (e.g. *"WAIT UNTIL YOU HEAR THIS 🤯"*).

### 5. AI Video Editor Studio
- **Dynamic Aspect Ratio Switcher**:
  - `9:16` Vertical (YouTube Shorts, Instagram Reels, TikTok)
  - `16:9` Landscape (Standard YouTube video)
  - `1:1` Square (Instagram / LinkedIn feed)
- **Framing & Crop Modes**: Smart center focus, blurred backdrop fill, split-screen (facecam + gameplay).
- **Interactive Timeline Scrubber**:
  - Draggable start trim handle & end trim handle.
  - Playhead scrubber with real-time timecode synchronization.
  - Audio waveform track visualization.
  - Play/pause, forward/rewind 5s, loop range toggle.
- **Real-Time Word-by-Word Subtitles**:
  - Karaoke-style word highlighting synchronized to video time.
  - 5 Style Presets: **Hormozi** (yellow glow), **Beast Impact** (red/white bold), **Cyber Neon** (cyan), **GTA Pill**, and **Minimal Clean**.
  - Font family, size, color picker, and vertical offset slider.
- **Background Music Mixer**:
  - Built-in royalty-free tracks: Lofi Chill, Viral Phonk, Ambient Tech, None.
  - Web Audio API synthesizer engine & volume slider.
  - Automatic audio ducking toggle.
- **Custom Branding**: Top viral hook header banner toggle and "Follow for Part 2" outro badge.

### 6. AI Captions & Subtitles Engine
- **Multi-Language Support**:
  - **English** (Word-timed)
  - **हिन्दी (Hindi / Hinglish)** (Devanagari & Latin script)
  - **বাংলা (Bengali)** (Bangla script)
- **Inline Word Editor**: Click any word to edit spelling or adjust timestamps.
- **SRT & VTT Export**: Instant client-side download of subtitle files.

### 7. Social Media Export Center
- **Export Presets**: YouTube Shorts, Instagram Reels, Facebook Reels, Standard YouTube.
- **Quality Options**: 720p HD, 1080p Full HD, 4K Ultra HD.
- **Download**: Individual clip download or batch package download.
- **Social Media Ready Kit**: 1-click copy of Viral Title, Caption, Hashtags, and optimal posting times.

### 8. Project Management
- Persistent SQLite database (`clipforge.db`).
- Actions: Save, rename, duplicate, delete projects, and re-edit old clips.
- Search and filter by source type.

### 9. User Authentication & Profiles
- Email & password login and registration.
- 1-click Google OAuth simulation.
- Forgot password flow.
- User profile modal with subscription tier (Free, Pro, Agency), storage quota bar, and logout.

### 10. Admin Dashboard (`/#admin`)
- **Platform Analytics**: Total users (14,822), processed videos (84,294), rendered shorts (312,456), MRR ($48,650).
- **Cluster Gauges**: GPU load (42%), CPU load (28%), RAM usage (14.2 / 32 GB), queue status.
- **User Management Table**: Filter users, upgrade plan tiers (Free -> Pro -> Agency), toggle account suspension, reset quotas.
- **AI Model Settings**: Select Speech-to-Text models (Faster-Whisper large-v3) and LLM Hook engines (Gemini 1.5 Pro, Claude 3.5 Sonnet, local Llama 3.2).
- **Real-Time Engine Logs**: Live server event stream with log level filtering.

---

## 🚀 How to Run ClipForge AI

### Option A: One-Click Windows Batch (Recommended)
Double-click:
```bash
start.bat
```
This launches the ClipForge AI server and automatically opens `http://localhost:8080` in your default browser.

### Option B: Command Line (Python 3.10+)
```bash
python server.py
```
Or with the auto-browser launcher:
```bash
python run.py
```
Open **`http://localhost:8080`** in your browser.

---

## 📂 Project Architecture

```
cliping web/
├── server.py              # Core Python 3 HTTP REST API & SQLite Server
├── run.py                 # Cross-platform runner with auto-browser launch
├── start.bat              # One-click Windows launch batch script
├── README.md              # Project documentation & guide
├── data/
│   ├── clipforge.db       # SQLite database (Users, Projects, Clips, Logs)
│   ├── samples/           # Sample video assets (demo.mp4)
│   └── uploads/           # Uploaded video storage
└── static/
    ├── index.html         # Main Single Page Application interface
    ├── css/
    │   ├── style.css      # SaaS Dark theme, glassmorphism, responsive grid
    │   └── editor.css     # Studio canvas, 9:16 layout, timeline & subtitle styling
    └── js/
        ├── app.js         # Core state controller, router, toasts, search
        ├── auth.js        # User auth, Google OAuth, profile, storage quotas
        ├── dashboard.js   # Metrics, recent projects, pipeline status
        ├── importer.js    # YouTube URL, Live Stream, file upload, sample picker
        ├── generator.js   # AI moment detector, virality scorer, hook engine
        ├── editor.js      # Video player, aspect ratio, trim handles, audio mixer
        ├── subtitles.js   # Multi-language word captions (EN/HI/BN), SRT/VTT download
        ├── export.js      # Social presets (Shorts, Reels, 4K), social copy kit
        └── admin.js       # SaaS Admin Panel: analytics, queue, user management
```

---

## 🔑 Default Credentials

- **Admin Account**: `admin@clipforge.ai` / `admin123` (Access to Superadmin Dashboard)
- **Creator Account**: `creator@clipforge.ai` / `creator123` (Pro Creator Plan)
- **Google 1-Click Login**: Instant one-click simulated sign-in.
