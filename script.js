const videoInput = document.querySelector("#videoInput");
const websiteVideo = document.querySelector("#websiteVideo");
const laptopScreen = document.querySelector(".laptop-screen");
const appTiles = document.querySelectorAll(".app-tile");
const phonePanel = document.querySelector("#phonePanel");
const revealItems = document.querySelectorAll(".reveal");

const panelContent = {
  jobs: {
    label: "Recommended",
    title: "Part-time mentor",
    copy: "Flexible company role for experienced retirees."
  },
  trips: {
    label: "Next trip",
    title: "Cultural Bahrain tour",
    copy: "A relaxed group experience with easy registration."
  },
  clubs: {
    label: "Active club",
    title: "Gardening circle",
    copy: "Join a WhatsApp group built around shared interests."
  },
  health: {
    label: "Support",
    title: "Wellbeing check",
    copy: "Simple access to helpful health resources and updates."
  }
};

videoInput.addEventListener("change", (event) => {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const videoUrl = URL.createObjectURL(file);
  websiteVideo.src = videoUrl;
  websiteVideo.controls = true;
  websiteVideo.muted = false;
  laptopScreen.classList.add("has-video");
  websiteVideo.play().catch(() => {
    websiteVideo.controls = true;
  });
});

appTiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const selected = panelContent[tile.dataset.panel];

    appTiles.forEach((item) => item.classList.remove("active"));
    tile.classList.add("active");

    phonePanel.innerHTML = `
      <p class="panel-label">${selected.label}</p>
      <h3>${selected.title}</h3>
      <p>${selected.copy}</p>
    `;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));
