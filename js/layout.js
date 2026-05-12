async function loadPartial(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    const res = await fetch(file);

    if (!res.ok) {
      console.error(`Error loading ${file}:`, res.status);
      return;
    }

    const data = await res.text();
    element.innerHTML = data;
  } catch (err) {
    console.error("Failed to load:", file, err);
  }
}

function setActiveNav() {
  const currentPage =
    window.location.pathname.split("/").pop().replace(".html", "") || "index";

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active-link");

    if (link.dataset.page === currentPage) {
      link.classList.add("active-link");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPartial("navbar-placeholder", "partials/navbar.html");
  await loadPartial("footer-placeholder", "partials/footer.html");

  setActiveNav();
  // init navbar + theme after navbar loaded
  if (typeof initNavbar === "function") initNavbar();
  if (typeof initThemeToggle === "function") initThemeToggle();

  // FORCE REVEAL CHECK AGAIN AFTER LOADING PARTIALS
  window.dispatchEvent(new Event("scroll"));
});

