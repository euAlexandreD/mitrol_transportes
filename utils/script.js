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
