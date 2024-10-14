import transporter from "@configs/email.config";
import { getEmailBody } from "@utils/email.util";
import { CustomError } from "@utils/errors.util";

class EmailService {
  async send(
    to: string | string[],
    subject: string,
    text: string = "",
    html: string = ""
  ) {
    const body = getEmailBody(to, subject, text, html);
    try {
      const response = await transporter.sendMail(body);
      return response.response;
    } catch (error) {
      throw new CustomError("Orror occurred while sending the email");
    }
  }
}

export const emailService = new EmailService();
export default emailService;
