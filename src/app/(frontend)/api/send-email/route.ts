import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/utilities/emailService'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 })
    }

    // Send email using the email service
    const success = await emailService.send({
      to: 'luk@lenoweb.be',
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
      subject: 'New email submission from Call to Action block',
      text: `A new email submission was received from: ${email}`,
      html: `
        <h2>New Email Submission</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Source:</strong> Call to Action block on website</p>
      `,
    })

    if (!success) {
      return NextResponse.json({ message: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
