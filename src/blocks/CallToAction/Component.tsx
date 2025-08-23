'use client'
import React, { useState } from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sendEmailAction } from './actions'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  showEmailField,
  emailField,
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmailSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const result = await sendEmailAction(formData)

      if (result.success) {
        setSubmitStatus('success')
        setEmail('')
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.message || 'Failed to send email')
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('Network error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {showEmailField && emailField && (
            <form action={handleEmailSubmit} className="flex flex-col gap-4 w-full md:w-auto">
              <div className="w-full md:w-auto">
                <Label htmlFor="email">
                  {emailField.label}
                  {emailField.required && (
                    <span className="required">
                      * <span className="sr-only">(required)</span>
                    </span>
                  )}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailField.placeholder || undefined}
                  required={emailField.required || false}
                  disabled={isSubmitting}
                  className="mt-2 w-full"
                  size={emailField.size?.width || 40}
                  maxLength={emailField.size?.maxLength || 254}
                />
              </div>
              <div className="w-full flex justify-center md:justify-start">
                <Button
                  type="submit"
                  disabled={isSubmitting || ((emailField.required || false) && !email)}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? 'Sending...' : emailField.buttonText}
                </Button>
              </div>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm text-center md:text-left">
                  Email sent successfully!
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-sm text-center md:text-left">{errorMessage}</p>
              )}
            </form>
          )}
          {links && links.length > 0 && (
            <>
              {links.map(({ link }, i) => {
                return <CMSLink key={i} size="lg" {...link} />
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
