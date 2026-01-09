type AdminContactParams = {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
};

export function adminContactTemplate({
  fullName,
  email,
  phone,
  message,
}: AdminContactParams): string {
  return `
    <!DOCTYPE html>
      <html>
        <body style="margin:0; padding:0; background:#f4f6f6; font-family: Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.08);">
                  <tr>
                    <td style="background:#274646; padding:24px 32px;">
                      <h1 style="margin:0; font-size:20px; font-weight:400; color:#ffffff;">
                        New Contact Form Submission
                      </h1>
                      <p style="margin:6px 0 0; font-size:14px; color:#d7e6e6;">
                        Recycle For Future
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:32px;">
                      <p style="font-size:15px; line-height:1.6;">
                      You have received a new message from your website contact form.
                      </p>
                      <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom:24px;">
                        <tr><td style="font-weight:bold;">Full Name</td><td>${fullName}</td></tr>
                        <tr><td style="font-weight:bold;">Email</td><td>${email}</td></tr>
                        <tr><td style="font-weight:bold;">Phone</td><td>${phone || 'Not provided'}</td></tr>
                      </table>
                      <div style="background:#f7f9f9; border-left:4px solid #D4F2A1; padding:16px;">
                        <p style="font-weight:bold;">Message</p>
                        <p>${message.replace(/\n/g, '<br />')}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background:#f0f0f0; padding:16px; text-align:center; font-size:12px; color:#777;">
                      This message was sent from the Recycle For Future website contact form.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
}
