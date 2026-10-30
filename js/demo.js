/**
 * Standalone demo — zelfde intro-logica als hwadejong-2026 header (md+, reduced-motion).
 * Eén Alpine-component; Afspelen via document-click (werkt altijd, geen @click nodig).
 */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const transboxIntroMediaQuery = window.matchMedia("(min-width: 768px)");

/** Eerste load variant 1 — sync met header hwadejong-2026 */
const SCATTER_HOLD_MS = 100;
/** Afspelen: langer “open” (bij load zie je impliciet meer frames vóór settle) */
const SCATTER_HOLD_REPLAY_MS = 450;
/** Na settle: plate-transform (≤950ms + delays) + plate-fade (1,05s + 350ms) */
const PLAYING_CLEAR_MS = 1500;

document.documentElement.classList.toggle(
  "reduced-motion",
  prefersReducedMotion.matches,
);

const syncReducedMotionClass = (event) => {
  document.documentElement.classList.toggle("reduced-motion", event.matches);
};

if (typeof prefersReducedMotion.addEventListener === "function") {
  prefersReducedMotion.addEventListener("change", syncReducedMotionClass);
} else if (typeof prefersReducedMotion.addListener === "function") {
  prefersReducedMotion.addListener(syncReducedMotionClass);
}

/** @param {HTMLElement} root article.demo-card */
function getLogoStage(root) {
  return root.querySelector(".logo-tectonic-stage");
}

function syncStageSettled(stage, settled) {
  if (!stage) return;
  stage.classList.toggle("is-settled", Boolean(settled));
}

function forceReflow(stage) {
  if (stage) void stage.offsetWidth;
}

/**
 * @param {{ $el: HTMLElement, settled: boolean }} component
 * @param {{ scatterHoldMs?: number }} [options]
 */
function runTectonicIntro(component, options = {}) {
  const scatterHoldMs = options.scatterHoldMs ?? SCATTER_HOLD_MS;

  if (prefersReducedMotion.matches || !transboxIntroMediaQuery.matches) {
    component.settled = true;
    syncStageSettled(getLogoStage(component.$el), true);
    return;
  }

  const stage = getLogoStage(component.$el);
  stage?.removeAttribute("data-idle");
  stage?.classList.add("is-playing");
  component.settled = false;
  syncStageSettled(stage, false);
  forceReflow(stage);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      forceReflow(stage);
      window.setTimeout(() => {
        component.settled = true;
        syncStageSettled(stage, true);
        forceReflow(stage);
        window.setTimeout(() => {
          stage?.classList.remove("is-playing");
        }, PLAYING_CLEAR_MS);
      }, scatterHoldMs);
    });
  });
}

function resetStageBeforeReplay(component) {
  const stage = getLogoStage(component.$el);
  stage?.classList.remove("is-playing");
  component.settled = true;
  syncStageSettled(stage, true);
  stage?.setAttribute("data-idle", "");
  forceReflow(stage);
}

/**
 * @param {{ playOnInit?: boolean }} [config]
 * playOnInit true (default): variant 1 bij load. false: variant 2/3 statisch tot Afspelen.
 */
function logoTectonicIntro(config = {}) {
  const playOnInit = config.playOnInit !== false;

  return {
    playOnInit,
    settled: playOnInit ? false : true,

    init() {
      const stage = getLogoStage(this.$el);
      if (playOnInit) {
        syncStageSettled(stage, false);
        runTectonicIntro(this);
        return;
      }
      stage?.setAttribute("data-intro-ready", "");
      stage?.setAttribute("data-idle", "");
      syncStageSettled(stage, true);
    },

    replay() {
      resetStageBeforeReplay(this);
      runTectonicIntro(this, { scatterHoldMs: SCATTER_HOLD_REPLAY_MS });
    },
  };
}

function replayDemoCard(card) {
  if (!card) {
    console.warn("[TectonicLogoDemo] Geen kaart gevonden.");
    return false;
  }
  if (typeof Alpine === "undefined" || typeof Alpine.$data !== "function") {
    console.warn(
      "[TectonicLogoDemo] Alpine niet geladen — check internet (CDN) en console op 404 voor js/demo.js.",
    );
    return false;
  }
  let data;
  try {
    data = Alpine.$data(card);
  } catch (err) {
    console.error("[TectonicLogoDemo] Alpine.$data mislukt:", err);
    return false;
  }
  if (!data || typeof data.replay !== "function") {
    console.warn("[TectonicLogoDemo] Geen replay() op deze kaart — x-data klopt?");
    return false;
  }
  data.replay();
  return true;
}

function registerAlpineComponents() {
  Alpine.data("logoTectonicIntro", logoTectonicIntro);
}

document.addEventListener("alpine:init", registerAlpineComponents);
if (window.Alpine && typeof window.Alpine.data === "function") {
  registerAlpineComponents();
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-tectonic-replay]");
  if (!btn) return;
  event.preventDefault();
  replayDemoCard(btn.closest("[data-variant]"));
});

/** Console: TectonicLogoDemo.replay("thirds") | .replay("brand") | .status() */
window.TectonicLogoDemo = {
  replay(variant) {
    return replayDemoCard(document.querySelector(`[data-variant="${variant}"]`));
  },
  status() {
    return [...document.querySelectorAll("[data-variant]")].map((card) => {
      let data = null;
      try {
        data = typeof Alpine !== "undefined" ? Alpine.$data(card) : null;
      } catch {
        data = null;
      }
      const stage = getLogoStage(card);
      return {
        variant: card.dataset.variant,
        viewport: window.innerWidth,
        mdPlus: transboxIntroMediaQuery.matches,
        reducedMotion: prefersReducedMotion.matches,
        hasAlpineData: Boolean(data),
        settled: data?.settled,
        stageClass: stage?.className ?? null,
      };
    });
  },
};
