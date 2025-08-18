// src/lib/format.ts

/** ---------- Number ---------- */
const NUMBER_FORMATTER = new Intl.NumberFormat();

export function formatNumber(n?: number): string {
  return typeof n === 'number' ? NUMBER_FORMATTER.format(n) : '0';
}

/** ---------- Date (YYYY-MM-DD / ISO) ---------- */
const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' });

/** Accepts 'YYYY-MM-DD' or ISO string */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return isNaN(+date) ? '—' : DATE_FORMATTER.format(date);
}

/** ---------- Timestamp (Firestore-like) ---------- */
type TimestampLike = { seconds: number; nanoseconds: number };

const SHORT_TIME_FMT = new Intl.DateTimeFormat(undefined, { timeStyle: 'short' });
const SHORT_DATE_FMT = new Intl.DateTimeFormat(undefined, { dateStyle: 'short' });
const FULL_TS_FMT = new Intl.DateTimeFormat(undefined, {
  weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric'
});

export function formatTimestamp(ts: TimestampLike): string {
  const date = tsToDate(ts);
  if (isToday(date)) return `Today at ${SHORT_TIME_FMT.format(date)}`;
  if (isYesterday(date)) return `Yesterday at ${SHORT_TIME_FMT.format(date)}`;
  return SHORT_DATE_FMT.format(date);
}

export function formatFullTimestamp(ts: TimestampLike): string {
  return FULL_TS_FMT.format(tsToDate(ts));
}

function tsToDate({ seconds, nanoseconds }: TimestampLike): Date {
  return new Date(seconds * 1000 + nanoseconds / 1_000_000);
}

function isToday(d: Date) {
  const now = new Date();
  return now.toDateString() === d.toDateString();
}
function isYesterday(d: Date) {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return y.toDateString() === d.toDateString();
}

/** ---------- Media helpers ---------- */
export function formatMillisecondsToPlayback(ms: number): string {
  if (!ms || ms < 0) return '0:00';
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = String(totalSec % 60).padStart(2, '0');
  return `${m}:${s}`;
}