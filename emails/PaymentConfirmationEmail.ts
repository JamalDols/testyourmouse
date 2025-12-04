interface PaymentConfirmationEmailProps {
  customerEmail: string;
  amount: number;
  currency: string;
  sessionId: string;
  recoveryUrl: string;
}

export function PaymentConfirmationEmail({ customerEmail, amount, currency, sessionId, recoveryUrl }: PaymentConfirmationEmailProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation - TestYourMouse Pro</title>
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

          <!-- Success Icon -->
          <tr>
            <td style="padding: 20px 40px; text-align: center;">
              <div style="background: rgba(34, 211, 238, 0.1); border: 2px solid #22d3ee; border-radius: 50%; width: 80px; height: 80px; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 40px;">✓</span>
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <h2 style="margin: 0 0 20px; font-size: 24px; color: #22d3ee; text-align: center;">Payment Successful! 🎉</h2>
              
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e0e0e0;">
                Thank you for upgrading to <strong style="color: #a855f7;">TestYourMouse Pro</strong>! Your payment has been processed successfully.
              </p>

              <!-- Payment Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(34, 211, 238, 0.05); border-radius: 12px; border: 1px solid rgba(34, 211, 238, 0.2); margin: 20px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #a0a0b0; font-size: 14px;">Amount Paid:</td>
                        <td align="right" style="color: #22d3ee; font-size: 18px; font-weight: 600;">${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td style="color: #a0a0b0; font-size: 14px;">Email:</td>
                        <td align="right" style="color: #e0e0e0; font-size: 14px;">${customerEmail}</td>
                      </tr>
                      <tr>
                        <td style="color: #a0a0b0; font-size: 14px;">Transaction ID:</td>
                        <td align="right" style="color: #a0a0b0; font-size: 12px; font-family: monospace;">${sessionId.substring(0, 20)}...</td>
                      </tr>
                      <tr>
                        <td style="color: #a0a0b0; font-size: 14px;">Date:</td>
                        <td align="right" style="color: #e0e0e0; font-size: 14px;">${new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Pro Features -->
              <div style="background: rgba(168, 85, 247, 0.05); border-radius: 12px; border: 1px solid rgba(168, 85, 247, 0.2); padding: 20px; margin: 20px 0;">
                <h3 style="margin: 0 0 15px; font-size: 18px; color: #a855f7;">✨ What's Included:</h3>
                <ul style="margin: 0; padding-left: 20px; color: #e0e0e0; font-size: 14px; line-height: 1.8;">
                  <li>Reaction Time Test</li>
                  <li>Pixel Perfect Precision Test</li>
                  <li>Advanced Sensor Analysis</li>
                  <li>Real-time Response Graph</li>
                  <li>Lifetime Access (No Subscription)</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${recoveryUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #22d3ee 0%, #a855f7 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; text-align: center;">
                      Activate Pro Tools →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #a0a0b0; text-align: center;">
                Click the button above to activate your Pro Tools on this device. You can save this email to restore your purchase on other devices.
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

export function getPaymentConfirmationText({ customerEmail, amount, currency, sessionId, recoveryUrl }: PaymentConfirmationEmailProps) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

  return `
TestYourMouse Pro - Payment Confirmation

✓ Payment Successful!

Thank you for upgrading to TestYourMouse Pro! Your payment has been processed successfully.

Payment Details:
- Amount Paid: ${formattedAmount}
- Email: ${customerEmail}
- Transaction ID: ${sessionId}
- Date: ${new Date().toLocaleDateString("en-US")}

What's Included:
✓ Reaction Time Test
✓ Pixel Perfect Precision Test
✓ Advanced Sensor Analysis
✓ Real-time Response Graph
✓ Lifetime Access (No Subscription)

Activate your Pro Tools: ${recoveryUrl}

Need help? Contact us at support@testyourmouse.com

© 2025 TestYourMouse.com
  `.trim();
}
