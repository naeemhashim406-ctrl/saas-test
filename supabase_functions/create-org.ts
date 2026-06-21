// Edge Function to create organization, default roles, and assign creator as Admin
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

export default async function handler(req: any, res: any) {
  try {
    const body = await req.json();
    const { name, slug, industry, creator_user_id } = body;
    if (!name || !slug) return res.json({ error: 'Missing params' }, { status: 400 });

    // Use helper function defined in SQL migration
    const { data, error } = await supabase.rpc('create_org_with_defaults', { p_name: name, p_slug: slug, p_industry: industry, p_creator: creator_user_id });
    if (error) return res.json({ error: error.message }, { status: 500 });

    // data may be null depending on driver; return created org id by querying
    const orgRow = await supabase.from('organizations').select('id').eq('slug', slug).single();
    if (orgRow.error) return res.json({ error: orgRow.error.message }, { status: 500 });

    return res.json({ success: true, org_id: orgRow.data.id });
  } catch (err: any) {
    console.error(err);
    return res.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
