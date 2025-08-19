import { z } from 'zod'

export const GuestbookSchema = z.object({
  name: z.string().min(1).max(60),
  message: z.string().min(1).max(500),
})
export type GuestbookInput = z.infer<typeof GuestbookSchema>