const menuToggle = document.querySelector(".menu-toggle");
const siteHeader = menuToggle?.closest(".site-header");
const siteNavigation = siteHeader?.querySelector("#site-navigation");

if (menuToggle && siteHeader && siteNavigation) {
  const closeMenu = () => {
    siteHeader.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Åbn menu");
  };

  const currentPath = window.location.pathname.replace(/\/$/, "/index.html");
  siteNavigation.querySelectorAll("a").forEach((link) => {
    const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/$/, "/index.html");
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }

    link.addEventListener("click", closeMenu);
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    siteHeader.classList.toggle("menu-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Åbn menu" : "Luk menu");
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}
