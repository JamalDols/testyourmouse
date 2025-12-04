interface RecoveryEmailProps {
  recoveryUrl: string;
}

export function RecoveryEmail({ recoveryUrl }: RecoveryEmailProps) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recover Purchase - TestYourMouse Pro</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0f; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0f;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; border: 2px solid #22d3ee;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">🖱️</div>
              <h1 style="margin: 0; font-size: 28px; color: #22d3ee; font-weight: 600;">TestYourMouse</h1>
              <p style="margin: 10px 0 0; font-size: 16px; color: #a0a0b0;">Professional Mouse Testing Tools</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; color: #22d3ee; text-align: center;">Recover Your Purchase</h2>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                We received a request to recover your <strong>TestYourMouse Pro</strong> purchase. Click the button below to restore your access on this device.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${recoveryUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #22d3ee 0%, #a855f7 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; text-align: center;">
                      Restore Purchase →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #a0a0b0; text-align: center;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; border-top: 1px solid rgba(34, 211, 238, 0.2); text-align: center;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #a0a0b0;">
                Need help? Contact us at <a href="mailto:support@testyourmouse.com" style="color: #22d3ee; text-decoration: none;">support@testyourmouse.com</a>
              </p>
              <p style="margin: 10px 0 0; font-size: 12px; color: #707080;">
                © 2025 TestYourMouse.com • Professional Mouse Testing Tools
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
}

export function getRecoveryEmailText({ recoveryUrl }: RecoveryEmailProps) {
  return `
TestYourMouse Pro - Recover Purchase

We received a request to recover your TestYourMouse Pro purchase.

Restore your purchase: ${recoveryUrl}

If you didn't request this email, you can safely ignore it.

Need help? Contact us at support@testyourmouse.com

© 2025 TestYourMouse.com
  `.trim();
}
