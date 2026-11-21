// Single source of truth for public contact details.
export const CONTACT_EMAIL = "Info@oolingroup.com";

// Japanese mobile 080-4818-8846 in international format.
export const CONTACT_PHONE_DISPLAY = "+81 80-4818-8846";
export const CONTACT_PHONE_TEL = "+818048188846";

const WHATSAPP_NUMBER = "818048188846";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi OOLLN! I'd like to discuss a project.",
)}`;

export type ContactMessageStatus = "new" | "read";

export type AdminContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: string;
};
