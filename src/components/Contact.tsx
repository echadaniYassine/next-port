"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { SectionDecorator } from "./SectionDecorator"
import { useTranslation } from '../lib/i18n/client'
import { type Language } from '../lib/i18n-config'
import contactData from '../data/contact/contactData.json'

const { contactInfo: CONTACT_INFO, socialLinks: SOCIAL_LINKS } = contactData

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type SubmitStatus = "idle" | "submitting" | "success" | "error"

interface ContactProps {
  locale: Language
}

export default function Contact({ locale }: ContactProps) {
  const { t } = useTranslation(locale, 'common')
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [isVisible, setIsVisible] = useState(false)
  const contactRef = useRef<HTMLElement>(null)

  const getColorClasses = useCallback((color: "blue" | "green" | "purple") => {
    const colorMap = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    }
    return colorMap[color]
  }, [])

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.errors.nameMinLength')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid')
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.errors.subjectRequired')
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = t('contact.errors.subjectMinLength')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.errors.messageMinLength')
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = t('contact.errors.messageMaxLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, t])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) {
        return
      }

      setSubmitStatus("submitting")

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log("Form submitted:", formData)
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setErrors({})

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 5000)
      } catch (error) {
        console.error("Form submission error:", error)
        setSubmitStatus("error")

        // Reset error message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 5000)
      }
    },
    [formData, validateForm],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: "" }))
      }
    },
    [errors],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
    )

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={contactRef} className="relative py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('contact.title')}
              </h2>
              <div className="w-24 h-1 mx-auto animate-gradient-x10" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div
            className={`lg:col-span-1 space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('contact.letsConnect')}
              </h3>
              <p className="text-muted-foreground mb-8">
                {t('contact.description')}
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {CONTACT_INFO.map((info, index) => (
                <a
                  key={info.title}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center p-4 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-border group
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  aria-label={`${t('nav.contact')} via ${t(`contact.contactInfo.${info.title.toLowerCase()}`)}: ${info.value}`}
                >
                  <div
                    className={`p-3 rounded-lg ${getColorClasses(info.color as "blue" | "green" | "purple")} group-hover:scale-110 transition-transform duration-200`}
                    dangerouslySetInnerHTML={{ __html: info.icon }}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-foreground">
                      {t(`contact.contactInfo.${info.title.toLowerCase()}`)}
                    </h4>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                {t('contact.followMe')}
              </h4>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      p-3 bg-card rounded-lg shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-110 border border-border text-muted-foreground hover:text-primary
                      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                    `}
                    aria-label={`${t('contact.followMe')} ${social.name}`}
                    dangerouslySetInnerHTML={{ __html: social.icon }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            <div className="bg-card p-8 rounded-2xl shadow-2xl border border-border">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Success/Error Messages */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-800 dark:text-green-400 font-medium">
                        {t('contact.messages.success')}
                      </span>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-600 dark:text-red-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-red-800 dark:text-red-400 font-medium">
                        {t('contact.messages.error')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                      {t('contact.form.fullName')} <span className="text-red-500">{t('contact.form.required')}</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`
                        w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-background text-foreground placeholder-muted-foreground
                        ${errors.name ? "border-red-500 dark:border-red-400" : "border-border hover:border-border/80"}
                      `}
                      placeholder={t('contact.form.placeholders.name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                      {t('contact.form.emailAddress')} <span className="text-red-500">{t('contact.form.required')}</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`
                        w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-background text-foreground placeholder-muted-foreground
                        ${errors.email ? "border-red-500 dark:border-red-400" : "border-border hover:border-border/80"}
                      `}
                      placeholder={t('contact.form.placeholders.email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
                    {t('contact.form.subject')} <span className="text-red-500">{t('contact.form.required')}</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`
                      w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-background text-foreground placeholder-muted-foreground
                      ${errors.subject ? "border-red-500 dark:border-red-400" : "border-border hover:border-border/80"}
                    `}
                    placeholder={t('contact.form.placeholders.subject')}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                    {t('contact.form.message')} <span className="text-red-500">{t('contact.form.required')}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`
                      w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-background text-foreground placeholder-muted-foreground resize-vertical
                      ${errors.message ? "border-red-500 dark:border-red-400" : "border-border hover:border-border/80"}
                    `}
                    placeholder={t('contact.form.placeholders.message')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : "message-help"}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                      {errors.message}
                    </p>
                  )}
                  <p id="message-help" className="mt-1 text-xs text-muted-foreground">
                    {formData.message.length}/1000 {t('contact.form.charactersCount')}
                  </p>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-primary/30"
                    aria-label={submitStatus === "submitting" ? "Sending message..." : "Send message"}
                  >
                    {submitStatus === "submitting" ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>

                        <span>{t('contact.form.sendMessageRealTime')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.form.sendMessage')}</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {/* Additional Info */}
                <div className="text-center text-sm text-muted-foreground">
                  <p>{t('contact.form.responseTime')}</p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <SectionDecorator variant="hero">
            <div className="bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('contact.directApproach.title')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('contact.directApproach.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:yassinechadani113@gmail.com"
                  className="inline-flex items-center px-6 py-3 bg-card text-foreground font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 border border-border focus:outline-none focus:ring-4 focus:ring-primary/30"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {t('contact.directApproach.sendMessage')}
                </a>

                <a
                  href="tel:+212601714706"
                  className="inline-flex items-center px-6 py-3 bg-card text-foreground font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 border border-border focus:outline-none focus:ring-4 focus:ring-primary/30"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {t('contact.directApproach.callMe')}
                </a>
              </div>
            </div>
          </SectionDecorator>
        </div>
      </div>
    </section>
  )
}