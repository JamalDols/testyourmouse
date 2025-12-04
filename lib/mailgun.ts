import FormData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(FormData);

export const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
});

export const mailgunDomain = process.env.MAILGUN_DOMAIN || "";

export const emailConfig = {
  from: "TestYourMouse <noreply@testyourmouse.com>",
  replyTo: "support@testyourmouse.com",
};
