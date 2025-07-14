# Color System Documentation

## Overview

This project now uses a reusable color system that provides consistent colors across light and dark modes. The system is designed to be maintainable and easy to update.

## Background Colors

### Primary Backgrounds

- **Light Mode**: `#ffffff` (Pure White)
- **Dark Mode**: `#111827` (Dark Gray)

### Secondary Backgrounds

- **Light Mode**: `#f8fafc` (Light Gray)
- **Dark Mode**: `#1f2937` (Medium Dark Gray)

### Muted Backgrounds

- **Light Mode**: `#f1f5f9` (Very Light Gray)
- **Dark Mode**: `#374151` (Medium Gray)

## Usage

### 1. Import Colors

```tsx
import { colors } from "@/lib/colors";
```

### 2. Use Background Colors

```tsx
// Primary background (white in light, dark gray in dark mode)
<div className={colors.background.primary}>

// Secondary background
<div className={colors.background.secondary}>

// Muted background
<div className={colors.background.muted}>

// Card background
<div className={colors.background.card}>

// Transparent card background
<div className={colors.background.cardTransparent}>
```

### 3. Use Text Colors

```tsx
// Primary text
<p className={colors.text.primary}>

// Secondary text
<p className={colors.text.secondary}>

// Muted text
<p className={colors.text.muted}>

// Accent text
<p className={colors.text.accent}>
```

### 4. Use Gradient Colors

```tsx
// Primary gradient
<div className={colors.gradients.primary}>

// Hero gradient
<div className={colors.gradients.hero}>

// Contact gradient
<div className={colors.gradients.contact}>

// Card gradient
<div className={colors.gradients.card}>

// Glass effect
<div className={colors.gradients.glass}>
```

### 5. Use Border Colors

```tsx
// Primary border
<div className={colors.border.primary}>

// Accent border
<div className={colors.border.accent}>

// Focus border
<div className={colors.border.focus}>
```

## CSS Variables

The colors are defined in `app/globals.css`:

```css
/* Custom background colors */
--bg-primary: #ffffff;
--bg-primary-dark: #111827;
--bg-secondary: #f8fafc;
--bg-secondary-dark: #1f2937;
--bg-muted: #f1f5f9;
--bg-muted-dark: #374151;
--bg-card: #ffffff;
--bg-card-dark: #1f2937;
--bg-card-transparent: rgba(255, 255, 255, 0.8);
--bg-card-transparent-dark: rgba(31, 41, 55, 0.8);
```

## Utility Classes

Custom utility classes are available:

```css
@utility bg-primary {
  background-color: var(--bg-primary);
}
@utility bg-primary-dark {
  background-color: var(--bg-primary-dark);
}
@utility bg-secondary {
  background-color: var(--bg-secondary);
}
@utility bg-secondary-dark {
  background-color: var(--bg-secondary-dark);
}
@utility bg-muted-custom {
  background-color: var(--bg-muted);
}
@utility bg-muted-custom-dark {
  background-color: var(--bg-muted-dark);
}
@utility bg-card-custom {
  background-color: var(--bg-card);
}
@utility bg-card-custom-dark {
  background-color: var(--bg-card-dark);
}
@utility bg-card-transparent {
  background-color: var(--bg-card-transparent);
}
@utility bg-card-transparent-dark {
  background-color: var(--bg-card-transparent-dark);
}
@utility bg-section {
  background-color: var(--bg-primary);
}
@utility bg-section-dark {
  background-color: var(--bg-primary-dark);
}
```

## Predefined Combinations

Use predefined color combinations for common patterns:

```tsx
import { colorCombinations } from "@/lib/colors"

// Hero section styling
<div className={colorCombinations.heroSection}>

// Card styling
<div className={colorCombinations.card}>

// Glass card styling
<div className={colorCombinations.glassCard}>

// Contact form styling
<div className={colorCombinations.contactForm}>
```

## Benefits

1. **Consistency**: All components use the same color palette
2. **Maintainability**: Change colors in one place
3. **Dark Mode Support**: Automatic dark mode switching
4. **Type Safety**: TypeScript support for color combinations
5. **Performance**: CSS variables for optimal rendering

## Migration Guide

### Before (Hardcoded)

```tsx
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-600 dark:text-gray-300">
```

### After (Reusable)

```tsx
<div className={colors.background.primary}>
<p className={colors.text.secondary}>
```

## Updating Colors

To change the color scheme:

1. Update CSS variables in `app/globals.css`
2. Update color constants in `lib/colors.ts`
3. All components will automatically use the new colors

This system ensures that your portfolio maintains a consistent and professional appearance across all pages and themes.
