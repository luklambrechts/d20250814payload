# Homepage Form Setup

This document explains how the homepage contact form is configured to use the same email method as the contact page.

## Overview

The homepage now includes a contact form that uses the same email configuration as the contact page. Both forms use the Payload form builder plugin with the Gmail SMTP configuration defined in `payload.config.ts`.

## Configuration

### Email Setup

The email configuration is already set up in `src/payload.config.ts`:

```typescript
email: nodemailerAdapter({
  defaultFromAddress: process.env.GMAIL_USER!,
  defaultFromName: 'My Payload App',
  transportOptions: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, // App-wachtwoord
    },
  },
}),
```

### Environment Variables

Make sure these environment variables are set in your `.env` file:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
GMAIL_FROM=your-email@gmail.com
```

**Important**: For Gmail, you need to use an **App Password**, not your regular Gmail password. See the `GMAIL_SETUP.md` file for detailed instructions.

## Form Configuration

### Homepage Contact Form

The homepage contact form is defined in `src/endpoints/seed/homepage-contact-form.ts` and includes:

- **Fields**: Full Name, Email, Phone, Message
- **Email Recipient**: `luk@lenoweb.be`
- **Email Subject**: "New contact form submission from homepage"
- **Email Content**: Includes all form field values using template variables like `{{full-name}}`, `{{email}}`, etc.

### Form Integration

The form is integrated into the homepage through:

1. **Form Block**: Added to the homepage layout in `src/endpoints/seed/home.ts`
2. **Seed Data**: The form is created during database seeding in `src/endpoints/seed/index.ts`
3. **Form Builder Plugin**: Uses the Payload form builder plugin configured in `src/plugins/index.ts`

## How It Works

1. **Form Submission**: When a user submits the homepage form, it sends a POST request to `/api/form-submissions`
2. **Email Processing**: The form builder plugin processes the submission and sends emails based on the form configuration
3. **Gmail SMTP**: Emails are sent using the Gmail SMTP configuration from `payload.config.ts`
4. **Template Variables**: Form field values are automatically inserted into the email using template variables

## Template Variables

The form supports these template variables in email content:

- `{{full-name}}` - User's full name
- `{{email}}` - User's email address
- `{{phone}}` - User's phone number
- `{{message}}` - User's message
- `{{*}}` - All form data
- `{{*:table}}` - All form data formatted as HTML table

## Testing

To test the homepage form:

1. Start the development server: `pnpm dev`
2. Navigate to the homepage
3. Fill out and submit the contact form
4. Check your email at `luk@lenoweb.be`
5. Check server logs for any errors

## Troubleshooting

### Emails not sending

1. Verify Gmail credentials are correct
2. Ensure you're using an App Password, not your regular password
3. Check that 2-Factor Authentication is enabled on your Google account
4. Verify environment variables are set correctly

### Form not appearing

1. Run the seed command to create the form: `pnpm payload seed`
2. Check that the form is properly referenced in the homepage layout
3. Verify the form builder plugin is configured correctly

### Form submission errors

1. Check browser console for JavaScript errors
2. Check server logs for backend errors
3. Verify the form fields are configured correctly
4. Ensure the form has the correct ID and is properly linked

## Comparison with Call to Action Block

The homepage form uses the same email method as the contact page (Payload form builder plugin), while the Call to Action block uses a custom `emailService` utility. Both methods ultimately use the same Gmail SMTP configuration, but the form builder plugin provides more features like:

- Template variables
- Multiple email recipients
- CC/BCC support
- Rich text email content
- Form submission storage
- Admin interface for managing forms

## Files Modified

- `src/endpoints/seed/homepage-contact-form.ts` - New form definition
- `src/endpoints/seed/home.ts` - Updated to include form block
- `src/endpoints/seed/index.ts` - Updated to create the form
- `src/app/(frontend)/[slug]/page.tsx` - Removed old home-static reference
- `src/endpoints/seed/home-static.ts` - Deleted (replaced by home.ts)
