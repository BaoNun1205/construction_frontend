import { Skeleton, Box, Container } from '@mui/material'
import { BRAND_COLORS } from '@/constants/colors'

export default function Loading() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND_COLORS.neutral.background, pb: 12 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <div className="mb-4 flex items-center justify-between">
          <Skeleton variant="rectangular" width={180} height={36} className="rounded-xl" />
          <Skeleton variant="rectangular" width={100} height={36} className="rounded-xl" />
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
          <Skeleton variant="rectangular" height={380} className="w-full" />
          <div className="p-6 sm:p-8 space-y-6">
            <Skeleton variant="text" width="60%" height={32} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="rectangular" height={60} className="rounded-xl" />
              ))}
            </div>
            <Skeleton variant="rectangular" height={80} className="rounded-2xl" />
            <Skeleton variant="text" height={100} />
          </div>
        </div>
      </Container>
    </Box>
  )
}
