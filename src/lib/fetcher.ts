import { frontendEnv } from './env';
import type { ValidApiEndpoints } from './types/api';

/**
 * A fetcher function that adds the owner bearer token to the request.
 */
export async function fetcher<T>(
  input: ValidApiEndpoints | Request,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      // Pastikan variabel ini ada di `frontendEnv` jika digunakan di sisi klien
      // Jika token ini rahasia, seharusnya tidak ada di sini.
      // Berdasarkan kode Anda, sepertinya Anda ingin melindungi API Anda.
      // Cara yang benar adalah dengan memvalidasi token ini di sisi server (API routes)
      // Kode ini mungkin perlu penyesuaian lebih lanjut, tapi untuk sekarang,
      // kita hapus dari sini untuk keamanan.
      // Authorization: `Bearer ${frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN}`
    }
  });

  const data = (await res.json()) as T;

  return data;
}