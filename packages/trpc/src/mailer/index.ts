import nodemailer from "nodemailer";

interface EmailConfig {
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
  };
  defaultFrom: string;
}

class EmailService {
  private config: EmailConfig;
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // Load config from environment variables
    this.config = {
      smtp: {
        host: process.env.SMTP_HOST ?? "",
        port: parseInt(process.env.SMTP_PORT ?? "587"),
        secure: process.env.SMTP_SECURE === "true",
        user: process.env.SMTP_USER ?? "",
        password: process.env.SMTP_PASSWORD ?? "",
      },
      defaultFrom: process.env.EMAIL_FROM ?? "",
    };
  }

  private validateConfig(): void {
    const { smtp } = this.config;
    if (!smtp.host || !smtp.user || !smtp.password) {
      throw new Error("Missing required email configuration");
    }
  }

  async initialize(): Promise<void> {
    try {
      this.validateConfig();

      this.transporter = nodemailer.createTransport({
        host: this.config.smtp.host,
        port: this.config.smtp.port,
        secure: this.config.smtp.secure,
        auth: {
          user: this.config.smtp.user,
          pass: this.config.smtp.password,
        },
      });

      // Verify connection
      await this.transporter.verify();
      console.log("Email service initialized successfully");
    } catch (error) {
      console.error("Failed to initialize email service:", error);
      throw error;
    }
  }

  async sendEmail(
    options: nodemailer.SendMailOptions,
  ): Promise<nodemailer.SentMessageInfo> {
    if (!this.transporter) await this.initialize();

    try {
      const mailOptions = {
        from: this.config.defaultFrom,
        ...options,
      };

      if (this.transporter) await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Failed to send email:", error);
      throw error;
    }
  }
}

const mailer = new EmailService();
export default mailer;
