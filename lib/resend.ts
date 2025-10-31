import { Resend } from "resend";

// Initialize Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const emailConfig = {
  // Para testing usa: "onboarding@resend.dev"
  // Para producción usa: "TestYourMouse <noreply@testyourmouse.com>"
  from: process.env.NODE_ENV === "production" ? "TestYourMouse <noreply@testyourmouse.com>" : "Acme <onboarding@resend.dev>", // Dominio de prueba de Resend
  replyTo: "support@testyourmouse.com",
};
