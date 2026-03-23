import { Box, Container, Paper, Skeleton, Stack } from '@mui/material'

const heroSkeletonSx = {
  bgcolor: 'rgba(255, 255, 255, 0.18)'
}

const lightSkeletonSx = {
  bgcolor: 'rgba(15, 23, 42, 0.08)'
}

function FilterFieldSkeleton() {
  return (
    <Stack spacing={1.25}>
      <Skeleton variant="text" width="38%" height={24} sx={heroSkeletonSx} />
      <Skeleton variant="rounded" width="100%" height={56} sx={heroSkeletonSx} />
    </Stack>
  )
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

function DetailInfoCardSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        border: '1px solid rgba(15, 23, 42, 0.08)',
        backgroundColor: 'rgba(255, 255, 255, 0.88)'
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <Skeleton variant="rounded" width={56} height={56} sx={lightSkeletonSx} />
        <Skeleton variant="text" width="46%" height={36} sx={lightSkeletonSx} />
      </Stack>

      <Stack spacing={1.5}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={`detail-row-${index}`}
            variant="rounded"
            width="100%"
            height={56}
            sx={lightSkeletonSx}
          />
        ))}
      </Stack>
    </Paper>
  )
}

export function ProjectsListPageSkeleton() {
  return (
    <Box className="min-h-screen">
      <Box
        sx={{
          color: 'white',
          pt: { xs: 12, md: 20 },
          pb: { xs: 8, md: 8 },
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(10, 24, 61, 0.98) 0%, rgba(14, 39, 92, 0.96) 100%)'
        }}
      >
        <Container sx={{ px: 4 }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Stack spacing={1.2} alignItems="center" sx={{ mb: 6 }}>
              <Skeleton variant="text" width="72%" height={48} sx={heroSkeletonSx} />
              <Skeleton variant="text" width="54%" height={58} sx={heroSkeletonSx} />
            </Stack>

            <Box
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRadius: 4,
                border: '1px solid rgba(255, 255, 255, 0.18)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(14px)'
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
                  gap: { xs: 2, md: 3 }
                }}
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <FilterFieldSkeleton key={`filter-skeleton-${index}`} />
                ))}
              </Box>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', sm: 'center' }}
                spacing={2}
                sx={{ mt: 4 }}
              >
                <Skeleton variant="text" width={220} height={28} sx={heroSkeletonSx} />
                <Skeleton variant="rounded" width={132} height={40} sx={heroSkeletonSx} />
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ px: { xs: 2, sm: 3 }, pt: 3, pb: 8 }}>
        <Skeleton variant="text" width={260} height={28} sx={lightSkeletonSx} />

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
    <Box className="min-h-screen">
      <Container className="py-16 space-y-20" sx={{ px: 4 }}>
        <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
          <Stack spacing={1.5} alignItems="center" sx={{ mb: 6 }}>
            <Skeleton variant="rounded" width={164} height={36} sx={lightSkeletonSx} />
            <Skeleton variant="text" width="66%" height={64} sx={lightSkeletonSx} />
            <Skeleton variant="text" width="54%" height={64} sx={{ ...lightSkeletonSx, mt: -1 }} />
            <Skeleton variant="text" width="72%" height={28} sx={lightSkeletonSx} />
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
              gap: 4
            }}
          >
            <DetailInfoCardSkeleton />
            <DetailInfoCardSkeleton />
          </Box>
        </Box>

        <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
          <Stack spacing={1.2} alignItems="center" sx={{ mb: 5 }}>
            <Skeleton variant="rounded" width={148} height={34} sx={lightSkeletonSx} />
            <Skeleton variant="text" width={320} height={48} sx={lightSkeletonSx} />
            <Skeleton variant="text" width={380} height={24} sx={lightSkeletonSx} />
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(3, minmax(0, 1fr))'
              },
              gap: 3
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={`media-skeleton-${index}`}
                variant="rounded"
                width="100%"
                height={256}
                sx={lightSkeletonSx}
              />
            ))}
          </Box>
        </Box>

        <Paper
          elevation={0}
          sx={{
            maxWidth: 1240,
            mx: 'auto',
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            border: '1px solid rgba(15, 23, 42, 0.08)'
          }}
        >
          <Skeleton variant="text" width={320} height={42} sx={lightSkeletonSx} />
          <Stack spacing={2} sx={{ mt: 2.5 }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={`detail-item-skeleton-${index}`}
                variant="rounded"
                width="100%"
                height={84}
                sx={lightSkeletonSx}
              />
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export function ProjectComingSoonPageSkeleton() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.24) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.24) 0%, transparent 50%)'
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
