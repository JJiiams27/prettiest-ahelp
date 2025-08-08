// Shared dark mode toggle logic
(function() {
  function applyDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    document.documentElement.classList.toggle('dark-mode', isDark);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;
    var iconMoon = document.getElementById('icon-moon');
    var iconSun = document.getElementById('icon-sun');
    var isDark = false;
    try {
      isDark = localStorage.getItem('darkMode') === 'true';
    } catch (e) {}
    applyDarkMode(isDark);
    if (iconMoon && iconSun) {
      iconMoon.classList.toggle('hidden', isDark);
      iconSun.classList.toggle('hidden', !isDark);
    }
    toggle.addEventListener('click', function () {
      isDark = !document.documentElement.classList.contains('dark-mode');
      applyDarkMode(isDark);
      try {
        localStorage.setItem('darkMode', isDark);
      } catch (e) {}
      if (iconMoon && iconSun) {
        iconMoon.classList.toggle('hidden', isDark);
        iconSun.classList.toggle('hidden', !isDark);
      }
    });
  });
})();
