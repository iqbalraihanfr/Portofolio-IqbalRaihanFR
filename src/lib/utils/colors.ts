// Reusable color constants for the Ketik-academy-guest
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
      "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-[#BD0000] via-[#FF7A00] to-[#FFC900]",
    secondary: "bg-gradient-to-r from-red-700 via-orange-500 to-yellow-500",
    hero: "bg-gradient-to-r from-red-700 via-orange-500 to-yellow-500 dark:from-red-700 dark:to-yellow-500",
    contact:
      "bg-gradient-to-r from-gray-900 via-red-800 to-yellow-800 dark:from-white dark:via-red-200 dark:to-orange-200",
    card: "bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-900/20 dark:to-yellow-900/20",
    glass: "bg-white/60 dark:bg-gray-800/60",
  },

  // Border colors
  border: {
    primary: "border-gray-200 dark:border-gray-700",
    accent: "border-red-200 dark:border-red-800",
    focus: "border-red-500 dark:border-red-400",
  },

  // Status colors
  status: {
    success: "from-green-400 to-emerald-500",
    info: "from-blue-400 to-cyan-500",
    warning: "from-yellow-400 to-orange-500",
    error: "from-red-500 to-yellow-500",
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
