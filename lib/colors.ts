// Reusable color constants for the portfolio
export const colors = {
  // Background colors
  background: {
    primary: "bg-white dark:bg-black",
    secondary: "bg-gray-50 dark:bg-neutral-950",
    muted: "bg-gray-100 dark:bg-neutral-900",
    card: "bg-white dark:bg-neutral-800",
    cardTransparent: "bg-white/80 dark:bg-neutral-800/80",
    section: "bg-white dark:bg-neutral-950",
  },

  // Text colors
  text: {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-600 dark:text-gray-300",
    muted: "text-gray-500 dark:text-gray-400",
    accent: "text-blue-600 dark:text-blue-400",
  },

  // Gradient colors
  gradients: {
    primary: "bg-gradient-to-r from-teal-600 via-sky-500 to-blue-400",
    secondary: "bg-linear-to-r from-amber-900 via-blue-800 to-purple-800",
    hero: "bg-linear-to-r from-amber-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200",
    contact:
      "bg-linear-to-r from-gray-900 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200",
    card: "bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
    glass: "bg-white/60 dark:bg-gray-800/60",
  },

  // Border colors
  border: {
    primary: "border-gray-200 dark:border-gray-700",
    accent: "border-purple-200 dark:border-purple-800",
    focus: "border-purple-500 dark:border-purple-400",
  },

  // Status colors
  status: {
    success: "from-green-400 to-emerald-500",
    info: "from-blue-400 to-cyan-500",
    warning: "from-yellow-400 to-orange-500",
    error: "from-red-500 to-pink-500",
  },
};

// Utility function to combine colors
export const combineColors = (...colorClasses: string[]) => {
  return colorClasses.join(" ");
};

// Predefined combinations
export const colorCombinations = {
  heroSection: combineColors(colors.background.primary, colors.text.primary),
  card: combineColors(
    colors.background.card,
    colors.border.primary,
    colors.text.primary
  ),
  glassCard: combineColors(
    colors.gradients.glass,
    colors.border.primary,
    colors.text.primary
  ),
  contactForm: combineColors(
    colors.background.cardTransparent,
    colors.border.focus,
    colors.text.primary
  ),
};
