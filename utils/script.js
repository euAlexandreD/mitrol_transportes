const boxes = document.querySelectorAll(".frota");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

boxes.forEach((frota) => {
  observer.observe(frota);
});

const contatato = document.querySelectorAll(".form_contato");
const observar = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.3,
  },
);

contatato.forEach((form) => observar.observe(form));

const iframe = document.querySelectorAll(".div_iframe");
const observarIframe = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.3,
  },
);

iframe.forEach((iframe) => observarIframe.observe(iframe));

// Adicione isso no seu arquivo JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.createElement("button");
  hamburgerBtn.className = "hamburger-btn";
  hamburgerBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

  const menuMobile = document.createElement("div");
  menuMobile.className = "menu-mobile";

  const overlay = document.createElement("div");
  overlay.className = "menu-overlay";

  // Copia os links do menu original
  const originalLinks = document.querySelectorAll(".div_links a");
  originalLinks.forEach((link) => {
    const newLink = document.createElement("a");
    newLink.href = link.href;
    newLink.textContent = link.textContent;
    menuMobile.appendChild(newLink);
  });

  // Adiciona os elementos ao body
  document.body.appendChild(hamburgerBtn);
  document.body.appendChild(menuMobile);
  document.body.appendChild(overlay);

  // Funcionalidade de abrir/fechar
  hamburgerBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    menuMobile.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = menuMobile.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Fecha ao clicar no overlay
  overlay.addEventListener("click", function () {
    hamburgerBtn.classList.remove("active");
    menuMobile.classList.remove("active");
    this.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Fecha ao clicar em um link
  menuMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburgerBtn.classList.remove("active");
      menuMobile.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});

const counter = document.querySelector(".contador_viagens");

window.addEventListener("load", function () {
  function increment(i, max) {
    if (i > max) return;
    setTimeout(function () {
      counter.innerText = i;
      increment(i + 1, max);
    }, 10);
  }

  increment(0, 12000);
});
