const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const year = document.getElementById("year");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const revealEls = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".count");

if (year) year.textContent = new Date().getFullYear();

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => menu.classList.remove("open"));
  });
}

if (form && formMessage) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formMessage.textContent = "Thank you! Your inquiry has been submitted.";
    form.reset();
  });
}

let counted = false;
const animateCount = () => {
  counters.forEach((el) => {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 70));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = `${target}${suffix}`;
        clearInterval(timer);
      } else {
        el.textContent = `${current}${suffix}`;
      }
    }, 20);
  });
};

const onScroll = () => {
  revealEls.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add("show");
    }
  });

  const stats = document.querySelector(".stats");
  if (!counted && stats && stats.getBoundingClientRect().top < window.innerHeight * 0.9) {
    animateCount();
    counted = true;
  }
};

window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);
