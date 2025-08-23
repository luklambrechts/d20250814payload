// Email service utility for sending emails
// This file provides a simple interface that can be integrated with various email providers

export interface EmailData {
  to: string
  from: string
  subject: string
  text: string
  html?: string
}

export class EmailService {
  private apiKey?: string
  private provider: 'resend' | 'sendgrid' | 'nodemailer' | 'console'

  constructor(
    provider: 'resend' | 'sendgrid' | 'nodemailer' | 'console' = 'console',
    apiKey?: string,
  ) {
    this.provider = provider
    this.apiKey = apiKey
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
}

// Default email service instance
export const emailService = new EmailService(
  (process.env.EMAIL_PROVIDER as 'resend' | 'sendgrid' | 'nodemailer' | 'console') || 'console',
  process.env.EMAIL_API_KEY,
)
