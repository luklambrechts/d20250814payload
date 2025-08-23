# Email Setup for Call to Action Block

This document explains how to configure the email functionality for the Call to Action block.

## Overview

The Call to Action block now includes an optional email input field that can be enabled/disabled via a checkbox in the PayloadCMS admin. When enabled, users can submit their email address, which will be sent to `luk@lenoweb.be`.

## Features

- ✅ Toggle email field visibility via admin checkbox
- ✅ Customizable field label, placeholder, and button text
- ✅ Required/optional field configuration
- ✅ Email validation
- ✅ Loading states and error handling
- ✅ Success/error feedback to users
- ✅ Configurable email service integration

## Configuration

### Environment Variables

Add these environment variables to your `.env` file:

```env
# Email Provider (console, resend, sendgrid, nodemailer)
EMAIL_PROVIDER=console

# Email API Key (required for resend, sendgrid)
EMAIL_API_KEY=your_api_key_here

# From email address
EMAIL_FROM=noreply@yourdomain.com
```

### Email Providers

#### 1. Console (Default - Development)

For development and testing, emails are logged to the console:

```env
EMAIL_PROVIDER=console
```

#### 2. Resend

For production, we recommend using [Resend](https://resend.com):

```env
EMAIL_PROVIDER=resend
EMAIL_API_KEY=re_your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
```

#### 3. SendGrid

Alternative email service:

```env
EMAIL_PROVIDER=sendgrid
EMAIL_API_KEY=SG.your_sendgrid_api_key
EMAIL_FROM=noreply@yourdomain.com
```

#### 4. Nodemailer

For custom SMTP configuration:

```env
EMAIL_PROVIDER=nodemailer
EMAIL_FROM=noreply@yourdomain.com
```

## Usage in PayloadCMS Admin

1. Edit any page with a Call to Action block
2. In the Call to Action block settings:
   - Check "Show Email Input Field" to enable the email functionality
   - Configure the email field settings:
     - **Email Field Label**: The label shown above the input (default: "Email Address")
     - **Email Field Placeholder**: Placeholder text in the input (default: "Enter your email address")
     - **Send Button Text**: Text on the submit button (default: "Send")
     - **Required Field**: Whether the email field is required

## Frontend Behavior

When the email field is enabled:

1. Users see an email input field with the configured label and placeholder
2. Users enter their email address
3. Users click the "Send" button
4. The form submits to `/api/send-email`
5. An email is sent to `luk@lenoweb.be` with the submitted email address
6. Users receive success/error feedback

## API Endpoint

The email submission is handled by `/api/send-email` which:

- Validates the email format
- Sends the email using the configured provider
- Returns appropriate success/error responses
- Logs the submission for debugging

## Security Considerations

- Email validation is performed on both frontend and backend
- Rate limiting should be implemented for production use
- Consider adding CAPTCHA for spam prevention
- Ensure your email provider is properly configured for your domain

## Troubleshooting

### Emails not sending

1. Check environment variables are set correctly
2. Verify API keys are valid
3. Check server logs for error messages
4. Ensure your domain is verified with your email provider

### Frontend errors

1. Check browser console for JavaScript errors
2. Verify the API endpoint is accessible
3. Check network tab for failed requests

### Development testing

Use the `console` provider to see emails logged in your server console without actually sending them.
