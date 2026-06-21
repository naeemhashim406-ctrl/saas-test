import { z } from 'zod';

export const createOrgSchema = z.object({
  name: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/).min(2),
  industry: z.string().optional()
});

export const inviteMemberSchema = z.object({
  email: z.string().email(),
  role_name: z.string().min(2),
  message: z.string().max(1000).optional()
});

export type CreateOrgInput = z.infer<typeof createOrgSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
