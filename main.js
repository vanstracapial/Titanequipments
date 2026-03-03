/**
 * TITAN EQUIPMENT - Main JavaScript
 * RED & BLACK INDUSTRIAL THEME
 */

document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initCounterAnimation();
  initProductGallery();
  initTabs();
  initCategoryFilter();
  initStickyQuoteButton();
  initSmoothScroll();
  initFinancingCalculator();
});

function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
}

function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMobile = document.querySelector('.nav-mobile');
  const overlay = document.querySelector('.overlay');
  const navLinks = document.querySelectorAll('.nav-mobile .nav-link');

  if (!menuToggle || !navMobile) return;

  function openMenu() {
    menuToggle.classList.add('active');
    navMobile.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    navMobile.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', function() {
    if (navMobile.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  navLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });

  animatedElements.forEach(function(element) {
    observer.observe(element);
  });
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = function() {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function(counter) {
    observer.observe(counter);
  });
}

function initProductGallery() {
  const galleryThumbs = document.querySelectorAll('.gallery-thumb');
  const galleryMain = document.querySelector('.gallery-main img');

  if (!galleryMain || galleryThumbs.length === 0) return;

  galleryThumbs.forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      galleryMain.src = imgSrc;

      galleryThumbs.forEach(function(t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (tabBtns.length === 0) return;

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');

      tabBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      tabContents.forEach(function(c) {
        c.classList.remove('active');
      });

      this.classList.add('active');
      const targetTab = document.getElementById(tabId);
      if (targetTab) {
        targetTab.classList.add('active');
      }
    });
  });
}

/**
 * CATEGORY FILTER - Filter products by category
 */
function initCategoryFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card[data-category]');

  if (filterTabs.length === 0 || productCards.length === 0) return;

  filterTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      const category = this.getAttribute('data-filter');

      // Update active tab
      filterTabs.forEach(function(t) {
        t.classList.remove('active');
      });
      this.classList.add('active');

      // Filter products
      productCards.forEach(function(card) {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

function initStickyQuoteButton() {
  const stickyBtn = document.querySelector('.sticky-quote-btn');
  if (!stickyBtn) return;

  const hero = document.querySelector('.hero-intro') || document.querySelector('.page-header');
  if (!hero) return;

  window.addEventListener('scroll', function() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition > heroBottom - 100) {
      stickyBtn.classList.add('visible');
    } else {
      stickyBtn.classList.remove('visible');
    }
  });
}

function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initFinancingCalculator() {
  const equipmentPrice = document.getElementById('equipment-price');
  const downPayment = document.getElementById('down-payment');
  const interestRate = document.getElementById('interest-rate');
  const loanTerm = document.getElementById('loan-term');

  if (!equipmentPrice || !downPayment || !interestRate || !loanTerm) return;

  const resultEquipment = document.getElementById('result-equipment');
  const resultDown = document.getElementById('result-down');
  const resultAmount = document.getElementById('result-amount');
  const resultMonthly = document.getElementById('result-monthly');
  const resultTotal = document.getElementById('result-total');

  function calculate() {
    const price = parseFloat(equipmentPrice.value) || 0;
    const down = parseFloat(downPayment.value) || 0;
    const rate = parseFloat(interestRate.value) || 0;
    const term = parseInt(loanTerm.value) || 0;

    const loanAmount = price - down;
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;

    let monthlyPayment = 0;
    let totalPayment = 0;

    if (loanAmount > 0 && rate > 0 && term > 0) {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                       (Math.pow(1 + monthlyRate, numPayments) - 1);
      totalPayment = monthlyPayment * numPayments + down;
    } else if (loanAmount > 0) {
      monthlyPayment = loanAmount / numPayments;
      totalPayment = price;
    }

    if (resultEquipment) resultEquipment.textContent = '$' + price.toLocaleString();
    if (resultDown) resultDown.textContent = '$' + down.toLocaleString();
    if (resultAmount) resultAmount.textContent = '$' + loanAmount.toLocaleString();
    if (resultMonthly) resultMonthly.textContent = '$' + Math.round(monthlyPayment).toLocaleString();
    if (resultTotal) resultTotal.textContent = '$' + Math.round(totalPayment).toLocaleString();
  }

  equipmentPrice.addEventListener('input', calculate);
  downPayment.addEventListener('input', calculate);
  interestRate.addEventListener('input', calculate);
  loanTerm.addEventListener('change', calculate);

  calculate();
}
