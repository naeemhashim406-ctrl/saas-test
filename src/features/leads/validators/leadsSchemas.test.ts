import { describe, it, expect } from 'vitest';
import { createLeadSchema } from './leadsSchemas';

describe('leadsSchemas', () => {
  it('accepts valid lead', () => {
    const r = createLeadSchema.safeParse({ title: 'Test Lead', contact_email: 'a@b.com' });
    expect(r.success).toBe(true);
  });

  it('rejects short title', () => {
    const r = createLeadSchema.safeParse({ title: 'A' });
    expect(r.success).toBe(false);
  });
});
