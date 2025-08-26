import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

// Personal email domains that are not allowed
const PERSONAL_EMAIL_DOMAINS = [
  'outlook.com',
  'live.com',
  'hotmail.com',
  'skynet.be',
  'proximus.be',
  'telenet.be',
]

// Custom validation function
const validateCompanyEmail = (value: string) => {
  if (!value) return true // Let required validation handle empty values

  const emailRegex = /^\S[^\s@]*@\S+$/
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address'
  }

  const domain = value.split('@')[1]?.toLowerCase()
  if (domain && PERSONAL_EMAIL_DOMAINS.includes(domain)) {
    return 'This is not a company email-address, please use your professional email-adress'
  }

  return true
}

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="required">
            * <span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, {
          validate: validateCompanyEmail,
          required: required ? 'This field is required' : false,
        })}
      />

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
