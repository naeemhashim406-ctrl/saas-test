import { describe, it, expect } from 'vitest';
import { createOrgSchema, inviteMemberSchema } from './onboardingSchemas';

describe('onboardingValidators', () => {
  it('createOrgSchema accepts valid input', () => {
    const result = createOrgSchema.safeParse({ name: 'Acme', slug: 'acme-inc', industry: 'Legal' });
    expect(result.success).toBe(true);
  });

  it('createOrgSchema rejects invalid slug', () => {
    const result = createOrgSchema.safeParse({ name: 'Acme', slug: 'Invalid Slug' });
    expect(result.success).toBe(false);
  });

  it('inviteMemberSchema accepts valid email', () => {
    const result = inviteMemberSchema.safeParse({ email: 'user@example.com', role_name: 'Manager' });
    expect(result.success).toBe(true);
  });

  it('inviteMemberSchema rejects bad email', etc.