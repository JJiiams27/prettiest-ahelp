// Main site-wide JavaScript
// Handles mobile navigation toggling, back-to-top behaviour, and dark mode persistence

document.addEventListener('DOMContentLoaded', () => {
  // Dark mode persistence
  let isDark = false;
  try {
    isDark = localStorage.getItem('darkMode') === 'true';
  } catch (e) {}
  if (isDark) {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
  }
  if (window.userData) {
    window.userData.darkMode = isDark;
  }
  toggleIcons(isDark);

  // Dark mode toggle handler
  const darkToggle = document.getElementById('dark-mode-toggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      const nowDark = !document.body.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode', nowDark);
      document.documentElement.classList.toggle('dark-mode', nowDark);
      try { localStorage.setItem('darkMode', nowDark); } catch (e) {}
      if (window.userData) { window.userData.darkMode = nowDark; }
      toggleIcons(nowDark);
      if (typeof showEnhancedNotification === 'function') {
        showEnhancedNotification(nowDark ? 'Dark mode activated!' : 'Light mode activated!', 'info');
      }
    });
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-btn') ||
                  document.getElementById('mobile-btn') ||
                  document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Back to top button
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        backBtn.classList.remove('hidden');
      } else {
        backBtn.classList.add('hidden');
      }
    });
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

function toggleIcons(isDark) {
  const iconMoon = document.getElementById('icon-moon');
  const iconSun = document.getElementById('icon-sun');
  if (iconMoon && iconSun) {
    if (isDark) {
      iconMoon.classList.add('hidden');
      iconSun.classList.remove('hidden');
    } else {
      iconMoon.classList.remove('hidden');
      iconSun.classList.add('hidden');
    }
  }
}
