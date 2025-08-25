import nodemailer from 'nodemailer'

// Email service utility for sending emails
// This file provides a simple interface that can be integrated with various email providers

export interface EmailData {
  to: string
  from: string
  subject: string
  text: string
  html?: string
}

export interface GmailConfig {
  user: string
  pass: string
  from?: string
}

export class EmailService {
  private apiKey?: string
  private gmailConfig?: GmailConfig
  private provider: 'resend' | 'sendgrid' | 'nodemailer' | 'gmail' | 'console'

  constructor(
    provider: 'resend' | 'sendgrid' | 'nodemailer' | 'gmail' | 'console' = 'console',
    apiKey?: string,
    gmailConfig?: GmailConfig,
  ) {
    this.provider = provider
    this.apiKey = apiKey
    this.gmailConfig = gmailConfig
  }

  async send(emailData: EmailData): Promise<boolean> {
    try {
      switch (this.provider) {
        case 'console':
          return this.sendToConsole(emailData)
        case 'resend':
          return this.sendWithResend(emailData)
        case 'sendgrid':
          return this.sendWithSendGrid(emailData)
        case 'nodemailer':
          return this.sendWithNodemailer(emailData)
        case 'gmail':
          return this.sendWithGmail(emailData)
        default:
          throw new Error(`Unsupported email provider: ${this.provider}`)
      }
    } catch (error) {
      console.error('Email service error:', error)
      return false
    }
  }

  private async sendToConsole(emailData: EmailData): Promise<boolean> {
    console.log('📧 Email would be sent:', {
      to: emailData.to,
      from: emailData.from,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      timestamp: new Date().toISOString(),
    })
    return true
  }

  private async sendWithResend(emailData: EmailData): Promise<boolean> {
    if (!this.apiKey) {
      throw new Error('Resend API key is required')
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailData.to,
        from: emailData.from,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Resend API error: ${error.message}`)
    }

    return true
  }

  private async sendWithSendGrid(emailData: EmailData): Promise<boolean> {
    if (!this.apiKey) {
      throw new Error('SendGrid API key is required')
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: emailData.to }],
          },
        ],
        from: { email: emailData.from },
        subject: emailData.subject,
        content: [
          {
            type: 'text/plain',
            value: emailData.text,
          },
          ...(emailData.html
            ? [
                {
                  type: 'text/html',
                  value: emailData.html,
                },
              ]
            : []),
        ],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`SendGrid API error: ${error.errors?.[0]?.message || 'Unknown error'}`)
    }

    return true
  }

  private async sendWithNodemailer(emailData: EmailData): Promise<boolean> {
    // This would require nodemailer to be installed and configured
    // For now, we'll just log the email data
    console.log('📧 Nodemailer email would be sent:', emailData)
    return true
  }

  private async sendWithGmail(emailData: EmailData): Promise<boolean> {
    if (!this.gmailConfig) {
      throw new Error('Gmail configuration is required')
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.gmailConfig.user,
        pass: this.gmailConfig.pass,
      },
    })

    // Send email
    const mailOptions = {
      from: emailData.from || this.gmailConfig.from || this.gmailConfig.user,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('📧 Gmail email sent successfully:', info.messageId)
    return true
  }
}

// Parse Gmail config from environment variables
const getGmailConfig = (): GmailConfig | undefined => {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_PASS
  const from = process.env.GMAIL_FROM

  if (!user || !pass) {
    return undefined
  }

  return {
    user,
    pass,
    from,
  }
}

// Create email service instance with current environment variables
const createEmailService = () => {
  return new EmailService(
    (process.env.EMAIL_PROVIDER as 'resend' | 'sendgrid' | 'nodemailer' | 'gmail' | 'console') ||
      'console',
    process.env.EMAIL_API_KEY,
    getGmailConfig(),
  )
}

// Default email service instance - lazy loaded
export const emailService = createEmailService()
