function initNavbar() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    document.querySelectorAll("#navLinks a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }
}

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");

  if (!themeToggle) return;

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initThemeToggle();
});

// ============================
// NAVBAR STYLE ON SCROLL
// ============================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  if (window.scrollY > 25) {
    nav.style.transform = "translateY(-2px)";
  } else {
    nav.style.transform = "translateY(0)";
  }
});


// ============================
// SCROLL REVEAL ANIMATION
// ============================
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 80) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ============================
// TYPING EFFECT (ONLY IF EXISTS)
// ============================
const typingElement = document.getElementById("typing");

if (typingElement) {
  const roles = [
    "IT Security Professional",
    "SOC Analyst (Monitoring & Detection)",
    "SIEM Log Analyst",
    "Endpoint Protection Specialist",
    "WAF & Network Security Monitoring"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 70;
  const deleteSpeed = 40;
  const pauseTime = 1200;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex++);
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex--);
    }

    if (!isDeleting && charIndex === currentRole.length + 1) {
      isDeleting = true;
      setTimeout(typeEffect, pauseTime);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? deleteSpeed : typingSpeed);
  }

  typeEffect();
}

// ============================
// COPY MESSAGE (SAFE VERSION)
// ============================
function copyMessage(id) {
  const textArea = document.getElementById(id);
  if (!textArea) return;

  textArea.select();
  textArea.setSelectionRange(0, 99999);

  try {
    document.execCommand("copy");
    alert("Message copied successfully!");
  } catch (err) {
    alert("Copy failed. Please copy manually.");
  }

  window.getSelection().removeAllRanges();
}

// ============================
// RECRUITER NAME AUTO REPLACE
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const recruiterInput = document.getElementById("recruiterName");
  const templates = document.querySelectorAll(".template-box");

  if (!recruiterInput || templates.length === 0) return;

  // Save original text once
  templates.forEach((textarea) => {
    textarea.dataset.original = textarea.value;
  });

  recruiterInput.addEventListener("input", () => {
    const name = recruiterInput.value.trim() || "[Recruiter Name]";

    templates.forEach((textarea) => {
      const originalText = textarea.dataset.original;

      textarea.value = originalText
        .replaceAll("[Recruiter Name]", name)
        .replaceAll("[Nama Recruiter]", name);
    });
  });
});