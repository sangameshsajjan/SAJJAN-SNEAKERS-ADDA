// Theme toggle JavaScript
// Handles light/dark theme switching and persistence

const themeToggle = document.getElementById("theme-toggle");
const themeStorageKey = "sneakerTheme";

// Apply the selected theme to the page
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);
  if (themeToggle) {
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggle.setAttribute("aria-pressed", isDark);
  }
}

// Load stored theme from localStorage
function loadStoredTheme() {
  return localStorage.getItem(themeStorageKey);
}

// Save theme to localStorage
function saveTheme(theme) {
  localStorage.setItem(themeStorageKey, theme);
}

// Initialize theme on page load
function initializeTheme() {
  const storedTheme = loadStoredTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = storedTheme || (prefersDark ? "dark" : "light");
  applyTheme(theme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("dark")
        ? "light"
        : "dark";
      saveTheme(nextTheme);
      applyTheme(nextTheme);
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeTheme);
