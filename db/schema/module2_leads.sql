-- VisaFlow Module 2: Leads schema

CREATE TABLE lead_statuses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  sort_order int DEFAULT 0
);

CREATE TABLE leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  contact_name text,
  contact_email text,
  contact_phone text,
  source text,
  status_id uuid REFERENCES lead_statuses(id) ON DELETE SET NULL,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  value numeric DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE lead_tags (
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  tag text NOT NULL,
  PRIMARY KEY (lead_id, tag)
);

CREATE TABLE lead_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES leads(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  type text,
  note text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_leads_org_status ON leads (organization_id, status_id);
