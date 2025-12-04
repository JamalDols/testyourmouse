const FormData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config({ path: ".env.local" });

const mailgun = new Mailgun(FormData);

async function testEmail() {
  const recipient = process.argv[2];

  if (!recipient) {
    console.error("❌ Please provide a recipient email address.");
    console.error("Usage: node scripts/test-email.js <your-authorized-email>");
    return;
  }

  console.log("Testing Mailgun Configuration...");
  console.log("API Key present:", !!process.env.MAILGUN_API_KEY);
  console.log("Domain present:", !!process.env.MAILGUN_DOMAIN);
  console.log("Recipient:", recipient);

  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.error("❌ Missing Mailgun credentials in .env.local");
    return;
  }

  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
  });

  try {
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: "TestYourMouse <noreply@testyourmouse.com>",
      to: [recipient],
      subject: "Test Email from Localhost",
      text: "If you receive this, Mailgun is configured correctly!",
    });
    console.log("✅ Email sent successfully!");
    console.log("ID:", result.id);
  } catch (error) {
    console.error("❌ Failed to send email:");
    if (error.details) {
      console.error("Details:", error.details);
    } else {
      console.error(error.message);
    }

    if (error.status === 403) {
      console.log("\n⚠️  TIP: If you are using a Sandbox Domain, you MUST verify the recipient email in your Mailgun Dashboard > Authorized Recipients.");
    }
  }
}

testEmail();
