'use client';

import { useTheme, Box, Container } from '@mui/material';
import { useTranslations } from '@/hooks/useTranslations';
import { useEffect } from 'react';

// Intersection Observer Hook for animations
const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".fade-in-up, .slide-in-left, .slide-in-right, .scale-in")

    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export default function ContactPage() {
  useScrollAnimations()
  const theme = useTheme();
  const { t } = useTranslations();
  
  return (
    <Box className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        <div className="fade-in-up">
          <h1 className="text-3xl font-bold mb-8">
            {t('contact.title') as string} <span style={{ color: theme.palette.primary.main }}>{t('contact.titleHighlight') as string}</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="slide-in-left">
            <h2 className="text-2xl font-semibold mb-6">{t('contact.form.title') as string}</h2>
            
            <form className="space-y-6">
              <div className="scale-in" style={{ animationDelay: '0.1s' }}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.name') as string}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    '--tw-ring-color': theme.palette.primary.main + '80'
                  } as React.CSSProperties}
                  required
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.2s' }}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.email') as string}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    '--tw-ring-color': theme.palette.primary.main + '80'
                  } as React.CSSProperties}
                  required
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.phone') as string}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    '--tw-ring-color': theme.palette.primary.main + '80'
                  } as React.CSSProperties}
                  required
                />
              </div>

              <div className="scale-in" style={{ animationDelay: '0.4s' }}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.message') as string}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  style={{ 
                    '--tw-ring-color': theme.palette.primary.main + '80'
                  } as React.CSSProperties}
                  required
                ></textarea>
              </div>

              <div className="scale-in" style={{ animationDelay: '0.5s' }}>
                <button
                  type="submit"
                  className="w-full text-white py-2 px-4 rounded-md transition duration-200"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary.dark;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary.main;
                  }}
                >
                  {t('contact.form.submit') as string}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="slide-in-right">
            <h2 className="text-2xl font-semibold mb-6">{t('contact.info.title') as string}</h2>
            
            <div className="space-y-8">
              {/* Office Address */}
              <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h3 
                  className="text-lg font-medium mb-3" 
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.office.title') as string}
                </h3>
                <p className="text-gray-600">
                  {(t('contact.info.office.address') as string).split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < 2 && <br />}
                    </span>
                  ))}
                </p>
              </div>

              {/* Contact Details */}
              <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 
                  className="text-lg font-medium mb-3" 
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.details.title') as string}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">{t('contact.info.details.phone') as string}</span> 0939 927 975</p>
                  <p><span className="font-medium">{t('contact.info.details.email') as string}</span> info@laiphat.com</p>
                  <p><span className="font-medium">{t('contact.info.details.website') as string}</span> www.laiphat.com</p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h3 
                  className="text-lg font-medium mb-3" 
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.map.title') as string}
                </h3>
                <div className="h-64 rounded-lg overflow-hidden scale-in">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.930734343721!2d106.59657268382686!3d10.816612761834651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b000c32be51%3A0x9a1fd70ab25f4d6a!2zVHLhuqFtIFRodSBwaMOtIE5nw6MgdMawIEfDsiBNw6J5!5e0!3m2!1svi!2s!4v1755701915303!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bản đồ Vĩnh Lộc, TP Hồ Chí Minh"
                  />
                </div>
              </div>

              {/* Request Form */}
              <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                <h3 
                  className="text-lg font-medium mb-3" 
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.quote.title') as string}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('contact.info.quote.description') as string}
                </p>
                <button 
                  className="text-white px-6 py-2 rounded-md transition duration-200"
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary.dark;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.palette.primary.main;
                  }}
                >
                  {t('contact.info.quote.button') as string}
                </button>
              </div>

              {/* Social Network */}
              <div className="fade-in-up" style={{ animationDelay: '0.5s' }}>
                <h3 
                  className="text-lg font-medium mb-3" 
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.social.title') as string}
                </h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="hover:underline transition duration-200"
                    style={{ color: theme.palette.primary.main }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.palette.primary.dark;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.palette.primary.main;
                    }}
                  >
                    Facebook
                  </a>
                  <a 
                    href="#" 
                    className="hover:underline transition duration-200"
                    style={{ color: theme.palette.primary.main }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.palette.primary.dark;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.palette.primary.main;
                    }}
                  >
                    Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
