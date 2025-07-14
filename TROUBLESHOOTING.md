# Troubleshooting Guide

## Errors yang Terjadi dan Solusinya

### 1. **CSS Variables Error**

**Error:** `Unknown word --bg-primary`

**Penyebab:** CSS variables tidak dikenali oleh Tailwind CSS v4

**Solusi:**

- Menggunakan utility classes langsung dengan warna hex
- Menghapus CSS variables yang tidak dikenali

### 2. **Border Border Error**

**Error:** `Cannot apply unknown utility class border-border`

**Penyebab:** `border-border` bukan utility class yang valid

**Solusi:**

```css
/* Sebelum */
@apply border-border;

/* Sesudah */
@apply border-gray-200 dark:border-gray-700;
```

### 3. **AnimatePresence Warning**

**Warning:** `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait"`

**Penyebab:** Mode "wait" tidak cocok untuk multiple children

**Solusi:**

```tsx
/* Sebelum */
<AnimatePresence mode="wait">

/* Sesudah */
<AnimatePresence mode="sync">
```

## Sistem Warna yang Diperbaiki

### Background Colors

```tsx
// Primary backgrounds
colors.background.primary; // bg-white dark:bg-gray-900
colors.background.secondary; // bg-gray-50 dark:bg-gray-800
colors.background.muted; // bg-gray-100 dark:bg-gray-700
colors.background.card; // bg-white dark:bg-gray-800
colors.background.cardTransparent; // bg-white/80 dark:bg-gray-800/80
```

### Text Colors

```tsx
colors.text.primary; // text-gray-900 dark:text-white
colors.text.secondary; // text-gray-600 dark:text-gray-300
colors.text.muted; // text-gray-500 dark:text-gray-400
colors.text.accent; // text-blue-600 dark:text-blue-400
```

## Cara Menjalankan Project

1. **Pastikan semua dependencies terinstall:**

```bash
npm install
```

2. **Jalankan development server:**

```bash
npm run dev
```

3. **Buka browser:**

```
http://localhost:3000
```

## Tips untuk Menghindari Error

1. **Gunakan Tailwind classes yang valid**
2. **Test perubahan CSS secara bertahap**
3. **Periksa console untuk error**
4. **Gunakan TypeScript untuk type safety**

## File yang Diperbaiki

- ✅ `app/globals.css` - Fixed CSS variables dan utility classes
- ✅ `components/projects-section.tsx` - Fixed AnimatePresence mode
- ✅ `lib/colors.ts` - Updated color system
- ✅ Semua komponen menggunakan sistem warna yang konsisten

## Status Project

**✅ SEMUA ERROR SUDAH DIPERBAIKI**

Project sekarang menggunakan:

- Background putih (`#ffffff`) untuk mode day
- Background dark gray (`#111827`) untuk mode dark
- Sistem warna yang reusable dan konsisten
- Tidak ada error CSS atau TypeScript
