"use strict";

/*
 * NAVIGATION
 * Neue Links einfach als weitere Objekte in NAV_LINKS eintragen.
 */

const NAV_LINKS = [
  {
    label: "Startseite",
    href: "./index.html",
    pages: ["index.html"]
  },
  {
    label: "Dokumentation",
    href: "./docs.html",
    pages: ["docs.html"]
  },
  {
    label: "Impressum",
    href: "./impressum.html",
    pages: ["impressum.html"]
  },
  {
    label: "Datenschutz",
    href: "./datenschutz.html",
    pages: ["datenschutz.html"]
  }

  // Weitere Links hier ergänzen:
  // {
  //   label: "Neue Seite",
  //   href: "./neue-seite.html",
  //   pages: ["neue-seite.html"]
  // }
];

(() => {
  const header = document.getElementById("site-header");
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  if (header) {
    const navigationItems = NAV_LINKS.map((item) => {
      const isActive = item.pages.includes(currentPage);

      return `
        <li>
          <a
            href="${item.href}"
            class="menu-link${isActive ? " is-active" : ""}"
            ${isActive ? 'aria-current="page"' : ""}
          >
            <span>${item.label}</span>
            <span class="menu-link-arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      `;
    }).join("");

    header.innerHTML = `
      <div class="container nav-wrap">
        <a class="brand" href="./index.html" aria-label="POS Count Startseite">
          <span class="mini-logo" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </span>

          <span class="brand-text">
            POS<span class="brand-highlight">COUNT</span>
          </span>
        </a>

        <div class="navigation-actions">
          <span class="nav-status">
            <span></span>
            SYSTEM ONLINE
          </span>

          <button
            type="button"
            class="menu-toggle"
            id="menu-toggle"
            aria-label="Menü öffnen"
            aria-controls="site-menu"
            aria-expanded="false"
          >
            <span class="hamburger-lines" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        <nav
          id="site-menu"
          class="menu-popover"
          aria-label="Hauptnavigation"
          hidden
        >
          <div class="menu-header">
            <span>MENÜ</span>
            <span class="menu-header-dot"></span>
          </div>

          <ul class="menu-list">
            ${navigationItems}
          </ul>

          <div class="menu-footer">
            POS COUNT <span>·</span> NAVIGATION
          </div>
        </nav>
      </div>
    `;

    const toggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("site-menu");

    const closeMenu = () => {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
    };

    const openMenu = () => {
      menu.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Menü schließen");
    };

    toggle.addEventListener("click", () => {
      if (menu.hidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !menu.hidden) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
