import { z } from 'zod';

export const createLeadSchema = z.object({
  title: z.string().min(2),
  contact_name: z.string().optional(),
  contact_email: z.string().email().optional(),
  contact_phone: z.string().optional(),
  source: z.string().optional(),
  value: z.number().nonnegative().optional()
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
