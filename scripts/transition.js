document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const isExternalLink = (href, link) => {
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      return true;
    }
    if (link.target === "_blank") {
      return true;
    }
    try {
      const url = new URL(href, window.location.href);
      return url.origin !== window.location.origin;
    } catch {
      return false;
    }
  };

  // Fade in the current page.
  requestAnimationFrame(() => {
    body.classList.add("fade-in");
  });

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (isExternalLink(href, link)) {
      return;
    }

    link.addEventListener("click", (event) => {
      event.preventDefault();
      const destination = link.getAttribute("href");
      body.classList.remove("fade-in");
      body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = destination;
      }, 300);
    });
  });

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      body.classList.remove("fade-out");
      body.classList.add("fade-in");
    }
  });
});
