// --- Utility: safely get integer from element ---
const getCount = (el, defaultValue = 0) => {
  const val = parseInt(el?.innerText);
  return isNaN(val) ? defaultValue : val;
};

// --- Heart Button Functionality ---
const heartCountEl = document.getElementById("heart-count");
document.querySelectorAll(".btn-heart-click").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const current = getCount(heartCountEl);
    heartCountEl.innerText = current + 1;

    const icon = btn.querySelector("i");
    if (icon?.classList.contains("fa-regular")) {
      icon.classList.replace("fa-regular", "fa-solid");
    }
  });
});

// --- Copy Button Functionality ---
const copyCountEl = document.getElementById("copy-count");
document.querySelectorAll(".btn-copy-click").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const card = btn.closest(".card-body");
    const title = card?.querySelector(".card-title")?.innerText || "No Title";
    const hotline = card?.querySelector(".hotline-number")?.innerText || "";

    if (hotline) {
      navigator.clipboard.writeText(hotline);
      alert(`${title}\n${hotline}`);
    }

    const current = getCount(copyCountEl);
    copyCountEl.innerText = current + 1;
  });
});

// --- Call Button Functionality ---
const coinCountEl = document.getElementById("coin-count");
const callHistoryListEl = document.getElementById("history-list");

document.querySelectorAll(".btn-call-click").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const card = btn.closest(".card-body");
    const title = card?.querySelector(".card-title")?.innerText || "No Title";
    const hotline = card?.querySelector(".hotline-number")?.innerText || "";

    let coins = getCount(coinCountEl, 100);
    if (coins < 20) {
      alert("You need at least 20 coins to make a call.");
      return;
    }

    alert(`Calling...\n${title}\n${hotline}`);
    coinCountEl.innerText = coins - 20;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const li = document.createElement("li");
    li.className = "p-2 bg-gray-100 rounded";
    li.innerText = `${title}\n${hotline}\nCalled at ${time}`;
    callHistoryListEl.prepend(li);
  });
});

// --- Clear Call History ---
document.getElementById("clear-history-btn").addEventListener("click", () => {
  callHistoryListEl.innerHTML = "";
});
