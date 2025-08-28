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
  Tooltip,
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
import { useLocale } from "@/contexts/LocaleContext"
import { useTranslations } from "@/hooks/useTranslations"
import ReactCountryFlag from "react-country-flag"

export default function Header() {
  const theme = useTheme()
  const pathname = usePathname()
  const homePagePaths = ['/', '/services/design-consulting', '/about', '/projects']
  const isHomePage = homePagePaths.includes(pathname)
  const { locale, setLocale } = useLocale()
  const { t } = useTranslations()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElServices, setAnchorElServices] = useState<null | HTMLElement>(null)
  const [anchorElProjects, setAnchorElProjects] = useState<null | HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Services data as requested
  const services = [
    {
      title: t('header.services.construction'),
      href: '/services/construction',
    },
    {
      title: t('header.services.design'),
      href: '/services/design-consulting',
    },
    {
      title: t('header.services.supervision'),
      href: '/services/supervision',
    },
    {
      title: t('header.services.projectManagement'),
      href: '/services/project-management',
    },
    {
      title: t('header.services.bidding'),
      href: '/services/bidding-consulting',
    }
  ];

  // Projects data
  const projects = [
    {
      title: 'Dự án thực tế',
      href: '/projects',
    },
        {
      title: 'Mẫu Thiết Kế',
      href: '/projects/design-templates',
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    // Check scroll position on mount and set component as ready
    handleScroll()
    setIsReady(true)

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

  const handleOpenProjectsMenu = () => {
    setAnchorElProjects(document.getElementById('projects-button'))
  }

  const handleCloseProjectsMenu = () => {
    setAnchorElProjects(null)
  }

  const navigationItems = [
    { label: t("nav.home") as string, href: "/" },
    { label: t("nav.about") as string, href: "/about" },
    { label: t("nav.services") as string, href: "/services", hasDropdown: true },
    { label: "Dự án" as string, href: "/project", hasDropdown: true },
    { label: t("nav.store") as string, href: "/store" },
    { label: t("nav.contact") as string, href: "/contact" },
  ]

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 0}
      sx={{
        background: (scrolled || !isHomePage)
          ? theme.palette.primary.main
          : "rgba(0,0,0,0)",
        borderBottom: scrolled
          ? `6px solid ${theme.palette.secondary.light}`
          : "none",
        boxShadow: (scrolled || !isHomePage) ? `0 8px 32px ${theme.palette.primary.main}30` : "none",
        borderRadius: 0,
        top: 0,
        transform: isReady ? 'translateY(0)' : 'translateY(-100%)',
        // transition: "all 0.3s ease-in-out",
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
                  {t('header.company') as string}
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
                  {t('header.title') as string}
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
                    onMouseEnter={item.label === 'Dự án' ? handleOpenProjectsMenu : handleOpenServicesMenu}
                    onMouseLeave={item.label === 'Dự án' ? handleCloseProjectsMenu : handleCloseServicesMenu}
                  >
                    <Button
                      id={item.label === 'Dự án' ? "projects-button" : "services-button"}
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
                    {Boolean(item.label === 'Dự án' ? anchorElProjects : anchorElServices) && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          mt: 0,
                          pt: 1,
                          background: "transparent", 
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
                          {(item.label === 'Dự án' ? projects : services).map((dropdownItem, index) => (
                            <Box
                              key={index}
                              component={Link}
                              href={dropdownItem.href}
                              onClick={item.label === 'Dự án' ? handleCloseProjectsMenu : handleCloseServicesMenu}
                              sx={{
                                display: "block",
                                textDecoration: "none",
                                px: 3,
                                py: 1.5,
                                borderRadius: 1,
                                mb: index < (item.label === 'Dự án' ? projects : services).length - 1 ? 0.5 : 0,
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 17, 55, 0.1)",
                                  "& .dropdown-title": {
                                    color: theme.palette.secondary.main,
                                  },
                                },
                              }}
                            >
                              <Typography
                                className="dropdown-title"
                                sx={{
                                  fontWeight: 500,
                                  fontSize: "1rem",
                                  color: "rgba(0, 0, 0, 0.87)",
                                  transition: "color 0.3s ease",
                                }}
                              >
                                {dropdownItem.title as string}
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
                        color: theme.palette.secondary.light,
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

            {/* Contact Info & Language Toggle */}
            <Box sx={{ flexGrow: 0, display: "flex", gap: 1, alignItems: "center" }}>
              {/* Language Toggle */}
              <Tooltip title={locale === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}>
                <IconButton
                  onClick={() => setLocale(locale === 'vi' ? 'en' : 'vi')}
                  sx={{
                    color: "white",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    width: 40,
                    height: 40,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px) scale(1.1)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  {/* Hiển thị cờ của ngôn ngữ khác để chuyển đổi */}
                  {locale === 'vi' ? (
                    <ReactCountryFlag 
                      countryCode="VN" 
                      svg 
                      style={{ 
                        width: '20px', 
                        height: '15px',
                        borderRadius: '2px'
                      }} 
                    />
                  ) : (
                    <ReactCountryFlag 
                      countryCode="GB" 
                      svg 
                      style={{ 
                        width: '20px', 
                        height: '15px',
                        borderRadius: '2px'
                      }} 
                    />
                  )}
                </IconButton>
              </Tooltip>

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
                    {(item.label === 'Dự án' ? projects : services).map((dropdownItem, index) => (
                      <MenuItem
                        key={`${item.label}-${index}`}
                        onClick={handleCloseNavMenu}
                        component={Link}
                        href={dropdownItem.href}
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
                          {dropdownItem.title as string}
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
