'use server'

import { emailService } from '@/utilities/emailService'

export async function sendEmailAction(formData: FormData) {
  const email = formData.get('email') as string

  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email address' }
  }

  try {
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
      return { success: false, message: 'Failed to send email' }
    }

    return { success: true, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, message: 'Internal server error' }
  }
}
