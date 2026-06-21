-- Invitations & Onboarding schema for VisaFlow Module 1

-- Invitations table: track invites, tokens, expiry, status
CREATE TABLE invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  email text NOT NULL,
  token text NOT NULL UNIQUE,
  role_name text NOT NULL,
  invited_by uuid REFERENCES users(id) ON DELETE SET NULL,
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending','accepted','revoked')),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_invitations_org_email ON invitations(organization_id, email);
CREATE INDEX idx_invitations_token ON invitations(token);

-- Helper SQL: create organization + default roles + assign creator
-- Usage: run from server with service role privileges to avoid client exposure
-- Example (pseudocode): SELECT * FROM create_org_with_defaults('Acme Inc','acme', 'tech', '<creator_user_id>');

CREATE OR REPLACE FUNCTION create_org_with_defaults(p_name text, p_slug text, p_industry text, p_creator uuid)
RETURNS uuid LANGUAGE plpgsql AS $$
DECLARE
  new_org uuid;
  role_admin uuid;
  role_manager uuid;
  role_employee uuid;
BEGIN
  INSERT INTO organizations (name, slug, industry) VALUES (p_name, p_slug, p_industry) RETURNING id INTO new_org;
  INSERT INTO roles (organization_id, name, description, is_default) VALUES (new_org, 'Admin', 'Full access', true) RETURNING id INTO role_admin;
  INSERT INTO roles (organization_id, name, description, is_default) VALUES (new_org, 'Manager', 'Manage day-to-day operations', false) RETURNING id INTO role_manager;
  INSERT INTO roles (organization_id, name, description, is_default) VALUES (new_org, 'Employee', 'Standard workspace access', false) RETURNING id INTO role_employee;
  -- assign creator as Admin (requires user row exists)
  IF p_creator IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id, assigned_by) VALUES (p_creator, role_admin, p_creator);
  END IF;
  RETURN new_org;
END; $$;

-- Note: create_org_with_defaults must be executed with a Service Role key or via an Edge Function
