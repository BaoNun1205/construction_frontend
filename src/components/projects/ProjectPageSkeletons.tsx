import { Box, Container, Paper, Skeleton, Stack } from '@mui/material'
import { BRAND_COLORS } from '@/constants/colors'

const lightSkeletonSx = {
  bgcolor: 'rgba(15, 23, 42, 0.08)'
}


function ProjectCardSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: { xs: 2, md: 4 },
        overflow: 'hidden',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 20px 36px rgba(15, 23, 42, 0.08)'
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={220} sx={lightSkeletonSx} />
      <Box sx={{ p: { xs: 1.5, md: 3 } }}>
        <Skeleton variant="text" width="82%" height={34} sx={lightSkeletonSx} />
        <Skeleton variant="text" width="68%" height={34} sx={{ ...lightSkeletonSx, mt: -0.5 }} />
        <Skeleton variant="text" width="100%" height={22} sx={{ ...lightSkeletonSx, mt: 1.25 }} />
        <Skeleton variant="text" width="88%" height={22} sx={lightSkeletonSx} />
        <Skeleton variant="text" width="56%" height={18} sx={{ ...lightSkeletonSx, mt: 1.5 }} />
        <Box sx={{ mt: 2.25, pt: 2.25, borderTop: '1px solid rgba(15, 23, 42, 0.08)' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Skeleton variant="text" width={112} height={22} sx={lightSkeletonSx} />
            <Skeleton variant="circular" width={22} height={22} sx={lightSkeletonSx} />
          </Stack>
        </Box>
      </Box>
    </Paper>
  )
}

export function ProjectsListPageSkeleton() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND_COLORS.neutral.background, overflowX: 'hidden', width: '100%', pb: 10 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2.5, md: 4 } }}>
        {/* Top Control Bar Skeleton */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Skeleton variant="text" width={200} height={24} sx={lightSkeletonSx} />
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' }, justifyContent: 'flex-end' }}>
            <Skeleton variant="rounded" width={220} height={38} sx={{ ...lightSkeletonSx, borderRadius: 2.5 }} />
            <Skeleton variant="rounded" width={90} height={38} sx={{ ...lightSkeletonSx, borderRadius: 2.5 }} />
          </Stack>
        </Stack>

        <Box
          sx={{
            mt: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))'
            },
            gap: { xs: 1.5, md: 4 }
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={`project-card-skeleton-${index}`} />
          ))}
        </Box>

        <Stack direction="row" justifyContent="center" spacing={1.25} sx={{ mt: 5 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={`pagination-skeleton-${index}`}
              variant="rounded"
              width={40}
              height={40}
              sx={lightSkeletonSx}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export function ProjectDetailPageSkeleton() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND_COLORS.neutral.background, overflowX: 'hidden', width: '100%', pb: 10 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2.5, md: 3.5 } }}>
        {/* Top Hero Side-by-side Card Skeleton */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            border: '1px solid rgba(15, 23, 42, 0.08)',
            mb: 3
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
              gap: 3,
              alignItems: 'start'
            }}
          >
            {/* Left: Compact Image Skeleton */}
            <Box>
              <Skeleton
                variant="rounded"
                width="100%"
                height={320}
                sx={{ ...lightSkeletonSx, borderRadius: 3 }}
              />
              <Stack direction="row" spacing={1} sx={{ mt: 1.5, overflow: 'hidden' }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rounded"
                    width={68}
                    height={44}
                    sx={{ ...lightSkeletonSx, borderRadius: 2 }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Right: Info, Specs, CTA Skeleton */}
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Skeleton variant="rounded" width={90} height={22} sx={lightSkeletonSx} />
                <Skeleton variant="rounded" width={110} height={22} sx={lightSkeletonSx} />
              </Stack>
              <Skeleton variant="text" width="90%" height={34} sx={lightSkeletonSx} />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 1.5,
                  p: 1.5,
                  bgcolor: 'rgba(15, 23, 42, 0.03)',
                  borderRadius: 3
                }}
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} variant="rounded" width="100%" height={38} sx={lightSkeletonSx} />
                ))}
              </Box>

              <Skeleton variant="text" width="100%" height={18} sx={lightSkeletonSx} />

              <Box sx={{ pt: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
                <Skeleton variant="rounded" width={140} height={34} sx={{ ...lightSkeletonSx, borderRadius: 3 }} />
              </Box>
            </Stack>
          </Box>
        </Paper>

        {/* 2-Column Grid Skeleton */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '8fr 4fr' },
            gap: 3,
            alignItems: 'start'
          }}
        >
          {/* Main Left Column */}
          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 4,
                border: '1px solid rgba(15, 23, 42, 0.08)'
              }}
            >
              <Skeleton variant="text" width="50%" height={26} sx={lightSkeletonSx} />
              <Stack spacing={1.5} sx={{ mt: 2 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} variant="rounded" width="100%" height={42} sx={lightSkeletonSx} />
                ))}
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                borderRadius: 4,
                border: '1px solid rgba(15, 23, 42, 0.08)'
              }}
            >
              <Skeleton variant="text" width="40%" height={26} sx={lightSkeletonSx} />
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, mt: 2 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} variant="rounded" width="100%" height={100} sx={lightSkeletonSx} />
                ))}
              </Box>
            </Paper>
          </Stack>

          {/* Right Sidebar */}
          <Stack spacing={2.5}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 4,
                border: '1px solid rgba(15, 23, 42, 0.08)'
              }}
            >
              <Skeleton variant="text" width="60%" height={22} sx={lightSkeletonSx} />
              <Skeleton variant="text" width="100%" height={18} sx={{ ...lightSkeletonSx, mt: 1 }} />
              <Skeleton variant="rounded" width="100%" height={36} sx={{ ...lightSkeletonSx, mt: 2 }} />
            </Paper>

            <Skeleton
              variant="rounded"
              width="100%"
              height={140}
              sx={{ ...lightSkeletonSx, borderRadius: 4 }}
            />
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export function ProjectComingSoonPageSkeleton() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${BRAND_COLORS.primary.dark} 0%, ${BRAND_COLORS.primary.main} 60%, ${BRAND_COLORS.primary.light} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            `radial-gradient(circle at 20% 50%, ${BRAND_COLORS.secondary.main}20 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${BRAND_COLORS.secondary.dark}15 0%, transparent 50%)`
        }}
      />

      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Skeleton variant="circular" width={88} height={88} sx={lightSkeletonSx} />
            <Skeleton variant="text" width="48%" height={56} sx={lightSkeletonSx} />
            <Skeleton variant="text" width="82%" height={30} sx={lightSkeletonSx} />
          </Stack>

          <Box sx={{ mt: 4 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1.2 }}>
              <Skeleton variant="text" width={128} height={24} sx={lightSkeletonSx} />
              <Skeleton variant="text" width={48} height={24} sx={lightSkeletonSx} />
            </Stack>
            <Skeleton variant="rounded" width="100%" height={10} sx={lightSkeletonSx} />
          </Box>

          <Box sx={{ mt: 4 }}>
            <Skeleton variant="text" width={172} height={30} sx={lightSkeletonSx} />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.2}
              justifyContent="center"
              flexWrap="wrap"
              useFlexGap
              sx={{ mt: 2 }}
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={`coming-soon-chip-${index}`}
                  variant="rounded"
                  width={150}
                  height={34}
                  sx={lightSkeletonSx}
                />
              ))}
            </Stack>
          </Box>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Skeleton variant="rounded" width={180} height={48} sx={lightSkeletonSx} />
            <Skeleton variant="rounded" width={180} height={48} sx={lightSkeletonSx} />
          </Stack>

          <Stack alignItems="center" sx={{ mt: 4 }}>
            <Skeleton variant="text" width="62%" height={24} sx={lightSkeletonSx} />
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
