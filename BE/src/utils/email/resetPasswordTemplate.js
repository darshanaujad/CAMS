module.exports = ({ username, resetLink, appName = "CAMS", domain = "cams12.vercel.app" }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Password Reset</title>
</head>

<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<!-- CARD -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.08);">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(90deg,#2563eb,#6366f1); padding:28px; text-align:center;">
<h2 style="margin:0; color:#ffffff; font-size:24px; letter-spacing:1px;">
${appName}
</h2>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:32px; color:#374151;">

<h2 style="margin-top:0; font-size:22px; color:#111827;">
Reset Your Password
</h2>

<p style="font-size:15px; line-height:1.6; margin-bottom:16px;">
Hello <strong>${username || "User"}</strong>,
</p>

<p style="font-size:15px; line-height:1.6;">
We received a request to reset the password for your <strong>${appName}</strong> account.
Click the button below to create a new password.
</p>

<!-- BUTTON -->
<div style="text-align:center; margin:30px 0;">
<a href="${resetLink}" style="
background:#2563eb;
color:#ffffff;
padding:14px 28px;
text-decoration:none;
font-size:15px;
font-weight:600;
border-radius:6px;
display:inline-block;
">
Reset Password
</a>
</div>

<p style="font-size:14px; color:#6b7280;">
This link will expire in <strong>48 hours</strong> for security reasons.
</p>

<p style="font-size:14px; color:#6b7280;">
If you didn't request this password reset, you can safely ignore this email.
</p>

<!-- FALLBACK LINK -->
<div style="margin-top:24px; padding:14px; background:#f9fafb; border-radius:6px;">
<p style="margin:0 0 6px; font-size:13px; color:#6b7280;">
If the button doesn't work, copy and paste this link into your browser:
</p>
<p style="margin:0; font-size:13px; color:#2563eb; word-break:break-all;">
${resetLink}
</p>
</div>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f9fafb; text-align:center; padding:18px; font-size:12px; color:#9ca3af;">
<p style="margin:0;">
© ${new Date().getFullYear()} ${appName}. All rights reserved.
</p>
<p style="margin:4px 0 0;">
${domain}
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};