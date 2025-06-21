/**
 * Utility: Get element by ID safely
 * @param {string} id
 * @returns {HTMLElement|null}
 */
export const find_Element_Id = (id) => document.getElementById(id);

/**
 * Toggle visibility of a target element when the toggle element is clicked.
 * Automatically hides the target on outside click or scroll.
 *
 * @param {string} toggleId - The ID of the toggle element (e.g., button or icon).
 * @param {string} targetId - The ID of the element to show/hide.
 */
export const toggle = (toggleId, targetId) => {
  const toggleEl = find_Element_Id(toggleId);
  const targetEl = find_Element_Id(targetId);

  if (!toggleEl || !targetEl) {
    console.warn(`ERROR: Element(s) with ID '${toggleId}' or '${targetId}' not found.`);
    return;
  }

  const hideTarget = () => (targetEl.style.display = "none");
  const showTarget = () => (targetEl.style.display = "flex");

  // Toggle visibility on toggle click
  toggleEl.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = getComputedStyle(targetEl).display === "none";
    isHidden ? showTarget() : hideTarget();
  });

  // Hide if clicked outside
  document.addEventListener("click", (e) => {
    if (!toggleEl.contains(e.target) && !targetEl.contains(e.target)) {
      hideTarget();
    }
  });

  // Hide on scroll (with debounce)
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      hideTarget();
    }, 100);
  });
};

/**
 * Visually activate a target (e.g., rotate an icon) when toggle is used.
 * Useful for expanding arrows, dropdowns, etc.
 *
 * @param {string} toggleId - The clickable toggle element (e.g., button/icon).
 * @param {string} targetId - The element to apply the action to (e.g., an arrow).
 * @param {string} visibilityCheckId - The element to check for visibility (e.g., dropdown).
 * @param {string} action - The action to apply (currently supports "rotate").
 */
export const do_Active_Action = (toggleId, targetId, visibilityCheckId, action = "rotate") => {
  const toggleEl = find_Element_Id(toggleId);
  const targetEl = find_Element_Id(targetId);
  const checkEl = find_Element_Id(visibilityCheckId);

  if (!toggleEl || !targetEl || !checkEl) {
    console.warn(`ERROR: One or more elements not found: '${toggleId}', '${targetId}', '${visibilityCheckId}'`);
    return;
  }

  toggleEl.addEventListener("click", () => {
    setTimeout(() => {
      const isVisible = getComputedStyle(checkEl).display !== "none";
      if (action === "rotate") {
        targetEl.style.transform = isVisible ? "rotate(90deg)" : "rotate(0deg)";
        targetEl.style.transition = "transform 0.3s ease";
      }
    }, 10);
  });

  // Reset on outside click
  document.addEventListener("click", (e) => {
    if (!toggleEl.contains(e.target) && !checkEl.contains(e.target)) {
      targetEl.style.transform = "rotate(0deg)";
    }
  });

  // Reset on scroll
  window.addEventListener("scroll", () => {
    targetEl.style.transform = "rotate(0deg)";
  });
};
