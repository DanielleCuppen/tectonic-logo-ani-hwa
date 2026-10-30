const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

const SETTLE_DELAY_MS = 100;

/**
 * @param {HTMLElement} stage
 */
function runIntro(stage) {
  if (prefersReducedMotion.matches) {
    stage.dataset.settled = "true";
    return;
  }

  stage.dataset.settled = "false";

  requestAnimationFrame(() => {
    window.setTimeout(() => {
      stage.dataset.settled = "true";
    }, SETTLE_DELAY_MS);
  });
}

/**
 * @param {HTMLElement} card
 */
function replayCard(card) {
  const stage = card.querySelector(".logo-stage");
  if (!stage) return;

  stage.dataset.settled = "true";
  void stage.offsetWidth;
  runIntro(stage);
}

function init() {
  document.querySelectorAll(".demo-card").forEach((card) => {
    const stage = card.querySelector(".logo-stage");
    if (stage) runIntro(stage);

    const btn = card.querySelector(".demo-replay");
    btn?.addEventListener("click", () => replayCard(card));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
