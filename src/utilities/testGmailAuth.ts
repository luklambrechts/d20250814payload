import { config } from 'dotenv'
import nodemailer from 'nodemailer'

// Load environment variables from .env file
config()

/**
 * Test Gmail authentication
 * Run this with: npx tsx src/utilities/testGmailAuth.ts
 */

async function testGmailAuth() {
  console.log('🧪 Testing Gmail authentication...')

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_PASS

  if (!user || !pass) {
    console.error('❌ Gmail credentials not found in environment variables')
    console.log('Make sure GMAIL_USER and GMAIL_PASS are set in your .env file')
    return
  }

  console.log('Gmail user:', user)
  console.log('Gmail pass length:', pass.length)
  console.log('Gmail pass starts with:', pass.substring(0, 4) + '...')

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    })

    // Verify connection
    console.log('🔐 Verifying Gmail connection...')
    await transporter.verify()
    console.log('✅ Gmail authentication successful!')

    // Test sending a simple email
    console.log('📧 Testing email sending...')
    const info = await transporter.sendMail({
      from: user,
      to: user, // Send to yourself for testing
      subject: 'Gmail SMTP Test',
      text: 'This is a test email to verify Gmail SMTP is working correctly.',
      html: '<h2>Gmail SMTP Test</h2><p>This is a test email to verify Gmail SMTP is working correctly.</p>',
    })

    console.log('✅ Test email sent successfully!')
    console.log('Message ID:', info.messageId)
  } catch (error) {
    console.error('❌ Gmail authentication failed:', error)

    if (error && typeof error === 'object' && 'code' in error && error.code === 'EAUTH') {
      console.log('\n🔧 Troubleshooting tips:')
      console.log('1. Make sure 2-Factor Authentication is enabled on your Google account')
      console.log('2. Generate a new App Password:')
      console.log('   - Go to https://myaccount.google.com/')
      console.log('   - Security → 2-Step Verification → App passwords')
      console.log('   - Select "Mail" and generate a new password')
      console.log("3. Make sure you're using the App Password, not your regular Gmail password")
      console.log(
        '4. Check that your Gmail account allows "less secure app access" (though this is deprecated)',
      )
    }
  }
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testGmailAuth()
}

export { testGmailAuth }
