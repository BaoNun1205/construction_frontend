import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Tất cả các trường là bắt buộc' },
        { status: 400 }
      )
    }

    // Call backend API
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role: 'USER' // Default role for new users
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Có lỗi xảy ra khi đăng ký' },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { message: 'Đăng ký thành công', user: data.user },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi đăng ký' },
      { status: 500 }
    )
  }
}