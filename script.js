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
