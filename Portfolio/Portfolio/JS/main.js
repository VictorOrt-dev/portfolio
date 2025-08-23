// Mobile Menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Smooth Scrolling and Active Link
const navLinksArray = document.querySelectorAll(".nav-link");

navLinksArray.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });

    // Close mobile menu
    navLinks.classList.remove("open");

    // Update active link
    navLinksArray.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Scroll Progress
const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  scrollProgress.style.width = scrollPercent + "%";
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

      // Update active nav link
      const sectionId = entry.target.id;
      navLinksArray.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
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
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".hero");
    const speed = 0.5;

    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
  });
});
