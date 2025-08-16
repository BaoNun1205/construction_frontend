"use client"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Fade,
  useTheme,
  Divider,
} from "@mui/material"
import { 
  Menu as MenuIcon, 
  Phone,
  ExpandMore,
} from "@mui/icons-material"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const theme = useTheme()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElServices, setAnchorElServices] = useState<null | HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Services data as requested
  const services = [
    {
      title: 'Thi công xây dựng công trình',
      href: '/services/construction',
    },
    {
      title: 'Tư vấn và thiết kế',
      href: '/services/design-consulting',
    },
    {
      title: 'Tư vấn giám sát',
      href: '/services/supervision',
    },
    {
      title: 'Tư vấn quản lý dự án',
      href: '/services/project-management',
    },
    {
      title: 'Tư vấn đấu thầu',
      href: '/services/bidding-consulting',
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenServicesMenu = () => {
    setAnchorElServices(document.getElementById('services-button'))
  }

  const handleCloseServicesMenu = () => {
    setAnchorElServices(null)
  }

  const navigationItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/about" },
    { label: "Dịch vụ", href: "/services", hasDropdown: true },
    { label: "Cửa hàng", href: "/store" },
    { label: "Liên lạc", href: "/contact" },
  ]

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 0}
      sx={{
        background: (scrolled || !isHomePage)
          ? theme.palette.primary.main
          : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "none" : "none",
        borderBottom: scrolled ? "none" : "none",
        boxShadow: (scrolled || !isHomePage) ? `0 8px 32px ${theme.palette.primary.main}30` : "none",
        borderRadius: 0,
        top: 0,
        transition: "all 0.3s ease-in-out",
        zIndex: 1100,
      }}
    >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: "70px", md: "80px" },
              py: 2,
            }}
          >
            {/* Logo Desktop */}
            <Box
              component={Link}
              href="/"
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                textDecoration: "none",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  p: 1,
                  borderRadius: 2,
                  background: scrolled 
                    ? "rgba(255,255,255,0.15)" 
                    : "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(10px)",
                  border: scrolled 
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(255,255,255,0.3)",
                  boxShadow: (scrolled || !isHomePage)
                    ? `0 4px 20px ${theme.palette.primary.main}30` 
                    : "0 4px 20px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <Image
                  src="/logo-laiphat.png"
                  alt="Lai Phát Construction"
                  width={50}
                  height={50}
                  style={{
                    objectFit: "contain",
                    filter: "brightness(1.1)",
                  }}
                />
              </Box>
              <Box sx={{ ml: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#e42222ff",
                    fontSize: "1.4rem",
                    lineHeight: 1,
                    letterSpacing: "0.5px",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  LAI PHÁT
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    display: "block",
                    lineHeight: 1,
                    mt: 0.5,
                    fontStyle: "italic",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
                  }}
                >
                  Uy tín tạo niềm tin
                </Typography>
              </Box>
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                sx={{
                  color: "white",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.2)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                ml: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                justifyContent: "center",
                textDecoration: "none",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  p: 0.5,
                  borderRadius: 1.5,
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Image
                  src="/logo-laiphat.png"
                  alt="Lai Phát Construction"
                  width={40}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Box sx={{ ml: 1.5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#ef4444", // màu đỏ
                    fontSize: "1.1rem",
                    lineHeight: 1,
                    letterSpacing: "0.3px",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  LAI PHÁT
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    display: "block",
                    lineHeight: 1,
                    mt: 0.25,
                    fontStyle: "italic",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
                  }}
                >
                  Uy tín tạo niềm tin
                </Typography>
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
              {navigationItems.map((item) => (
                item.hasDropdown ? (
                  <Box 
                    key={item.label} 
                    sx={{ position: 'relative' }}
                    onMouseEnter={handleOpenServicesMenu}
                    onMouseLeave={handleCloseServicesMenu}
                  >
                    <Button
                      id="services-button"
                      sx={{
                        mx: 1,
                        px: 3,
                        py: 1,
                        color: "white",
                        fontSize: "18px",
                        fontWeight: 500,
                        textTransform: "none",
                        borderRadius: 2,
                        position: "relative",
                        transition: "color 0.3s ease",
                        background: "transparent",
                        "&:hover": {
                          color: "#58d0f5",
                          background: "transparent",
                          boxShadow: "none",
                          transform: "none",
                        },
                      }}
                      endIcon={<ExpandMore />}
                    >
                      {item.label}
                    </Button>
                    {/* Custom Dropdown */}
                    {Boolean(anchorElServices) && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          mt: 0, // Loại bỏ margin để tạo cầu nối
                          pt: 1, // Thêm padding top để tạo vùng hover
                          background: "transparent", // Vùng cầu nối trong suốt
                          zIndex: 1000,
                        }}
                      >
                        {/* Dropdown content */}
                        <Box
                          sx={{
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            borderRadius: 3,
                            minWidth: 240,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                            p: 1,
                          }}
                        >
                          {services.map((service, index) => (
                            <Box
                              key={index}
                              component={Link}
                              href={service.href}
                              onClick={handleCloseServicesMenu}
                              sx={{
                                display: "block",
                                textDecoration: "none",
                                px: 3,
                                py: 1.5,
                                borderRadius: 1,
                                mb: index < services.length - 1 ? 0.5 : 0,
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "rgba(88, 208, 245, 0.1)",
                                  "& .service-title": {
                                    color: "#58d0f5",
                                  },
                                },
                              }}
                            >
                              <Typography
                                className="service-title"
                                sx={{
                                  fontWeight: 500,
                                  fontSize: "1rem",
                                  color: "rgba(0, 0, 0, 0.87)",
                                  transition: "color 0.3s ease",
                                }}
                              >
                                {service.title}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.href}
                    sx={{
                      mx: 1,
                      px: 3,
                      py: 1,
                      color: "white",
                      fontSize: "18px",
                      fontWeight: 500,
                      textTransform: "none",
                      borderRadius: 2,
                      position: "relative",
                      transition: "color 0.3s ease",
                      background: "transparent",
                      "&:hover": {
                        color: "#58d0f5",
                        background: "transparent",
                        boxShadow: "none",
                        transform: "none",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              ))}
            </Box>

            {/* Contact Info */}
            <Box sx={{ flexGrow: 0, display: "flex", gap: 1 }}>
              <Button
                startIcon={<Phone />}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  color: "white",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  },
                }}
              >
                0939 927 975
              </Button>
            </Box>

            {/* Mobile Menu */}
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              TransitionComponent={Fade}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 2,
                  mt: 1,
                  minWidth: 200,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                },
              }}
            >
              {navigationItems.map((item) => (
                item.hasDropdown ? (
                  <Box key={item.label}>
                    <MenuItem
                      sx={{
                        color: "white",
                        py: 1.5,
                        px: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255,255,255,0.1)",
                          transform: "translateX(8px)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          fontWeight: 500,
                          fontSize: "18px",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </MenuItem>
                    {services.map((service, index) => (
                      <MenuItem
                        key={`${item.label}-${index}`}
                        onClick={handleCloseNavMenu}
                        component={Link}
                        href={service.href}
                        sx={{
                          color: "rgba(255,255,255,0.8)",
                          py: 1,
                          px: 5,
                          fontSize: "14px",
                          transition: "color 0.3s ease",
                          background: "transparent",
                          "&:hover": {
                            background: "transparent",
                            color: "#58d0f5",
                            transform: "none",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: 400,
                            fontSize: "16px",
                          }}
                        >
                          {service.title}
                        </Typography>
                      </MenuItem>
                    ))}
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
                  </Box>
                ) : (
                  <MenuItem
                    key={item.label}
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: "white",
                      py: 1.5,
                      px: 3,
                      transition: "color 0.3s ease",
                      background: "transparent",
                      "&:hover": {
                        background: "transparent",
                        color: "#58d0f5",
                        transform: "none",
                      },
                    }}
                  >
                    <Typography
                      component={Link}
                      href={item.href}
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: 500,
                        fontSize: "18px",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </MenuItem>
                )
              ))}
              <MenuItem sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", mt: 1 }}>
                <Button
                  startIcon={<Phone />}
                  fullWidth
                  sx={{
                    color: "white",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  0939 927 975
                </Button>
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
  )
}
