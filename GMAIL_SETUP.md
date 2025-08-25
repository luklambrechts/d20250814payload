# Gmail SMTP Setup for PayloadCMS

This guide shows you how to configure Gmail SMTP to send emails from your PayloadCMS application.

## Quick Setup

### 1. Enable 2-Factor Authentication

First, you need to enable 2-Factor Authentication on your Google account:

1. Go to [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification**

### 2. Generate an App Password

1. Go to [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Scroll down and click **App passwords**
4. Select **Mail** as the app and **Other** as the device
5. Click **Generate**
6. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### 3. Configure Environment Variables

Add these environment variables to your `.env` file:

```env
# Email Provider
EMAIL_PROVIDER=gmail

# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-16-character-app-password
GMAIL_FROM=your-email@gmail.com
```

### 4. Test the Configuration

1. Start your development server: `npm run dev`
2. Go to a page with a Call to Action block
3. Enable the email field in the PayloadCMS admin
4. Submit an email through the form
5. Check your server logs for success/error messages

## Example Configuration

Here's a complete example of your `.env` file:

```env
# Database
DATABASE_URI=mongodb://localhost/payload-website-template

# Payload
PAYLOAD_SECRET=your-payload-secret-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Gmail SMTP Configuration
EMAIL_PROVIDER=gmail
GMAIL_USER=john.doe@gmail.com
GMAIL_PASS=abcd efgh ijkl mnop
GMAIL_FROM=john.doe@gmail.com

# Preview
PREVIEW_SECRET=your-preview-secret-here
```

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Verify that 2-Factor Authentication is enabled

2. **"Less secure app access" error**
   - Gmail no longer supports this feature
   - You must use App Passwords instead

3. **"Authentication failed" error**
   - Check that 2-Factor Authentication is enabled on your Google account
   - Verify the App Password is correct

4. **"Connection timeout" error**
   - Check your internet connection
   - Verify that your firewall isn't blocking SMTP connections

### Security Best Practices

- Never commit your `.env` file to version control
- Use App Passwords instead of your regular Gmail password
- Regularly rotate your App Passwords
- Consider using environment-specific configurations for development/production

## Production Considerations

For production use:

1. **Use a dedicated email address** for sending emails
2. **Set up proper SPF/DKIM records** for your domain
3. **Monitor email delivery rates**
4. **Implement rate limiting** to prevent abuse
5. **Consider using a transactional email service** like Resend or SendGrid for high-volume sending

## Alternative: Gmail API

If you prefer to use Gmail's API instead of SMTP:

1. Enable the Gmail API in Google Cloud Console
2. Create service account credentials
3. Use the Gmail API client library
4. This approach is more complex but offers better control and monitoring

## Support

If you encounter issues:

1. Check the server logs for detailed error messages
2. Verify your Gmail account settings
3. Test with a simple email client first
4. Consider using the `console` provider for debugging
