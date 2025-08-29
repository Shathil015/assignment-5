// --- Utility function to safely get element text as number ---
function getNumber(el, defaultValue = 0) {
  const num = parseInt(el?.innerText);
  return isNaN(num) ? defaultValue : num;
}

// --- Heart Click Functionality ---
function setupHeartButtons(countEl, buttonSelector) {
  document.querySelectorAll(buttonSelector).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = getNumber(countEl, 0);
      countEl.innerText = current + 1;

      const icon = btn.querySelector("i");
      if (icon?.classList.contains("fa-regular")) {
        icon.classList.replace("fa-regular", "fa-solid");
      }
    });
  });
}

// --- Copy Button Functionality ---
function setupCopyButtons(countEl, buttonSelector) {
  document.querySelectorAll(buttonSelector).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const card = btn.closest(".card-body");
      const title = card?.querySelector(".card-title")?.innerText || "No Title";
      const hotline = card?.querySelector(".hotline-number")?.innerText || "";

      if (hotline) {
        navigator.clipboard.writeText(hotline);
        alert(`${title}\n${hotline}`);
      }

      const current = getNumber(countEl, 0);
      countEl.innerText = current + 1;
    });
  });
}

// --- Call Button Functionality ---
function setupCallButtons(coinEl, buttonSelector, historyEl) {
  document.querySelectorAll(buttonSelector).forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const card = btn.closest(".card-body");
      const title = card?.querySelector(".card-title")?.innerText || "No Title";
      const hotline = card?.querySelector(".hotline-number")?.innerText || "";

      let coins = getNumber(coinEl, 100);
      if (coins < 20) {
        alert("You need at least 20 coins to make a call.");
        return;
      }

      alert(`Calling...\n${title}\n${hotline}`);
      coinEl.innerText = coins - 20;

      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const li = document.createElement("li");
      li.className = "p-2 bg-gray-100 rounded";
      li.innerText = `${title}\n${hotline}\nCalled at ${time}`;
      historyEl.prepend(li);
    });
  });
}

// --- Clear History Functionality ---
function setupClearHistory(buttonEl, historyEl) {
  buttonEl.addEventListener("click", () => {
    historyEl.innerHTML = "";
  });
}

// --- Initialize All ---
document.addEventListener("DOMContentLoaded", () => {
  const heartCountEl = document.getElementById("heart-count");
  const copyCountEl = document.getElementById("copy-count");
  const coinCountEl = document.getElementById("coin-count");
  const historyEl = document.getElementById("history-list");
  const clearHistoryBtn = document.getElementById("clear-history-btn");

  setupHeartButtons(heartCountEl, ".btn-heart-click");
  setupCopyButtons(copyCountEl, ".btn-copy-click");
  setupCallButtons(coinCountEl, ".btn-call-click", historyEl);
  setupClearHistory(clearHistoryBtn, historyEl);
});
