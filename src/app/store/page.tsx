'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  Card,
  CardContent,
  Button,
  Chip
} from '@mui/material';
import {
  Construction,
  Engineering,
  LocalShipping,
  Phone,
  Build,
  Handyman,
  ShoppingCart,
  Star,
  CheckCircle,
} from '@mui/icons-material';

// Intersection Observer Hook
const useScrollAnimations = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll, .zoom-in-on-scroll'
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default function StorePage() {
  useScrollAnimations();
  const theme = useTheme();

  const storeCategories = [
    {
      icon: <Construction sx={{ fontSize: 60 }} />,
      title: "Vật Liệu Xây Dựng",
      items: [
        "Xi măng - Thép - Gạch",
        "Cát - Đá - Sỏi",
        "Sơn - Chống thấm",
        "Cửa - Kính - Phụ kiện"
      ],
      color: "#ff5722",
      bgColor: "#fff3e0"
    },
    {
      icon: <Engineering sx={{ fontSize: 60 }} />,
      title: "Thiết Bị & Máy Móc",
      items: [
        "Máy móc xây dựng",
        "Thiết bị công trình",
        "Dụng cụ cầm tay",
        "Máy đo lường"
      ],
      color: "#ff9800",
      bgColor: "#fff8e1"
    },
    {
      icon: <LocalShipping sx={{ fontSize: 60 }} />,
      title: "Dịch Vụ Hỗ Trợ",
      items: [
        "Giao hàng tận nơi",
        "Lắp đặt thiết bị",
        "Tư vấn kỹ thuật",
        "Bảo trì & sửa chữa"
      ],
      color: "#4caf50",
      bgColor: "#e8f5e8"
    },
    {
      icon: <Phone sx={{ fontSize: 60 }} />,
      title: "Liên Hệ & Đặt Hàng",
      items: [
        "Hotline: 0939 927 975",
        "Hỗ trợ khách hàng 24/7",
        "Địa chỉ cửa hàng",
        "Giờ làm việc: 7:00 - 18:00"
      ],
      color: "#2196f3",
      bgColor: "#e3f2fd"
    }
  ];

  const featuredProducts = [
    {
      name: "Xi Măng PCB40",
      description: "Xi măng chất lượng cao, độ bền vượt trội",
      price: "Liên hệ",
      image: "/products/cement.jpg",
      rating: 5,
      inStock: true
    },
    {
      name: "Thép Hòa Phát",
      description: "Thép xây dựng chính hãng, đảm bảo chất lượng",
      price: "Liên hệ",
      image: "/products/steel.jpg",
      rating: 5,
      inStock: true
    },
    {
      name: "Gạch Đỏ Thường",
      description: "Gạch nung chất lượng cao, kích thước chuẩn",
      price: "Liên hệ",
      image: "/products/brick.jpg",
      rating: 4,
      inStock: true
    },
    {
      name: "Máy Trộn Bê Tông",
      description: "Máy trộn bê tông công suất lớn, hiệu quả cao",
      price: "Liên hệ",
      image: "/products/mixer.jpg",
      rating: 5,
      inStock: false
    }
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        {/* Header Section */}
        <section className="fade-in-on-scroll">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <Typography variant="h3" className="mb-6 font-bold text-gray-800">
              Cửa Hàng
              <span style={{ color: theme.palette.primary.main }}> Vật Liệu Xây Dựng</span>
            </Typography>
            <Typography variant="body1" className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chuyên cung cấp vật liệu xây dựng, thiết bị công trình và dịch vụ hỗ trợ chuyên nghiệp. 
              Cam kết chất lượng - Giá cả hợp lý - Dịch vụ tận tâm.
            </Typography>
          </div>
        </section>

        {/* Store Categories */}
        <section className="slide-in-left-on-scroll">
          <Typography 
            variant="h4" 
            className="text-center font-bold text-gray-800"
            sx={{ marginBottom: '3rem' }}
          >
            Danh Mục Sản Phẩm
          </Typography>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {storeCategories.map((category, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl backdrop-blur-lg border border-gray-200/50 transition-all duration-700 cursor-pointer zoom-in-on-scroll overflow-hidden"
                style={{
                  backgroundColor: category.bgColor,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 25px 80px ${category.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                }}
              >
                <div 
                  className="absolute top-4 right-4 w-16 h-16 rounded-full group-hover:scale-125 transition-transform duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${category.color}20, ${category.color}30)`
                  }}
                ></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div 
                      className="p-4 rounded-2xl mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `linear-gradient(to bottom right, ${category.color}15, ${category.color}25)`
                      }}
                    >
                      {React.cloneElement(category.icon, { style: { color: category.color } })}
                    </div>
                    <Typography variant="h5" className="font-bold text-gray-800">
                      {category.title}
                    </Typography>
                  </div>
                  
                  <div className="space-y-3 flex-grow">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle 
                          sx={{ 
                            fontSize: 20, 
                            color: category.color, 
                            mr: 2 
                          }} 
                        />
                        <Typography variant="body1" className="text-gray-700">
                          {item}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="slide-in-right-on-scroll">
          <Typography 
            variant="h4" 
            className="text-center font-bold text-gray-800"
            sx={{ marginBottom: '3rem' }}
          >
            Sản Phẩm Nổi Bật
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:shadow-xl"
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  }
                }}
              >
                <div 
                  className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute top-4 right-4">
                    {product.inStock ? (
                      <Chip 
                        label="Còn hàng" 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#4caf50', 
                          color: 'white',
                          fontWeight: 600
                        }} 
                      />
                    ) : (
                      <Chip 
                        label="Hết hàng" 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#f44336', 
                          color: 'white',
                          fontWeight: 600
                        }} 
                      />
                    )}
                  </div>
                  <div className="absolute top-4 left-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        sx={{
                          fontSize: 16,
                          color: i < product.rating ? '#ffc107' : '#e0e0e0'
                        }}
                      />
                    ))}
                  </div>
                </div>
                <CardContent className="p-6">
                  <Typography variant="h6" className="font-bold mb-2 text-gray-800">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </Typography>
                  <div className="flex justify-between items-center">
                    <Typography 
                      variant="h6" 
                      className="font-bold"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '20px',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        }
                      }}
                    >
                      Đặt hàng
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Store Information */}
        <section className="fade-in-on-scroll">
          <Typography 
            variant="h4" 
            className="text-center font-bold text-gray-800"
            sx={{ marginBottom: '3rem' }}
          >
            Thông Tin Cửa Hàng
          </Typography>
          <div className="grid md:grid-cols-2 gap-12">
            <Card 
              className="shadow-xl rounded-3xl"
              sx={{
                background: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Build 
                    sx={{ 
                      fontSize: 40, 
                      color: theme.palette.primary.main, 
                      mr: 2 
                    }} 
                  />
                  <Typography variant="h5" className="font-bold text-gray-800">
                    Lịch Sử & Phát Triển
                  </Typography>
                </div>
                <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                  Với hơn 10 năm kinh nghiệm trong lĩnh vực xây dựng, chúng tôi tự hào là đối tác 
                  tin cậy cung cấp vật liệu chất lượng cao cho mọi công trình.
                </Typography>
                <div className="space-y-3">
                  {[
                    "Đảm bảo chất lượng 100% sản phẩm",
                    "Giá cả cạnh tranh nhất thị trường",
                    "Tư vấn chuyên nghiệp từ đội ngũ kỹ sư",
                    "Dịch vụ giao hàng nhanh chóng, đúng hẹn"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle 
                        sx={{ 
                          fontSize: 20, 
                          color: theme.palette.primary.main, 
                          mr: 2 
                        }} 
                      />
                      <Typography variant="body1" className="text-gray-700">
                        {feature}
                      </Typography>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card 
              className="shadow-xl rounded-3xl"
              sx={{
                background: 'linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Handyman 
                    sx={{ 
                      fontSize: 40, 
                      color: theme.palette.secondary.main, 
                      mr: 2 
                    }} 
                  />
                  <Typography variant="h5" className="font-bold text-gray-800">
                    Dịch Vụ Khách Hàng
                  </Typography>
                </div>
                <Typography variant="body1" className="text-gray-600 mb-6 leading-relaxed">
                  Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời và hỗ trợ toàn diện 
                  cho mọi nhu cầu xây dựng của khách hàng.
                </Typography>
                <div className="space-y-3">
                  {[
                    "Tư vấn lựa chọn sản phẩm phù hợp",
                    "Hỗ trợ kỹ thuật chuyên sâu",
                    "Dịch vụ bảo hành & hậu mãi",
                    "Ưu đãi đặc biệt cho đơn hàng lớn"
                  ].map((service, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle 
                        sx={{ 
                          fontSize: 20, 
                          color: theme.palette.secondary.main, 
                          mr: 2 
                        }} 
                      />
                      <Typography variant="body1" className="text-gray-700">
                        {service}
                      </Typography>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Container>
    </Box>
  );
}
