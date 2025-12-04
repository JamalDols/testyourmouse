const { Resend } = require("resend");
require("dotenv").config({ path: ".env.local" });

async function testEmail() {
  const recipient = process.argv[2];

  if (!recipient) {
    console.error("❌ Please provide a recipient email address.");
    console.error("Usage: node scripts/test-resend.js <your-email>");
    return;
  }

  console.log("Testing Resend Configuration...");
  console.log("API Key present:", !!process.env.RESEND_API_KEY);
  console.log("Recipient:", recipient);

  if (!process.env.RESEND_API_KEY) {
    console.error("❌ Missing RESEND_API_KEY in .env.local");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "TestYourMouse <noreply@testyourmouse.com>",
      to: recipient,
      subject: "Test Email from Localhost (Resend Custom Domain)",
      html: "<p>If you receive this, <strong>Resend</strong> is configured correctly with your <strong>custom domain</strong>!</p>",
    });

    if (error) {
      console.error("❌ Failed to send email:");
      console.error(error);
      return;
    }

    console.log("✅ Email sent successfully!");
    console.log("ID:", data.id);
  } catch (error) {
    console.error("❌ Unexpected error:");
    console.error(error);
  }
}

testEmail();
