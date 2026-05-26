const currentYear = document.getElementById("currentYear");
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  if (navbar) {
    /* ← on vérifie que navbar existe avant */
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});
/* bouton dark mode */
const btnDark = document.createElement("button");
btnDark.id = "darkModeToggle";
btnDark.textContent = "🌙";
btnDark.title = "Activer le mode sombre";
btnDark.style.cssText = `
  background: none;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 1rem;
  color: white;
  margin-right: 10px;
  transition: all 0.3s ease;
`;

const btnRejoindre = document.querySelector(".navbar a.btn-primary");
if (btnRejoindre) {
  btnRejoindre.parentNode.insertBefore(btnDark, btnRejoindre);
} else {
  const navCollapse = document.getElementById("nav");
  if (navCollapse) navCollapse.appendChild(btnDark);
}

const darkModeToggle = document.getElementById("darkModeToggle");

const styleDark = document.createElement("style");
styleDark.id = "dark-mode-style";
styleDark.textContent = `
  body.dark-mode { background-color: #0f172a !important; color: #f1f5f9 !important; }
  body.dark-mode .btn-outline-dark { color: #f1f5f9 !important; border-color: #f1f5f9 !important; }
  body.dark-mode .btn-outline-dark:hover { background-color: #f1f5f9 !important; color: #0f172a !important; }
  body.dark-mode .filter-btn { color: #f1f5f9 !important; border-color: #f1f5f9 !important; }
  body.dark-mode #filters { background-color: #0f172a !important; }
  body.dark-mode section:not(#cta-section) { background-color: #0f172a !important; }
  body.dark-mode .bg-light { background-color: #1e293b !important; }
  body.dark-mode .bg-white { background-color: #1e293b !important; }
  body.dark-mode .card { background-color: #1e293b !important; border-color: #334155 !important; color: #f1f5f9 !important; }
  body.dark-mode h1, body.dark-mode h2, body.dark-mode h3,
  body.dark-mode h4, body.dark-mode h5 { color: #f1f5f9 !important; }
  body.dark-mode p { color: #cbd5e1 !important; }
  body.dark-mode .text-muted { color: #94a3b8 !important; }
  body.dark-mode .text-primary { color: #60a5fa !important; }
  body.dark-mode .accordion-item { background-color: #1e293b !important; border-color: #334155 !important; }
  body.dark-mode .accordion-button { background-color: #1e293b !important; color: #f1f5f9 !important; }
  body.dark-mode .accordion-button::after { filter: invert(1); }
  body.dark-mode .accordion-body { background-color: #1e293b !important; color: #cbd5e1 !important; }
  body.dark-mode .form-control, body.dark-mode .form-select { background-color: #1e293b !important; border-color: #334155 !important; color: #f1f5f9 !important; }
  body.dark-mode aside { background-color: #1e293b !important; }
  body.dark-mode .list-unstyled li { color: #cbd5e1 !important; }
  body.dark-mode #faq { background-color: #0f172a !important; }
`;
document.head.appendChild(styleDark);

function activerDarkMode() {
  document.body.classList.add("dark-mode");
  styleDark.disabled = false;
  if (darkModeToggle) darkModeToggle.textContent = "☀️";
}

function desactiverDarkMode() {
  document.body.classList.remove("dark-mode");
  styleDark.disabled = true;
  if (darkModeToggle) darkModeToggle.textContent = "🌙";
}

/* Au chargement vérifier localStorage */
try {
  if (localStorage.getItem("darkMode") === "true") {
    activerDarkMode();
  } else {
    styleDark.disabled = true;
  }
} catch (e) {
  styleDark.disabled = true;
}

/* Au clic */
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
      desactiverDarkMode();
      try {
        localStorage.setItem("darkMode", "false");
      } catch (e) {}
    } else {
      activerDarkMode();
      try {
        localStorage.setItem("darkMode", "true");
      } catch (e) {}
    }
  });
}
/*  FIX MENU HAMBURGER*/

const navbarToggler = document.querySelector(".navbar-toggler");
const navMenu = document.getElementById("nav");

if (navbarToggler && navMenu) {
  navbarToggler.addEventListener("click", function () {
    const isOpen = navMenu.classList.contains("show");
    if (isOpen) {
      navMenu.classList.remove("show");
      navbarToggler.setAttribute("aria-expanded", "false");
    } else {
      navMenu.classList.add("show");
      navbarToggler.setAttribute("aria-expanded", "true");
    }
  });
}

/* BOUTON RETOUR EN HAUT */

const backToTop = document.createElement("button");
backToTop.id = "backToTop";
backToTop.setAttribute("aria-label", "Retour en haut de la page");
backToTop.textContent = "↑";
document.body.appendChild(backToTop);

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* COMPTEURS ANIMÉS AU SCROLL */
const counters = document.querySelectorAll(".counter");

/* Mettre tous les compteurs à 0 au chargement */
counters.forEach(function (counter) {
  counter.textContent = "0";
});

function animerCompteur(counter) {
  counter.textContent = "0";
  const cible = parseInt(counter.getAttribute("data-target"));
  const duree = 2000;
  const increment = cible / (duree / 16);
  let valeurActuelle = 0;

  if (counter.timer) clearInterval(counter.timer);

  counter.timer = setInterval(function () {
    valeurActuelle += increment;
    if (valeurActuelle >= cible) {
      counter.textContent = "+" + cible.toLocaleString();
      clearInterval(counter.timer);
    } else {
      counter.textContent = "+" + Math.floor(valeurActuelle).toLocaleString();
    }
  }, 16);
}

const observerCompteur = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animerCompteur(entry.target);
      } else {
        if (entry.target.timer) clearInterval(entry.target.timer);
        entry.target.textContent = "0";
      }
    });
  },
  { threshold: 0.5 },
);

counters.forEach(function (counter) {
  observerCompteur.observe(counter);
});

/*  ANIMATIONS FADE-IN AU SCROLL */
const sections = document.querySelectorAll("section");

sections.forEach(function (section) {
  section.classList.add("fade-in");
});

const observerFadeIn = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observerFadeIn.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

sections.forEach(function (section) {
  observerFadeIn.observe(section);
});
