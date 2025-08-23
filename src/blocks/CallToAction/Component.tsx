'use client'
import React, { useState } from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !emailField?.required) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
      } else {
        const errorData = await response.json()
        setSubmitStatus('error')
        setErrorMessage(errorData.message || 'Failed to send email')
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
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <div>
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
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={emailField.placeholder}
                  required={emailField.required}
                  disabled={isSubmitting}
                  className="mt-2"
                  size={emailField.size?.width || 40}
                  maxLength={emailField.size?.maxLength || 254}
                  style={{
                    width: `${(emailField.size?.width || 40) * 0.6}em`,
                  }}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || (emailField.required && !email)}
                size="lg"
              >
                {isSubmitting ? 'Sending...' : emailField.buttonText}
              </Button>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-sm">Email sent successfully!</p>
              )}
              {submitStatus === 'error' && <p className="text-red-600 text-sm">{errorMessage}</p>}
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
