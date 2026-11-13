/* -------------------------------------------------------------
   Dr. Hegazy Mogahed El-Tamimy Clinic - Core Application Script
   (WhatsApp-Only Direct Booking Engine)
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileNav();
  renderBranches();
  renderServices();
  renderVideos();
  initVideoFilters();
  initVideoModal();
  renderSymptoms();
  renderReviews();
  renderFaqs();
  initFloatingWhatsApp();
  initQuickBranchBtns();
});

/* ----------------- Theme Switcher ----------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('hegazy_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('hegazy_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle-btn i');
  if (icon) {
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }
}

/* ----------------- Sticky Header & Active Links ----------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ----------------- Mobile Navigation ----------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      const isOpen = navMenu.classList.contains('mobile-active');
      toggleBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }
}

/* ----------------- Render Branches ----------------- */
function renderBranches() {
  const container = document.getElementById('branches-container');
  if (!container || !CLINIC_DATA.branches) return;

  container.innerHTML = CLINIC_DATA.branches.map(branch => {
    const waText = encodeURIComponent(`السلام عليكم د. حجازي مجاهد، أود الاستفسار وحجز موعد كشف في ${branch.nameAr}.`);
    const waUrl = `https://wa.me/${branch.whatsappNumber}?text=${waText}`;

    return `
      <div class="branch-card ${branch.isMain ? 'featured-branch' : ''}" id="branch-${branch.id}">
        <div>
          <div class="branch-top-bar">
            <span class="branch-city-pill">
              <i class="fa-solid fa-location-dot"></i> ${branch.cityAr}
            </span>
            <span class="branch-status-active">
              <span class="pulse-dot"></span> حجز واتساب متاح
            </span>
          </div>

          <h3 class="branch-title">${branch.nameAr}</h3>

          <div class="branch-address-box">
            <i class="fa-solid fa-map-location-dot"></i>
            <div>${branch.addressAr}</div>
          </div>

          <div class="branch-hours-box">
            <i class="fa-regular fa-clock"></i>
            <div><strong>أوقات العيادة:</strong> ${branch.workingDaysAr}${branch.workingHoursAr ? ` (${branch.workingHoursAr})` : ''}</div>
          </div>

          <div class="branch-phones-list">
            ${branch.phoneLandline ? `
              <a href="tel:${branch.phoneLandline}" class="phone-item-btn" title="اتصال هاتفي">
                <span><i class="fa-solid fa-phone" style="color:var(--accent); margin-left:6px;"></i> الهاتف الأرضي</span>
                <span class="phone-num">${branch.phoneLandline}</span>
              </a>
            ` : ''}
            <a href="tel:${branch.phoneMobile}" class="phone-item-btn" title="اتصال بالموبايل">
              <span><i class="fa-solid fa-mobile-screen" style="color:var(--emerald); margin-left:6px;"></i> الموبايل / العيادة</span>
              <span class="phone-num">${branch.phoneMobile}</span>
            </a>
          </div>
        </div>

        <div class="branch-actions-row single-action">
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn-branch-whatsapp full-width">
            <i class="fa-brands fa-whatsapp"></i> حجز موعد مباشر عبر واتساب ${branch.cityAr}
          </a>
        </div>
      </div>
    `;
  }).join('');
}

/* ----------------- Render Medical Services ----------------- */
function renderServices() {
  const container = document.getElementById('services-container');
  if (!container || !CLINIC_DATA.services) return;

  container.innerHTML = CLINIC_DATA.services.map(service => {
    const waText = encodeURIComponent(`السلام عليكم د. حجازي مجاهد، أود حجز كشف واستشارة طبية بخصوص: ${service.titleAr}.`);
    const defaultBranch = CLINIC_DATA.branches[0];
    const waUrl = `https://wa.me/${defaultBranch.whatsappNumber}?text=${waText}`;

    return `
      <div class="service-card" id="service-${service.id}">
        <div class="service-icon-box">
          <i class="${service.icon}"></i>
        </div>
        <h3 class="service-title">${service.titleAr}</h3>
        <p class="service-desc">${service.descAr}</p>
        
        <ul class="service-features-list">
          ${service.features.map(f => `
            <li><i class="fa-solid fa-circle-check"></i> ${f}</li>
          `).join('')}
        </ul>

        <a href="${waUrl}" target="_blank" rel="noopener" class="service-book-btn">
          <span><i class="fa-brands fa-whatsapp" style="margin-left:6px; color:var(--whatsapp-green);"></i> حجز واتساب لهذه الحالة</span>
          <i class="fa-solid fa-arrow-left"></i>
        </a>
      </div>
    `;
  }).join('');
}

/* ----------------- Render Videos & In-Website Playback ----------------- */
let activeVideoFilter = "all";
let currentPlayingVideoId = "vid-reel-1";

function initVideoFilters() {
  const filterBtns = document.querySelectorAll('.video-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeVideoFilter = btn.getAttribute('data-filter');
      renderVideos();
    });
  });
}

function renderVideos() {
  const container = document.getElementById('videos-container');
  if (!container || !CLINIC_DATA.videos) return;

  const filtered = activeVideoFilter === "all" 
    ? CLINIC_DATA.videos 
    : CLINIC_DATA.videos.filter(v => v.category === activeVideoFilter);

  container.innerHTML = filtered.map(video => {
    const isPlaying = video.id === currentPlayingVideoId;
    return `
      <div class="video-card ${isPlaying ? 'playing-now' : ''}" id="card-${video.id}" onclick="playFeaturedVideo('${video.id}')">
        <div class="video-thumbnail-box">
          <img src="${video.poster || 'images/dr_hegazy.png?v=2'}" alt="${video.titleAr}" class="video-poster-img" />
          <span class="video-category-tag">${video.category}</span>
          <span class="video-duration-tag"><i class="fa-solid fa-play" style="font-size:0.65rem;"></i> ${video.duration}</span>
          <button class="play-btn-circle" title="تشغيل الفيديو داخل الموقع">
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
        <div class="video-content">
          <h4 class="video-title">${video.titleAr}</h4>
          <p class="video-summary">${video.summaryAr}</p>
          <div class="video-card-actions">
            <button class="btn-play-inline" onclick="event.stopPropagation(); playFeaturedVideo('${video.id}');">
              <i class="fa-solid fa-play"></i> تشغيل بالموقع
            </button>
            <a href="${video.fbUrl || 'https://www.facebook.com/share/19MRf1m76v/'}" target="_blank" rel="noopener" class="btn-fb-share-card" onclick="event.stopPropagation();">
              <i class="fa-brands fa-facebook"></i> صفحة الفيسبوك
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.playFeaturedVideo = function(videoId) {
  const video = CLINIC_DATA.videos.find(v => v.id === videoId);
  if (!video) return;

  currentPlayingVideoId = video.id;

  const wrap = document.querySelector('.featured-player-video-wrap');
  const titleElem = document.getElementById('featured-player-title');
  const descElem = document.getElementById('featured-player-desc');
  const badgeElem = document.getElementById('featured-player-badge');
  const fbBtn = document.getElementById('featured-player-fb');

  if (titleElem) titleElem.textContent = video.titleAr;
  if (descElem) descElem.textContent = video.summaryAr;
  if (badgeElem) badgeElem.innerHTML = `<i class="fa-solid fa-circle-play"></i> ${video.category}`;
  if (fbBtn) {
    if (video.type === 'youtube' && video.youtubeUrl) {
      fbBtn.href = video.youtubeUrl;
      fbBtn.innerHTML = '<i class="fa-brands fa-youtube" style="color:#ff0000; background:#fff; border-radius:50%; padding:2px;"></i> مشاهدة على قناة اليوتيوب';
    } else {
      fbBtn.href = video.fbUrl || 'https://www.facebook.com/share/19MRf1m76v/';
      fbBtn.innerHTML = '<i class="fa-brands fa-facebook"></i> شاهد على صفحة الفيسبوك';
    }
  }

  if (wrap) {
    if (video.type === 'youtube' && video.youtubeId) {
      wrap.innerHTML = `
        <iframe id="inline-featured-player-iframe" src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; aspect-ratio:16/9; border:none;"></iframe>
      `;
    } else {
      wrap.innerHTML = `
        <video id="inline-featured-player" controls playsinline autoplay preload="auto" poster="${video.poster || 'images/dr_hegazy.png?v=2'}" class="featured-video-elem">
          <source src="${video.src}" type="video/mp4">
          متصفحك لا يدعم تشغيل الفيديو.
        </video>
      `;
      const player = document.getElementById('inline-featured-player');
      if (player) {
        player.load();
        player.play().catch(e => console.log('Autoplay handled:', e));
      }
    }
  }

  // Highlight active card
  document.querySelectorAll('.video-card').forEach(card => {
    card.classList.remove('playing-now');
  });
  const activeCard = document.getElementById(`card-${video.id}`);
  if (activeCard) activeCard.classList.add('playing-now');

  // Smooth scroll
  const playerBox = document.getElementById('featured-video-box');
  if (playerBox) {
    playerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const closeBtn = document.getElementById('video-modal-close');
  const player = document.getElementById('site-video-player');

  if (closeBtn && modal && player) {
    closeBtn.addEventListener('click', closeVideoPlayerModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVideoPlayerModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeVideoPlayerModal();
      }
    });
  }
}

window.openVideoPlayerModal = function(videoId) {
  playFeaturedVideo(videoId);
};

window.openVideoPlayer = function(title, youtubeId) {
  // Fallback for any legacy calls
  if (CLINIC_DATA.videos && CLINIC_DATA.videos.length > 0) {
    playFeaturedVideo(CLINIC_DATA.videos[0].id);
  }
};

window.closeVideoPlayerModal = function() {
  const modal = document.getElementById('video-modal');
  const player = document.getElementById('site-video-player');

  if (player) {
    player.pause();
    player.currentTime = 0;
  }

  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
};

/* ----------------- Render Symptom Checker ----------------- */
let currentSelectedSymptom = "";

function renderSymptoms() {
  const buttonsContainer = document.getElementById('symptom-chips');
  if (!buttonsContainer || !CLINIC_DATA.symptoms) return;

  buttonsContainer.innerHTML = CLINIC_DATA.symptoms.map((item, idx) => `
    <button class="symptom-chip ${idx === 0 ? 'active' : ''}" onclick="selectSymptom(${idx})">
      <i class="fa-solid fa-stethoscope"></i> ${item.symptomAr}
    </button>
  `).join('');

  selectSymptom(0);
}

window.selectSymptom = function(index) {
  const data = CLINIC_DATA.symptoms[index];
  if (!data) return;

  currentSelectedSymptom = data.symptomAr;

  const chips = document.querySelectorAll('.symptom-chip');
  chips.forEach((c, idx) => {
    if (idx === index) c.classList.add('active');
    else c.classList.remove('active');
  });

  const resultTitle = document.getElementById('symptom-result-title');
  const resultDesc = document.getElementById('symptom-result-desc');
  const resultAdvice = document.getElementById('symptom-result-advice');
  const symptomWaBtn = document.getElementById('symptom-wa-btn');

  if (resultTitle) resultTitle.textContent = data.possibleCauseAr;
  if (resultDesc) resultDesc.textContent = data.symptomAr;
  if (resultAdvice) resultAdvice.innerHTML = `<strong>نصيحة أ.د. حجازي مجاهد:</strong> ${data.adviceAr}`;

  if (symptomWaBtn) {
    const waText = encodeURIComponent(`السلام عليكم د. حجازي مجاهد، أعاني من الأعراض التالية: (${data.symptomAr}) وأود حجز موعد كشف واستشارة.`);
    symptomWaBtn.href = `https://wa.me/${CLINIC_DATA.branches[0].whatsappNumber}?text=${waText}`;
  }
};

/* ----------------- Render Patient Reviews ----------------- */
function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container || !CLINIC_DATA.reviews) return;

  container.innerHTML = CLINIC_DATA.reviews.map(rev => `
    <div class="review-card">
      <div>
        <div class="review-stars">
          ${'<i class="fa-solid fa-star"></i>'.repeat(rev.rating)}
        </div>
        <p class="review-comment">"${rev.comment}"</p>
      </div>
      <div class="review-author">
        <span class="review-name">${rev.name}</span>
        <span class="review-branch">${rev.branch}</span>
      </div>
    </div>
  `).join('');
}

/* ----------------- Render FAQs ----------------- */
function renderFaqs() {
  const container = document.getElementById('faqs-container');
  if (!container || !CLINIC_DATA.faqs) return;

  container.innerHTML = CLINIC_DATA.faqs.map((faq, idx) => `
    <div class="faq-item ${idx === 0 ? 'open' : ''}">
      <button class="faq-question-btn" onclick="toggleFaq(this)">
        <span>${faq.qAr}</span>
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <div class="faq-answer" style="${idx === 0 ? 'max-height: 250px;' : ''}">
        <p>${faq.aAr}</p>
      </div>
    </div>
  `).join('');
}

window.toggleFaq = function(button) {
  const faqItem = button.parentElement;
  const answer = faqItem.querySelector('.faq-answer');
  const isOpen = faqItem.classList.contains('open');

  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('open');
    const ans = item.querySelector('.faq-answer');
    if (ans) ans.style.maxHeight = null;
  });

  if (!isOpen) {
    faqItem.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
  }
};

/* ----------------- Floating WhatsApp Multi-Branch Widget ----------------- */
function initFloatingWhatsApp() {
  const toggleBtn = document.getElementById('floating-wa-btn');
  const popup = document.getElementById('floating-wa-popup');
  const listContainer = document.getElementById('floating-wa-branches-list');

  if (listContainer && CLINIC_DATA.branches) {
    listContainer.innerHTML = CLINIC_DATA.branches.map(b => {
      const waText = encodeURIComponent(`السلام عليكم د. حجازي مجاهد، أود حجز كشف في ${b.nameAr}.`);
      return `
        <a href="https://wa.me/${b.whatsappNumber}?text=${waText}" target="_blank" rel="noopener" class="wa-branch-item">
          <span><i class="fa-solid fa-location-dot" style="color:var(--accent); margin-left:6px;"></i> ${b.nameAr}</span>
          <i class="fa-brands fa-whatsapp" style="color:var(--whatsapp-green); font-size:1.2rem;"></i>
        </a>
      `;
    }).join('');
  }

  if (toggleBtn && popup) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popup.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!popup.contains(e.target) && e.target !== toggleBtn) {
        popup.classList.remove('open');
      }
    });
  }
}

/* ----------------- Quick Branch Buttons (Hero Card) ----------------- */
function initQuickBranchBtns() {
  const container = document.getElementById('hero-branches-quick');
  if (!container || !CLINIC_DATA.branches) return;

  container.innerHTML = CLINIC_DATA.branches.map(b => {
    const waText = encodeURIComponent(`السلام عليكم د. حجازي مجاهد، أود حجز كشف في ${b.nameAr}.`);
    const waUrl = `https://wa.me/${b.whatsappNumber}?text=${waText}`;

    return `
      <a href="${waUrl}" target="_blank" rel="noopener" class="quick-branch-btn">
        <span><i class="fa-solid fa-hospital" style="color:var(--accent); margin-left:6px;"></i> ${b.nameAr}</span>
        <span class="badge"><i class="fa-brands fa-whatsapp"></i> حجز واتساب</span>
      </a>
    `;
  }).join('');
}

window.openWhatsAppPopup = function() {
  const popup = document.getElementById('floating-wa-popup');
  if (popup) {
    popup.classList.add('open');
    popup.scrollIntoView({ behavior: 'smooth', block: 'end' });
  } else {
    window.open(`https://wa.me/${CLINIC_DATA.branches[0].whatsappNumber}`, '_blank');
  }
};

window.openVideoPlayer = function(title, youtubeId) {
  if (youtubeId) {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  } else {
    window.open(CLINIC_DATA.socialLinks.youtube, '_blank');
  }
};
