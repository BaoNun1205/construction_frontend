/**
 * HỆ THỐNG MÀU CHUẨN (DESIGN TOKENS)
 * 
 * Lưu ý:
 * - Màu chủ đạo (Primary): #001137 (Màu nền của Header)
 * - Màu điểm nhấn (Accent/Secondary): #3cb8e0 (Màu đường viền đáy Header khi cuộn)
 * - Tuyệt đối KHÔNG viết mã màu hex trực tiếp trong component.
 * - Hãy dùng BRAND_COLORS hoặc các Tailwind class tương ứng:
 *   + bg-brand-primary / hover:bg-brand-primary-light / text-brand-primary
 *   + bg-brand-accent / text-brand-accent / bg-brand-accent-light / text-brand-accent-dark
 */

export const BRAND_COLORS = {
  // Màu chính (Header Background & Core Brand)
  primary: {
    main: '#001137',
    light: '#002266',
    dark: '#000825',
    surface: '#f0f4f9',
    contrastText: '#ffffff',
  },

  // Màu phụ / Điểm nhấn (Header bottom border & hover)
  secondary: {
    main: '#3cb8e0',     // Màu xanh điểm nhấn chính (Header bottom border)
    light: '#3cb8e0',    // Màu xanh sáng cho borderBottom header và hover
    hover: '#58d0f5',    // Màu xanh cyan sáng khi hover
    dark: '#0284c7',     // Màu chữ / icon tương phản cao trên nền sáng
    surface: '#f0f9ff',  // Nền sáng nhạt cho icon/badge
    border: '#bae6fd',   // Viền sáng
    contrastText: '#ffffff',
  },

  // Màu trung tính
  neutral: {
    background: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    borderSubtle: '#f1f5f9',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
  },

  // Màu trạng thái nghiệp vụ (Chỉ dùng cho tag trạng thái dự án / thông báo)
  status: {
    success: '#059669',
    successLight: '#ecfdf5',
    inProgress: '#d97706',
    inProgressLight: '#fffbeb',
    error: '#dc2626',
    errorLight: '#fef2f2',
  },
} as const;

export type BrandColors = typeof BRAND_COLORS;
export default BRAND_COLORS;
