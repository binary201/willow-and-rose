import nodemailer from 'nodemailer';

const escapeHtml = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export default async function handler(req, res){
  if(req.method !== 'POST'){
    res.setHeader('Allow', 'POST');
    return res.status(405).json({success:false, message:'Method not allowed'});
  }

  const d = req.body || {};

  // Honeypot — silently accept bot submissions so they think it worked
  if(d.botcheck){
    return res.status(200).json({success:true});
  }

  // Required fields
  const missing=[];
  if(!d.first_name)missing.push('first name');
  if(!d.last_name)missing.push('last name');
  if(!d.email)missing.push('email');
  if(!d.phone)missing.push('phone');
  if(!d.event_date)missing.push('preferred date');
  if(!d.package)missing.push('package');
  if(missing.length){
    return res.status(400).json({success:false, message:`Missing required: ${missing.join(', ')}`});
  }

  // Basic email shape check
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)){
    return res.status(400).json({success:false, message:'Invalid email address'});
  }

  // US phone — must have at least 10 digits
  if((String(d.phone).match(/\d/g)||[]).length<10){
    return res.status(400).json({success:false, message:'Invalid phone number'});
  }

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to   = process.env.NOTIFY_TO || user;

  if(!user || !pass){
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars');
    return res.status(500).json({success:false, message:'Email service not configured'});
  }

  const addons = Array.isArray(d.addons) ? d.addons : (d.addons ? [d.addons] : []);

  const lines = [
    `Name:     ${d.first_name} ${d.last_name || ''}`.trim(),
    `Email:    ${d.email}`,
    `Phone:    ${d.phone || '(not provided)'}`,
    `Date:     ${d.event_date || '(not provided)'}`,
    `Guests:   ${d.guests || '(not specified)'}`,
    `Package:  ${d.package || '(no preference)'}`,
    `Add-ons:  ${addons.length ? addons.join(', ') : 'None'}`,
    '',
    'Message:',
    d.message || '(no message)',
  ];
  const text = `New Willow & Rosé inquiry\n${'─'.repeat(40)}\n${lines.join('\n')}`;

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;color:#1C2E22;">
      <h2 style="color:#C4849A;font-weight:400;margin:0 0 1rem;">New Willow &amp; Rosé Inquiry</h2>
      <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td style="padding:6px 0;color:#5A7A62;width:110px;">Name</td><td>${escapeHtml(d.first_name)} ${escapeHtml(d.last_name || '')}</td></tr>
        <tr><td style="padding:6px 0;color:#5A7A62;">Email</td><td><a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#5A7A62;">Phone</td><td>${escapeHtml(d.phone || '(not provided)')}</td></tr>
        <tr><td style="padding:6px 0;color:#5A7A62;">Date</td><td>${escapeHtml(d.event_date || '(not provided)')}</td></tr>
        <tr><td style="padding:6px 0;color:#5A7A62;">Guests</td><td>${escapeHtml(d.guests || '(not specified)')}</td></tr>
        <tr><td style="padding:6px 0;color:#5A7A62;">Package</td><td>${escapeHtml(d.package || '(no preference)')}</td></tr>
        <tr><td style="padding:6px 0;color:#5A7A62;vertical-align:top;">Add-ons</td><td>${addons.length ? addons.map(escapeHtml).join('<br>') : 'None'}</td></tr>
      </table>
      <h3 style="color:#5A7A62;font-weight:400;margin:1.5rem 0 0.5rem;font-size:14px;text-transform:uppercase;letter-spacing:0.15em;">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.6;font-family:Arial,sans-serif;font-size:14px;">${escapeHtml(d.message || '(no message)')}</p>
      <p style="margin-top:2rem;color:#8AAA90;font-size:12px;">Reply directly to this email to reach the customer.</p>
    </div>`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
  });

  try{
    await transporter.sendMail({
      from: `"Willow & Rosé Website" <${user}>`,
      to,
      replyTo: d.email,
      subject: `Willow & Rosé Inquiry - ${d.first_name} ${d.last_name || ''}`.trim(),
      text,
      html
    });
    return res.status(200).json({success:true});
  }catch(err){
    console.error('SMTP send failed:', err.message);
    return res.status(500).json({success:false, message:'Failed to send email'});
  }
}
