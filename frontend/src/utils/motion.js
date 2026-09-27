// Shared Framer Motion animation system for OM Communication Works
// All variants respect prefers-reduced-motion via the `reducedVariant` helper.

export const EASE_STANDARD = [0.2, 0.8, 0.2, 1]

// ── Core variants ─────────────────────────────────────────────────────────────

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE_STANDARD,
    },
  },
}

export const fadeInUpSm = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      ease: EASE_STANDARD,
    },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.0,
    },
  },
}

export const cardScroll = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: EASE_STANDARD,
    },
  },
}

export const imageReveal = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: EASE_STANDARD,
    },
  },
}

// ── Reduced-motion overrides ──────────────────────────────────────────────────

export const fadeInUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

export const cardScrollReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
}

export const staggerContainerReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.02, delayChildren: 0 } },
}

// ── Helper: pick correct variant based on reduced-motion preference ────────────
export function pickVariant(prefersReduced, full, reduced) {
  return prefersReduced ? reduced : full
}

// ── Viewport settings ─────────────────────────────────────────────────────────
export const VIEWPORT_ONCE = { once: true, margin: '-50px 0px -50px 0px' }
export const VIEWPORT_CARDS = { once: true, margin: '-40px 0px -40px 0px' }
