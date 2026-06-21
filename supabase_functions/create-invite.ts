// Example Supabase Edge Function (Node/TS) to create an invitation and send email via SendGrid
// Deploy as a Supabase Edge Function or any serverless endpoint. Use SERVICE_ROLE key.

import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const APP_URL = process.env.APP_URL || 'https://app.example.com';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

export default async function handler(req: any, res: any) {
  try {
    const body = await req.json();
    const { email, organization_id, role_name = 'Employee', message } = body;
    if (!email || !organization_id) return res.json({ error: 'Missing parameters' }, { status: 400 });

    const token = uuidv4();
    const expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();

    const { error: insertError } = await supabase.from('invitations').insert([{ organization_id, email, token, role_name, message, expires_at }]);
    if (insertError) return res.json({ error: insertError.message }, { status: 500 });

    // Send email using SendGrid. Replace sender & template as needed.
    const acceptUrl = `${APP_URL}/onboarding/accept?token=${token}`;
    const sendRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }], subject: 'You are invited to VisaFlow' }],
        from: { email: 'no-reply@visaflow.example', name: 'VisaFlow' },
        content: [{ type: 'text/html', value: `You were invited to join VisaFlow. Click <a href="${acceptUrl}">here</a> to accept.` }]
      })
    });

    if (!sendRes.ok) {
      console.error('SendGrid failure', await sendRes.text());
      // Note: invite remains in DB; you can retry sending or mark a flag
    }

    return res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return res.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
