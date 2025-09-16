import { config } from 'dotenv'
import { EmailService } from './emailService'

// Load environment variables from .env file
config()

/**
 * Test script to verify email functionality
 * Run this with: npx tsx src/utilities/testEmail.ts
 */

async function testEmail() {
  console.log('🧪 Testing email functionality...')
  console.log('Email provider:', process.env.EMAIL_PROVIDER || 'console')

  if (process.env.EMAIL_PROVIDER === 'gmail') {
    console.log('Gmail user:', process.env.GMAIL_USER)
    console.log('Gmail from:', process.env.GMAIL_FROM)
    console.log('Gmail pass exists:', !!process.env.GMAIL_PASS)
  }

  // Create email service instance with current environment variables
  const emailService = new EmailService(
    (process.env.EMAIL_PROVIDER as 'resend' | 'sendgrid' | 'nodemailer' | 'gmail' | 'console') ||
      'console',
    process.env.EMAIL_API_KEY,
    process.env.EMAIL_PROVIDER === 'gmail'
      ? {
          user: process.env.GMAIL_USER!,
          pass: process.env.GMAIL_PASS!,
          from: process.env.GMAIL_FROM,
        }
      : undefined,
  )

  // Debug: Check if emailService is properly configured
  console.log(
    'Email service provider:',
    (emailService as unknown as { provider?: string }).provider,
  )

  try {
    const result = await emailService.send({
      to: 'test@example.com',
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      subject: 'Test Email from PayloadCMS',
      text: 'This is a test email to verify that the email service is working correctly.',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify that the email service is working correctly.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Provider:</strong> ${process.env.EMAIL_PROVIDER || 'console'}</p>
      `,
    })

    if (result) {
      console.log('✅ Email sent successfully!')
    } else {
      console.log('❌ Email failed to send')
    }
  } catch (error) {
    console.error('❌ Email test failed:', error)
  }
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testEmail()
}

export { testEmail }
