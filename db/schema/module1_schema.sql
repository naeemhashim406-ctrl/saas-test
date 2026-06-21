-- VisaFlow Module 1: Auth & Core SQL schema (Postgres)
-- Multi-tenant aware: organizations own users and data

-- Enable pgcrypto extension if not present
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Organizations
CREATE TABLE organizations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    industry text,
    plan text DEFAULT 'trial',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Roles
CREATE TABLE roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    is_default boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    UNIQUE (organization_id, name)
);

-- Permissions
CREATE TABLE permissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL UNIQUE,
    description text
);

-- Role <-> Permission mapping
CREATE TABLE role_permissions (
    role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
    permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Users (authentication principals)
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
    email text NOT NULL,
    phone text,
    full_name text,
    avatar_url text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    last_sign_in_at timestamptz,
    metadata jsonb DEFAULT '{}'::jsonb,
    UNIQUE (organization_id, email)
);

-- Staff profile (separate from auth principal if needed)
CREATE TABLE staff (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    title text,
    timezone text,
    locale text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- User roles (many-to-many)
CREATE TABLE user_roles (
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
    assigned_by uuid REFERENCES users(id),
    assigned_at timestamptz DEFAULT now(),
    PRIMARY KEY (user_id, role_id)
);

-- Sessions / Audit (minimal — Supabase provides auth but storing last activity is useful)
CREATE TABLE activity_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(id) ON DELETE SET NULL,
    action text NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_users_org_email ON users (organization_id, email);
CREATE INDEX idx_roles_org ON roles (organization_id);
CREATE INDEX idx_activity_org ON activity_logs (organization_id, created_at DESC);

-- Seed core permissions (example)
INSERT INTO permissions (id, name, description) VALUES
(gen_random_uuid(), 'auth:signin', 'Sign in to the application')
ON CONFLICT DO NOTHING;

-- Notes:
--  - Use RLS policies per-organization in Supabase to enforce tenant isolation
--  - Allow Supabase auth to handle sessions / magic links; mirror user records for profiling and RBAC
