// Mobile Menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const navLinksArray = document.querySelectorAll(".nav-link");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  mobileMenuBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

// Smooth Scrolling and Active Link
navLinksArray.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });

    // Close mobile menu et reset icône
    navLinks.classList.remove("open");
    mobileMenuBtn.textContent = "☰";

    // Update active link
    navLinksArray.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Fermer le menu mobile si on clique ailleurs
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav") && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
    mobileMenuBtn.textContent = "☰";
  }
});

// Scroll Progress avec débouncing
let scrollTimeout;
const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
    
    scrollProgress.style.width = scrollPercent + "%";
  }, 10);
});

// Scroll Animations
const sections = document.querySelectorAll(".section");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "-50px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      const sectionId = entry.target.id;
      if (sectionId) {
        navLinksArray.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    }
  });
}, observerOptions);

sections.forEach((section) => {
  try {
    observer.observe(section);
  } catch (error) {
    console.warn("Erreur observer pour section:", section.id);
  }
});

// Project Filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Update active filter
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter projects 
    projectCards.forEach((card, index) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0) scale(1)";
        }, index * 50);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px) scale(0.95)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Parallax hero 
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const speed = 0.3;
    
    // Appliquer seulement sur desktop ET éviter les problèmes iOS
    if (window.innerWidth > 768 && !navigator.userAgent.includes('iPhone')) {
      const heroContent = document.querySelector(".hero-content");
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * speed}px)`;
      }
    }
  });
});