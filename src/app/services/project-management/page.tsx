"use client"

import useScrollAnimations from "@/hooks/useScrollAnimations";
import { 
  GroupOutlined,
  SecurityOutlined,
  ScheduleOutlined,
  VerifiedUserOutlined,
  MonetizationOnOutlined,
  RequestQuoteOutlined,
  CampaignOutlined,
  Diversity3Outlined,
  HubOutlined,
  ReportOutlined,
  CompostOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
  TrackChangesOutlined
} from "@mui/icons-material"
import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material"

const projectData = {
  "Mục tiêu": [
    {
      name: "Quản lý phạm vi",
      description: "Xác định và kiểm soát các hạng mục công việc trong phạm vi dự án.",
      icon: TrackChangesOutlined,
    },
    {
      name: "Quản lý thời gian",
      description: "Lập tiến độ, theo dõi và giám sát các mốc thời gian quan trọng.",
      icon: ScheduleOutlined,
    },
    {
      name: "Quản lý chi phí",
      description: "Lập dự toán, kiểm soát và tối ưu chi phí trong quá trình thi công.",
      icon: RequestQuoteOutlined,
    },
    {
      name: "Quản lý chất lượng",
      description: "Đảm bảo công trình đạt tiêu chuẩn kỹ thuật và chất lượng.",
      icon: VerifiedUserOutlined,
    },
  ],
  "Nhiệm vụ hỗ trợ": [
    {
      name: "Quản lý nhân lực",
      icon: GroupOutlined,
    },
    {
      name: "Quản lý truyền thông",
      icon: CampaignOutlined  ,
    },
    {
      name: "Quản lý rủi ro",
      icon: WarningOutlined,
    },
    {
      name: "Quản lý mua sắm – xây lắp",
      icon: ShoppingCartOutlined,
    },
    {
      name: "Quản lý bên liên quan",
      icon: Diversity3Outlined,
    },
    {
      name: "Quản lý sự tích hợp",
      icon: HubOutlined,
    },
  ],
  "Dự án xây dựng": [
    {
      name: "Quản lý an toàn",
      icon: SecurityOutlined,
    },
    {
      name: "Quản lý môi trường xây dựng",
      icon: CompostOutlined,
    },
    {
      name: "Quản lý tài chính",
      icon: MonetizationOnOutlined,
    },
    {
      name: "Quản lý khiếu nại",
      icon: ReportOutlined,
    },
  ],
}

export default function ProjectManagementPage() {
  const theme = useTheme();
  useScrollAnimations();
  const isLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section>
        <Box
          sx={{
            color: 'white',
            pt: { xs: 12, md: 20 },
            pb: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'url(/banner/banner_home5.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(10, 24, 61, 0.95)',
              zIndex: 1,
            },
          }}
        >
          <Container sx={{ px: 4, position: 'relative' }}>
            <div className="relative z-10 text-white fade-in-up">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                {/* Text Section */}
                <div className="flex-1 space-y-8 w-full">
                  <div>
                    <Typography
                      variant="h1"
                      className="text-5xl md:text-6xl font-black text-white leading-tight"
                      sx={{ mb: 3 }}
                    >
                      Quản lý Dự án{' '}
                      <Typography
                        component="span"
                        fontSize={40}
                        fontWeight={700}
                        color={theme.palette.secondary.light}
                      >
                        Xây dựng
                      </Typography>
                    </Typography>
                    <Typography
                      variant="h4"
                      className="text-2xl font-normal text-white"
                      sx={{ mb: 1 }}
                    >
                      Chuyên nghiệp & Hiệu quả
                    </Typography>
                    <Typography
                      variant="h6"
                      className="text-xl text-white leading-relaxed max-w-xl"
                    >
                      Hệ thống tổng thể để quản lý các khía cạnh quan trọng của dự án xây dựng, từ mục tiêu cốt lõi đến các
                      nhiệm vụ hỗ trợ và quản lý dự án cụ thể.
                    </Typography>
                  </div>
                </div>

                {/* Icon Section */}
                <div className="flex-1 w-full">
                  <Box
                    component="img"
                    src="/project-management/banner.webp"
                    alt="Project Management Banner"
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 2,
                      boxShadow: 3
                    }}
                  />
                </div>
              </div>
            </div>
          </Container>
        </Box>
      </section>

      {/* Main Features Section */}
      <section className="py-20">
        <Container sx={{ px: 4 }}>
          <div className="space-y-20">
            {/* Main objectives */}
            <div>
              {/* Title outside the background */}
              <div className="flex items-center gap-4 mb-8">
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 48, 
                    backgroundColor: theme.palette.action.hover, 
                    borderRadius: 2 
                  }} 
                />
                <div>
                  <Typography 
                    variant="h3" 
                    className="text-3xl font-black text-gray-900"
                  >
                    Nhiệm vụ hỗ trợ
                  </Typography>
                  <Typography 
                    variant="body1" 
                    className="text-gray-600"
                  >
                    Các chức năng hỗ trợ thiết yếu
                  </Typography>
                </div>
              </div>
              
              {/* Background box with 4 columns */}
              <Box 
                sx={{ 
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.300'
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                  {projectData["Mục tiêu"].map((item, index) => {
                    const IconComponent = item.icon
                    const colors = [
                      { iconColor: theme.palette.action.active },
                      { iconColor: theme.palette.action.hover },
                      { iconColor: theme.palette.action.active },
                      { iconColor: theme.palette.action.hover },
                    ]
                    const colorSet = colors[index % colors.length]
                    
                    return (
                      <div 
                        key={index}
                        className="border-b border-gray-300 md:border-b-0 md:border-r md:last:border-r-0"
                      >
                        <div className="text-center md:text-left p-6 flex flex-col">
                          <div className="flex justify-center md:justify-start mb-4 flex-shrink-0">
                            <IconComponent
                              sx={{ fontSize: 60, color: colorSet.iconColor }} 
                            />
                          </div>
                          <Typography variant="h5" className="font-bold mb-4 text-gray-900 flex-shrink-0">
                            {item.name}
                          </Typography>
                          <div className="flex-1 overflow-y-auto">
                            <Typography variant="body1" className="text-gray-700 leading-relaxed">
                              {item.description}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Box>
            </div>

            {/* Support tasks */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 48, 
                    backgroundColor: theme.palette.action.hover, 
                    borderRadius: 2 
                  }} 
                />
                <div>
                  <Typography 
                    variant="h3" 
                    className="text-3xl font-black text-gray-900"
                  >
                    Nhiệm vụ hỗ trợ
                  </Typography>
                  <Typography 
                    variant="body1" 
                    className="text-gray-600"
                  >
                    Các chức năng hỗ trợ thiết yếu
                  </Typography>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 bg-[#EEF9FF] p-4 rounded-2xl">
                {projectData["Nhiệm vụ hỗ trợ"].map((item, index) => {
                  const IconComponent = item.icon
                  const colors = [
                    { icon: theme.palette.action.active },
                    { icon: theme.palette.action.hover },
                    { icon: theme.palette.action.active },
                    { icon: theme.palette.action.hover },
                    { icon: theme.palette.action.active },
                    { icon: theme.palette.action.hover },
                  ]
                  const colorSet = colors[index % colors.length]
                  
                  return (
                    <Box
                      key={index}
                      className="group text-center"
                      sx={{
                        backgroundColor: { xs: 'primary.main', lg: 'white' },
                        borderRadius: 2,
                        p: 3,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: { lg: 'scale(1.05)' },
                          backgroundColor: { lg: 'primary.main' },
                          borderColor: { lg: 'primary.main' },
                          color: { lg: 'white' }
                        }
                      }}
                    >
                      <div className={`mx-auto mb-4`}>
                        <IconComponent sx={{ fontSize: 32, color: colorSet.icon }} />
                      </div>
                      <Typography
                        variant="h6"
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          isLg ? 'text-gray-900 group-hover:text-white' : 'text-white'
                        }`}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  )
                })}
              </div>
            </div>

            {/* Construction projects */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 48, 
                    backgroundColor: theme.palette.action.hover, 
                    borderRadius: 2 
                  }} 
                />
                <div>
                  <Typography 
                    variant="h3" 
                    className="text-3xl font-black text-gray-900"
                  >
                    Dự án xây dựng
                  </Typography>
                  <Typography 
                    variant="body1" 
                    className="text-gray-600"
                  >
                    Chuyên biệt cho ngành xây dựng
                  </Typography>
                </div>
              </div>
              
              <Box
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {projectData["Dự án xây dựng"].map((item, index) => {
                  const IconComponent = item.icon
                  const colors = [
                    { bg: "bg-cyan-50", icon: theme.palette.action.active, shadow: theme.palette.action.active },
                    { bg: "bg-green-50", icon: theme.palette.action.hover, shadow: theme.palette.action.hover },
                    { bg: "bg-green-50", icon: theme.palette.action.active, shadow: theme.palette.action.active },
                    { bg: "bg-cyan-50", icon: theme.palette.action.hover, shadow: theme.palette.action.hover },
                  ]
                  const colorSet = colors[index % colors.length]
                  
                  return (
                      <Box
                        key={index}
                        className="group rounded-2xl p-8 border border-gray-200 transition-all duration-300 text-center hover:scale-105"
                        sx={{ bgcolor: 'white' }}
                      >
                      <Box
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:transition-shadow`}
                      >
                        <IconComponent sx={{ fontSize: 32, color: colorSet.icon }} />
                      </Box>
                      <Typography 
                        variant="body1" 
                        className="text-base font-semibold text-gray-900 leading-tight"
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  )
                })}
              </Box>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}