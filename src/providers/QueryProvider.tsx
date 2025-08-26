"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache data for 24 hours (data changes infrequently)
            staleTime: 24 * 60 * 60 * 1000,  // 24h
            // Keep data in memory for 25 hours
            gcTime: 25 * 60 * 60 * 1000,     // 25h

            // No need to retry multiple times since data is not real-time critical
            retry: 1,
            retryDelay: 3000,  // 3 seconds

            // Disable refetch on window focus and reconnect (static data)
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,

            // Disable refetch when the component mounts
            refetchOnMount: true, // Always call API when mount
          },
          mutations: {
            // Retry mutation once if it fails
            retry: 1,
            retryDelay: 3000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query Devtools only in development mode */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      )}
    </QueryClientProvider>
  )
}
