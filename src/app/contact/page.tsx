'use client';

import { useTheme, Box, Container } from '@mui/material';
import { useTranslations } from '@/hooks/useTranslations';
import { CONTACT } from '@/constants/contact';
import useScrollAnimations from '@/hooks/useScrollAnimations';

export default function ContactPage() {
  useScrollAnimations()
  const theme = useTheme();
  const { t } = useTranslations();
  
  return (
    <Box className="min-h-screen">
      <Container className="py-16 space-y-20" sx={{ px: { xs: 4, md: 0 } }}>
        <div className="fade-in-on">
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
              <div className="fade-in-on" style={{ animationDelay: '0.1s' }}>
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
              <div className="fade-in-on" style={{ animationDelay: '0.2s' }}>
                <h3 
                  className="text-lg font-medium mb-3" 
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.details.title') as string}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-medium">{t('contact.info.details.phone') as string}</span> {CONTACT.PHONE}</p>
                  <p><span className="font-medium">{t('contact.info.details.email') as string}</span> {CONTACT.EMAIL}</p>
                  <p><span className="font-medium">{t('contact.info.details.website') as string}</span> {CONTACT.WEBSITE}</p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="fade-in-on" style={{ animationDelay: '0.3s' }}>
                <h3 
                  className="text-lg font-medium mb-3" 
                  style={{ color: theme.palette.primary.main }}
                >
                  {t('contact.info.map.title') as string}
                </h3>
                <div className="h-64 rounded-lg overflow-hidden scale-in">
                  <iframe
                    src={CONTACT.MAP}
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
              <div className="fade-in-on" style={{ animationDelay: '0.4s' }}>
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
              <div className="fade-in-on" style={{ animationDelay: '0.5s' }}>
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
