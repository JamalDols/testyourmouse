import { Resend } from "resend";

// Initialize Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const emailConfig = {
  // Use custom domain for both dev and prod since it's verified
  from: "TestYourMouse <noreply@testyourmouse.com>",
  replyTo: "support@testyourmouse.com",
};
