import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000'
          const LOGIN_URL = `${API_BASE}/api/v1/auth/login`

          const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })

          const text = await response.text()
          let data: any
          try {
            data = JSON.parse(text)
          } catch {
            data = { raw: text }
          }

          if (!response.ok) {
            return null
          }

          const payload = data?.data ?? data

          if (payload && payload.user && (payload.access_token || payload.accessToken)) {
            return {
              id: payload.user.id || payload.user._id,
              email: payload.user.email,
              name: payload.user.name || payload.user.username,
              role: payload.user.role,
              accessToken: payload.access_token || payload.accessToken,
              refreshToken: payload.refresh_token || payload.refreshToken
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.sub = user.id
        token.role = user.role
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
      }
      return session
    }
  },
  pages: {
    signIn: '/auth'
  }
}

export default authOptions
