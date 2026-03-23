'use client'

import Link from 'next/link'
import { ArrowOutward } from '@mui/icons-material'
import { Box, Typography, useTheme } from '@mui/material'

interface ServiceKeywordLinkItem {
  href: string
  label: string
  description: string
}

interface ServiceKeywordLinksProps {
  id?: string
  title: string
  description: string
  links: ServiceKeywordLinkItem[]
}

export default function ServiceKeywordLinks({
  id,
  title,
  description,
  links
}: ServiceKeywordLinksProps) {
  const theme = useTheme()

  return (
    <section id={id} className="fade-in-up">
      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          borderRadius: 4,
          p: { xs: 3, md: 4 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.light}14 100%)`,
          border: `1px solid ${theme.palette.primary.main}18`
        }}
      >
        <Typography
          component="h2"
          variant="h3"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: theme.palette.primary.main,
            fontSize: { xs: '1.75rem', md: '2.125rem' }
          }}
        >
          {title}
        </Typography>

        <Typography
          component="p"
          sx={{
            mb: 3,
            maxWidth: 840,
            lineHeight: 1.8,
            color: theme.palette.text.secondary
          }}
        >
          {description}
        </Typography>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((link) => (
            <Box
              key={link.href}
              component={Link}
              href={link.href}
              sx={{
                display: 'block',
                height: '100%',
                borderRadius: 3,
                p: 3,
                textDecoration: 'none',
                backgroundColor: 'white',
                border: `1px solid ${theme.palette.primary.main}14`,
                boxShadow: '0 14px 32px rgba(15, 23, 42, 0.06)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: `${theme.palette.primary.main}40`,
                  boxShadow: '0 18px 36px rgba(15, 23, 42, 0.12)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      color: theme.palette.text.primary
                    }}
                  >
                    {link.label}
                  </Typography>

                  <Typography
                    component="p"
                    sx={{
                      lineHeight: 1.7,
                      color: theme.palette.text.secondary
                    }}
                  >
                    {link.description}
                  </Typography>
                </Box>

                <ArrowOutward sx={{ color: theme.palette.primary.main, flexShrink: 0 }} />
              </Box>
            </Box>
          ))}
        </div>
      </Box>
    </section>
  )
}
