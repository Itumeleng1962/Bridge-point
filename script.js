const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const scrollTopBtn = document.querySelector(".scroll-top");
const parallaxLayers = document.querySelectorAll("[data-depth]");
const dropdownParents = document.querySelectorAll(".has-dropdown");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

const closeDropdowns = () => {
  dropdownParents.forEach((parent) => {
    parent.classList.remove("open");
    const toggle = parent.querySelector(".dropdown-toggle");
    toggle?.setAttribute("aria-expanded", "false");
  });
};

dropdownToggles.forEach((toggle) => {
  toggle.setAttribute("aria-expanded", toggle.getAttribute("aria-expanded") || "false");
  const parent = toggle.closest(".has-dropdown");
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = parent?.classList.contains("open");
    closeDropdowns();
    if (!isOpen && parent) {
      parent.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".has-dropdown")) {
    closeDropdowns();
  }
});

if (navToggle && mainNav) {
  const toggleNav = () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    if (!isOpen) {
      closeDropdowns();
    }
  };

  navToggle.addEventListener("click", toggleNav);

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

const updateHeaderState = () => {
  const scrolled = window.scrollY > 40;
  header?.classList.toggle("scrolled", scrolled);

  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  }
};

const updateParallax = () => {
  const offset = window.scrollY;
  parallaxLayers.forEach((layer) => {
    const depth = parseFloat(layer.dataset.depth || "0");
    layer.style.transform = `translate3d(0, ${offset * depth * 0.3}px, 0)`;
  });
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateHeaderState();
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

updateHeaderState();
updateParallax();

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const observerTargets = document.querySelectorAll(".reveal, .slide-up");
if (observerTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  observerTargets.forEach((target) => revealObserver.observe(target));
}

const rippleButtons = document.querySelectorAll(".btn-ripple, .btn");
rippleButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    if (this.disabled) return;
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const counters = document.querySelectorAll("[data-count]");
if (counters.length) {
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = `${value}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    window.requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

const accordions = document.querySelectorAll("[data-accordion]");
accordions.forEach((panel) => {
  const toggleButton = panel.querySelector(".panel-toggle");
  const panelBody = panel.querySelector(".panel-body");
  const headerEl = panel.querySelector(".panel-header");

  if (!panelBody || !headerEl) return;

  const setMaxHeight = (isOpen) => {
    panelBody.style.maxHeight = isOpen ? `${panelBody.scrollHeight}px` : "0px";
  };

  const togglePanel = () => {
    const isOpen = panel.classList.toggle("open");
    setMaxHeight(isOpen);
    toggleButton?.setAttribute("aria-expanded", String(isOpen));
  };

  headerEl.addEventListener("click", (event) => {
    if (event.target.closest("a") || event.target.closest("button") === toggleButton) return;
    togglePanel();
  });

  toggleButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    togglePanel();
  });

  setMaxHeight(false);
  toggleButton?.setAttribute("aria-expanded", "false");
});

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const contactForm = document.getElementById("contact-form");
const messageModal = document.getElementById("message-modal");

const openModal = () => {
  messageModal?.classList.add("open");
  messageModal?.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
  messageModal?.classList.remove("open");
  messageModal?.setAttribute("aria-hidden", "true");
};

if (messageModal) {
  messageModal.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  messageModal.addEventListener("click", (event) => {
    if (event.target === messageModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && messageModal.classList.contains("open")) {
      closeModal();
    }
  });
}

if (contactForm) {
  const fields = contactForm.querySelectorAll("input, textarea");

  const setError = (field, message) => {
    const wrapper = field.closest(".form-field");
    if (!wrapper) return;
    wrapper.classList.add("invalid");
    let error = wrapper.querySelector(".error-message");
    if (!error) {
      error = document.createElement("small");
      error.className = "error-message";
      wrapper.appendChild(error);
    }
    error.textContent = message;
  };

  const clearError = (field) => {
    const wrapper = field.closest(".form-field");
    if (!wrapper) return;
    wrapper.classList.remove("invalid");
    const error = wrapper.querySelector(".error-message");
    if (error) error.textContent = "";
  };

  const validateField = (field) => {
    const value = field.value.trim();
    if (field.hasAttribute("required") && !value) {
      setError(field, "This field is required.");
      return false;
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError(field, "Please enter a valid email address.");
        return false;
      }
    }

    clearError(field);
    return true;
  };

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    contactForm.reset();
    fields.forEach(clearError);
    openModal();
  });
}




