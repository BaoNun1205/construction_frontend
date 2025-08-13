'use client';

import { useTheme } from '@mui/material';

export default function ContactPage() {
  const theme = useTheme();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Liên Hệ <span style={{ color: theme.palette.primary.main }}>Với Chúng Tôi</span>
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Gửi Tin Nhắn</h2>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Họ và Tên
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

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
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

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Số Điện Thoại
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

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Tin Nhắn
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
              Gửi Tin Nhắn
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Thông Tin Liên Hệ</h2>
          
          <div className="space-y-8">
            {/* Office Address */}
            <div>
              <h3 
                className="text-lg font-medium mb-3" 
                style={{ color: theme.palette.primary.main }}
              >
                Địa Chỉ Văn Phòng
              </h3>
              <p className="text-gray-600">
                Xã Vĩnh Lộc<br />
                Bình Chánh<br />
                Thành phố Hồ Chí Minh, Việt Nam
              </p>
            </div>

            {/* Contact Details */}
            <div>
              <h3 
                className="text-lg font-medium mb-3" 
                style={{ color: theme.palette.primary.main }}
              >
                Chi Tiết Liên Hệ
              </h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Điện thoại:</span> 0939 927 975</p>
                <p><span className="font-medium">Email:</span> info@laiphat.com</p>
                <p><span className="font-medium">Website:</span> www.laiphat.com</p>
              </div>
            </div>

            {/* Google Maps */}
            <div>
              <h3 
                className="text-lg font-medium mb-3" 
                style={{ color: theme.palette.primary.main }}
              >
                Bản Đồ Vị Trí
              </h3>
              <div className="h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125405.84815998306!2d106.36831!3d10.8411654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zVsSpbmggTOG7mWMsIELDrG5oIENoYW5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1703123456789!5m2!1svi!2s"
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
            <div>
              <h3 
                className="text-lg font-medium mb-3" 
                style={{ color: theme.palette.primary.main }}
              >
                Yêu Cầu Báo Giá
              </h3>
              <p className="text-gray-600 mb-4">
                Cần báo giá chi tiết? Điền vào biểu mẫu yêu cầu của chúng tôi.
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
                Mở Biểu Mẫu Yêu Cầu
              </button>
            </div>

            {/* Social Network */}
            <div>
              <h3 
                className="text-lg font-medium mb-3" 
                style={{ color: theme.palette.primary.main }}
              >
                Mạng Xã Hội
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
    </div>
  );
}
