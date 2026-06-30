const THEME_KEY = "portfolio-theme";

const body = document.body;
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === "dark") {
  body.classList.add("dark");
}

document.querySelectorAll("#themeToggle").forEach((button) => {
  button.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem(THEME_KEY, body.classList.contains("dark") ? "dark" : "light");
  });
});

const copyEmailButton = document.querySelector("#copyEmail");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      showToast(`이메일이 복사되었습니다: ${email}`);
    } catch {
      showToast(email);
    }
  });
}

const searchInput = document.querySelector("#activitySearch");
const filterButtons = document.querySelectorAll(".filter-chip");
const activityCards = document.querySelectorAll(".activity-card");

let selectedFilter = "all";

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateActivities();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", updateActivities);
}

function updateActivities() {
  const searchTerm = (searchInput?.value || "").trim().toLowerCase();

  activityCards.forEach((card) => {
    const matchesFilter = selectedFilter === "all" || card.dataset.category === selectedFilter;
    const searchableText = `${card.textContent} ${card.dataset.keywords}`.toLowerCase();
    const matchesSearch = searchableText.includes(searchTerm);
    card.hidden = !(matchesFilter && matchesSearch);
  });
}

function showToast(message) {
  const oldToast = document.querySelector(".toast");

  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  document.body.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 2400);
}
