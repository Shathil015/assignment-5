// --- Heart click functionality to increase count ---
const heartCountEl = document.getElementById("heart-count");

/**
 * Increases heart count when a heart button is clicked
 * @param {HTMLElement} countEl - The element displaying the count
 * @param {string} buttonSelector - Selector for all heart buttons
 */
function increaseHeartCount(countEl, buttonSelector) {
  const heartButtons = document.querySelectorAll(buttonSelector);

  heartButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Get current count and increment
      let currentCount = parseInt(countEl.innerText) || 0;
      countEl.innerText = currentCount + 1;

      // Change icon style if it exists
      const icon = btn.querySelector("i");
      if (icon && icon.classList.contains("fa-regular")) {
        icon.classList.replace("fa-regular", "fa-solid");
      }
    });
  });
}

// Initialize the functionality
increaseHeartCount(heartCountEl, ".btn-heart-click");

// --- Copy button functionality to increase count and copy hotline ---
const copyCountEl = document.getElementById("copy-count");

/**
 * Initialize copy button functionality
 * @param {string} selector - CSS selector for copy buttons
 */
function setupCopyButtons(selector) {
  const buttons = document.querySelectorAll(selector);

  buttons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      const card = btn.closest(".card-body");
      if (!card) return;

      const title = card.querySelector(".card-title")?.innerText || "No Title";
      const hotline = card.querySelector(".hotline-number")?.innerText || "";

      if (!hotline) {
        alert("No hotline number found!");
        return;
      }

      try {
        await navigator.clipboard.writeText(hotline);
        alert(`Copied:\n${title}\n${hotline}`);
      } catch (err) {
        console.error("Failed to copy hotline:", err);
      }

      // Increment copy count
      const currentCount = parseInt(copyCountEl.innerText) || 0;
      copyCountEl.innerText = currentCount + 1;
    });
  });
}

// Initialize the copy buttons
setupCopyButtons(".btn-copy-click");

// 3. functionalities for click the call button

const coinCountEl = document.getElementById("coin-count");

const allCallButtons = document.querySelectorAll(".btn-call-click");

const callHistoryListEl = document.getElementById("history-list");

for (const btn of allCallButtons) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const card = btn.closest(".card-body");

    const title = card.querySelector(".card-title").innerText;

    const hotline = card.querySelector(".hotline-number").innerText;

    let current = parseInt(coinCountEl.innerText);
    if (isNaN(current)) current = 100;

    if (current < 20) {
      alert("You need at least 20 coins to make a call.");
      return;
    }

    alert("Calling...\n" + title + "\n" + hotline);

    coinCountEl.innerText = current - 20;

    const exactTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const li = document.createElement("li");

    li.classList.add("p-2", "bg-gray-100", "rounded");

    li.innerText = `${title}\n${hotline}\nCalled at ${exactTime}`;

    callHistoryListEl.prepend(li);
  });
}

const clearHistoryBtn = document.getElementById("clear-history-btn");

clearHistoryBtn.addEventListener("click", function () {
  callHistoryListEl.innerHTML = "";
});