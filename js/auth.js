/**
 * ClipForge AI - Authentication & User Profile Module
 */

window.AuthModule = (function () {
  'use strict';

  let isRegisterMode = false;

  function init() {
    bindEvents();
    checkStoredSession();
  }

  function bindEvents() {
    // Header Auth Button
    const btnHeaderAuth = document.getElementById('btnHeaderAuth');
    if (btnHeaderAuth) {
      btnHeaderAuth.addEventListener('click', () => {
        if (ClipForge.state.currentUser) {
          openProfileModal();
        } else {
          openAuthModal();
        }
      });
    }

    // Sidebar Profile Trigger
    const btnOpenProfile = document.getElementById('btnOpenProfile');
    if (btnOpenProfile) {
      btnOpenProfile.addEventListener('click', () => {
        openProfileModal();
      });
    }

    // Toggle between Login & Register modes
    const btnToggleAuthMode = document.getElementById('btnToggleAuthMode');
    if (btnToggleAuthMode) {
      btnToggleAuthMode.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMode();
      });
    }

    // Google Auth button
    const btnGoogleAuth = document.getElementById('btnGoogleAuth');
    if (btnGoogleAuth) {
      btnGoogleAuth.addEventListener('click', handleGoogleAuth);
    }

    // Forgot Password link
    const btnForgotPassword = document.getElementById('btnForgotPassword');
    if (btnForgotPassword) {
      btnForgotPassword.addEventListener('click', handleForgotPassword);
    }

    // Submit Auth Form
    const btnSubmitAuth = document.getElementById('btnSubmitAuth');
    if (btnSubmitAuth) {
      btnSubmitAuth.addEventListener('click', handleSubmitAuth);
    }

    // Sign out button
    const btnSignOut = document.getElementById('btnSignOut');
    if (btnSignOut) {
      btnSignOut.addEventListener('click', handleSignOut);
    }
  }

  function checkStoredSession() {
    const saved = localStorage.getItem('clipforge_user');
    if (saved) {
      try {
        const user = JSON.parse(saved);
        setUser(user);
        return;
      } catch (e) {
        localStorage.removeItem('clipforge_user');
      }
    }
    // Fetch default user
    fetchCurrentProfile();
  }

  async function fetchCurrentProfile() {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const user = await res.json();
        setUser(user);
      }
    } catch (e) {
      console.warn('Auth fetch fallback');
    }
  }

  function setUser(user) {
    ClipForge.state.currentUser = user;
    localStorage.setItem('clipforge_user', JSON.stringify(user));

    // Update UI elements
    const avatarEls = [
      document.getElementById('sidebarUserAvatar'),
      document.getElementById('modalProfileAvatar')
    ];
    avatarEls.forEach(el => {
      if (el && user.avatar) el.src = user.avatar;
    });

    const nameEls = [
      document.getElementById('sidebarUserName'),
      document.getElementById('modalProfileName')
    ];
    nameEls.forEach(el => {
      if (el && user.full_name) el.textContent = user.full_name;
    });

    const tierEls = [
      document.getElementById('sidebarUserTier'),
      document.getElementById('modalProfileTier')
    ];
    tierEls.forEach(el => {
      if (el) el.textContent = `${user.plan.toUpperCase()} ${user.role === 'admin' ? 'ADMIN' : 'CREATOR'}`;
    });

    const emailEl = document.getElementById('modalProfileEmail');
    if (emailEl) emailEl.textContent = user.email;

    const labelHeader = document.getElementById('headerAuthLabel');
    if (labelHeader) labelHeader.textContent = user.full_name.split(' ')[0];

    // Update Quota Widgets
    const usedGb = (user.storage_used_mb / 1024).toFixed(1);
    const limitGb = (user.storage_limit_mb / 1024).toFixed(0);
    const pct = Math.min(100, Math.round((user.storage_used_mb / user.storage_limit_mb) * 100)) || 34;

    const quotaText = `${usedGb} / ${limitGb} GB`;
    const quotaTexts = [
      document.getElementById('sidebarQuotaText'),
      document.getElementById('modalQuotaText')
    ];
    quotaTexts.forEach(el => { if (el) el.textContent = quotaText; });

    const quotaBars = [
      document.getElementById('sidebarQuotaBar'),
      document.getElementById('modalQuotaBar')
    ];
    quotaBars.forEach(el => { if (el) el.style.width = `${pct}%`; });
  }

  function toggleMode() {
    isRegisterMode = !isRegisterMode;
    const title = document.getElementById('authModalTitle');
    const groupName = document.getElementById('groupFullName');
    const toggleLink = document.getElementById('btnToggleAuthMode');
    const submitText = document.getElementById('btnSubmitAuthText');

    if (isRegisterMode) {
      if (title) title.textContent = 'Create ClipForge Account';
      if (groupName) groupName.style.display = 'block';
      if (toggleLink) toggleLink.textContent = 'Already have an account? Sign In';
      if (submitText) submitText.textContent = 'Get Started Free';
    } else {
      if (title) title.textContent = 'Sign in to ClipForge AI';
      if (groupName) groupName.style.display = 'none';
      if (toggleLink) toggleLink.textContent = 'Create Account';
      if (submitText) submitText.textContent = 'Sign In';
    }
  }

  async function handleSubmitAuth() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    const fullName = document.getElementById('authFullName') ? document.getElementById('authFullName').value.trim() : '';

    if (!email || !password) {
      ClipForge.showToast('Please fill in all required fields', 'error');
      return;
    }

    const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegisterMode ? { email, password, full_name: fullName } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setUser(data.user);
        ClipForge.closeModal('modalAuth');
        ClipForge.showToast(isRegisterMode ? 'Welcome to ClipForge AI! 🎉' : 'Signed in successfully! 👋', 'success');
      } else {
        ClipForge.showToast(data.message || 'Authentication failed', 'error');
      }
    } catch (e) {
      ClipForge.showToast('Connection error during auth', 'error');
    }
  }

  async function handleGoogleAuth() {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'google.creator@gmail.com',
          name: 'Google Creator',
          avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.user);
        ClipForge.closeModal('modalAuth');
        ClipForge.showToast('Signed in with Google! 🚀', 'success');
      }
    } catch (e) {
      ClipForge.showToast('Google Sign-In failed', 'error');
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value.trim();
    if (!email) {
      ClipForge.showToast('Please enter your email above to reset password', 'error');
      return;
    }

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      ClipForge.showToast(data.message, 'info');
    } catch (e) {
      ClipForge.showToast('Failed to trigger reset email', 'error');
    }
  }

  function handleSignOut() {
    localStorage.removeItem('clipforge_user');
    ClipForge.state.currentUser = null;
    ClipForge.closeModal('modalProfile');
    ClipForge.showToast('You have been signed out', 'info');
    document.getElementById('headerAuthLabel').textContent = 'Sign In';
    // Re-fetch default or open modal
    setTimeout(() => {
      openAuthModal();
    }, 600);
  }

  function openAuthModal() {
    ClipForge.openModal('modalAuth');
  }

  function openProfileModal() {
    ClipForge.openModal('modalProfile');
  }

  return {
    init,
    openAuthModal,
    openProfileModal,
    setUser
  };
})();
