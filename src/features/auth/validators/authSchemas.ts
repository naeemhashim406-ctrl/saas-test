import { z } from 'zod';

export const magicLinkSchema = z.object({
  email: z.string().min(5).email()
});

export const signInSchema = z.object({
  email: z.string().email(),
  remember: z.boolean().optional()
});

export type MagicLinkInput = z.infer<typeof magicLinkSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
