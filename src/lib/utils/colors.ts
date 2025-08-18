// Reusable color constants for the portfolio
export const colors = {
  // Background colors
  background: {
    primary: "bg-white dark:bg-black",
    secondary: "bg-gray-50 dark:bg-black",
    muted: "bg-gray-100 dark:bg-black",
    card: "bg-white dark:bg-black",
    cardTransparent: "bg-white/80 dark:bg-black/80",
    section: "bg-white dark:bg-black",
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
    primary:
      "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-[#a855f7] via-[#f472b6] to-[#f4a4b6]",
    secondary: "bg-gradient-to-r from-purple-500 via-pink-400 to-rose-300",
    hero: "bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 dark:from-purple-200 dark:via-pink-200 dark:to-rose-200",
    contact:
      "bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 dark:from-white dark:via-purple-200 dark:to-pink-200",
    card: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
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
