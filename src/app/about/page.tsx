'use client';

import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  Avatar,
  Chip,
  Paper,
  Rating,
  useTheme,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  Business,
  Visibility,
  Handshake,
  EmojiEvents,
  VerifiedUser,
  Group,
  Architecture,
  Engineering,
} from '@mui/icons-material';
import { useTranslations } from '@/hooks/useTranslations';

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

export default function AboutPage() {
  useScrollAnimations();
  const theme = useTheme();
  const { t } = useTranslations();

  return (
    <Box className="min-h-screen bg-gradient-to-br from-cyan-50 to-amber-50">
      <Container maxWidth="lg" className="py-16 space-y-20">
        {/* Why Choose Us */}
        <section className="fade-in-on-scroll">
          <Typography
            variant="h2"
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            sx={{ marginBottom: '3rem' }}
          >
            {t('about.whyChooseUs.title')}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="zoom-in-on-scroll animate-delay-1">
              <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-500 hover:shadow-xl hover:scale-105">
                <EmojiEvents 
                  className="mb-4 text-yellow-500" 
                  sx={{ fontSize: 50 }} 
                />
                <Typography variant="h6" className="font-bold mb-3 text-gray-800">
                  {t('about.whyChooseUs.experience.title')}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {t('about.whyChooseUs.experience.description')}
                </Typography>
              </div>
            </div>
            <div className="zoom-in-on-scroll animate-delay-2">
              <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-500 hover:shadow-xl hover:scale-105">
                <Group 
                  className="mb-4 text-blue-500" 
                  sx={{ fontSize: 50 }} 
                />
                <Typography variant="h6" className="font-bold mb-3 text-gray-800">
                  {t('about.whyChooseUs.team.title')}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {t('about.whyChooseUs.team.description')}
                </Typography>
              </div>
            </div>
            <div className="zoom-in-on-scroll animate-delay-3">
              <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-500 hover:shadow-xl hover:scale-105">
                <VerifiedUser 
                  className="mb-4 text-green-500" 
                  sx={{ fontSize: 50 }} 
                />
                <Typography variant="h6" className="font-bold mb-3 text-gray-800">
                  {t('about.whyChooseUs.quality.title')}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {t('about.whyChooseUs.quality.description')}
                </Typography>
              </div>
            </div>
            <div className="zoom-in-on-scroll animate-delay-4">
              <div className="text-center p-6 rounded-2xl bg-white/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-500 hover:shadow-xl hover:scale-105">
                <Business 
                  className="mb-4 text-purple-500" 
                  sx={{ fontSize: 50 }} 
                />
                <Typography variant="h6" className="font-bold mb-3 text-gray-800">
                  {t('about.whyChooseUs.onTime.title')}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {t('about.whyChooseUs.onTime.description')}
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="fade-in-on-scroll">
          <Typography
            variant="h3"
            className="text-2xl font-bold text-center mb-8 text-gray-800"
            sx={{ marginBottom: '2rem' }}
          >
            {t('about.title')}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="zoom-in-on-scroll animate-delay-1">
              <div 
                className="h-full text-center p-8 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-500 cursor-pointer group overflow-hidden relative"
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                  e.currentTarget.style.boxShadow = `0 25px 80px ${theme.palette.primary.main}25`;
                  e.currentTarget.style.borderColor = `${theme.palette.primary.main}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(229,231,235,0.5)';
                }}
              >
                {/* Top accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ backgroundColor: theme.palette.primary.main }}
                ></div>
                
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}10, ${theme.palette.primary.main}20)`
                  }}
                ></div>
                
                <div className="relative z-10">
                  <Business 
                    className="mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
                    sx={{ 
                      fontSize: 60, 
                      color: theme.palette.primary.main 
                    }} 
                  />
                  <Typography 
                    variant="h4" 
                    className="font-bold mb-6 text-gray-800 transition-colors duration-300"
                    sx={{
                      '.group:hover &': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    {t('about.mission.title')}
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                    {t('about.mission.description')}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="zoom-in-on-scroll animate-delay-2">
              <div 
                className="h-full text-center p-8 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-500 cursor-pointer group overflow-hidden relative"
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                  e.currentTarget.style.boxShadow = `0 25px 80px ${theme.palette.primary.main}25`;
                  e.currentTarget.style.borderColor = `${theme.palette.primary.main}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(229,231,235,0.5)';
                }}
              >
                {/* Top accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ backgroundColor: theme.palette.primary.main }}
                ></div>
                
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}10, ${theme.palette.primary.main}20)`
                  }}
                ></div>
                
                <div className="relative z-10">
                  <Visibility 
                    className="mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
                    sx={{ 
                      fontSize: 60, 
                      color: theme.palette.primary.main 
                    }} 
                  />
                  <Typography 
                    variant="h4" 
                    className="font-bold mb-6 text-gray-800 transition-colors duration-300"
                    sx={{
                      '.group:hover &': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    {t('about.vision.title')}
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                    {t('about.vision.description')}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="zoom-in-on-scroll animate-delay-3">
              <div 
                className="h-full text-center p-8 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 transition-all duration-500 cursor-pointer group overflow-hidden relative"
                style={{
                  boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                  e.currentTarget.style.boxShadow = `0 25px 80px ${theme.palette.primary.main}25`;
                  e.currentTarget.style.borderColor = `${theme.palette.primary.main}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(229,231,235,0.5)';
                }}
              >
                {/* Top accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                  style={{ backgroundColor: theme.palette.primary.main }}
                ></div>
                
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background: `linear-gradient(to bottom right, ${theme.palette.primary.main}10, ${theme.palette.primary.main}20)`
                  }}
                ></div>
                
                <div className="relative z-10">
                  <Handshake 
                    className="mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
                    sx={{ 
                      fontSize: 60, 
                      color: theme.palette.primary.main 
                    }} 
                  />
                  <Typography 
                    variant="h4" 
                    className="font-bold mb-6 text-gray-800 transition-colors duration-300"
                    sx={{
                      '.group:hover &': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    {t('about.values.title')}
                  </Typography>
                  <Typography variant="body1" className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                    {t('about.values.description')}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="slide-in-left-on-scroll">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-xl border border-white/50 p-8 md:p-12">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div 
                className="absolute top-0 left-0 w-32 h-32 rounded-full -translate-x-16 -translate-y-16"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
                }}
              ></div>
              <div 
                className="absolute bottom-0 right-0 w-40 h-40 rounded-full translate-x-20 translate-y-20"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.primary.main})`
                }}
              ></div>
            </div>
            
            <div className="relative z-10">
              <Typography
                variant="h2"
                className="text-3xl font-bold text-center mb-12 text-gray-800"
              >
                {t('about.history.title')}
              </Typography>
          <Timeline position="alternate">
            <TimelineItem className="fade-in-on-scroll animate-delay-1">
              <TimelineSeparator>
                <TimelineDot className="bg-cyan-600 transition-all duration-300" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={3}
                  className="p-6 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 cursor-pointer group"
                >
                  <Typography variant="h6" className="font-bold text-cyan-600 mb-2 transition-all duration-300 group-hover:text-cyan-700 group-hover:scale-105">
                    {t('about.history.timeline.2005.year')}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                    {t('about.history.timeline.2005.title')}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem className="fade-in-on-scroll animate-delay-2">
              <TimelineSeparator>
                <TimelineDot className="bg-amber-500 transition-all duration-300" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={3}
                  className="p-6 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 cursor-pointer group"
                >
                  <Typography variant="h6" className="font-bold text-amber-500 mb-2 transition-all duration-300 group-hover:text-amber-600 group-hover:scale-105">
                    {t('about.history.timeline.2010.year')}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                    {t('about.history.timeline.2010.title')}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem className="fade-in-on-scroll animate-delay-3">
              <TimelineSeparator>
                <TimelineDot className="bg-green-600 transition-all duration-300" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={3}
                  className="p-6 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 cursor-pointer group"
                >
                  <Typography variant="h6" className="font-bold text-green-600 mb-2 transition-all duration-300 group-hover:text-green-700 group-hover:scale-105">
                    {t('about.history.timeline.2018.year')}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                    {t('about.history.timeline.2018.title')}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem className="fade-in-on-scroll animate-delay-4">
              <TimelineSeparator>
                <TimelineDot className="bg-purple-600 transition-all duration-300" />
              </TimelineSeparator>
              <TimelineContent>
                <Paper
                  elevation={3}
                  className="p-6 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 cursor-pointer group"
                >
                  <Typography variant="h6" className="font-bold text-purple-600 mb-2 transition-all duration-300 group-hover:text-purple-700 group-hover:scale-105">
                    {t('about.history.timeline.2023.year')}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                    {t('about.history.timeline.2023.title')}
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
            </div>
          </div>
        </section>

        {/* Key Personnel */}
        <section className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 fade-in-on-scroll">
          <Typography
            variant="h2"
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            sx={{ marginBottom: '3rem' }}
          >
            {t('about.team.title')}
          </Typography>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[300px] zoom-in-on-scroll">
              <Card className="text-center p-6 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 cursor-pointer group">
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    margin: '0 auto 16px',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  className="bg-cyan-600 group-hover:scale-110 group-hover:shadow-lg"
                >
                  <Engineering 
                    sx={{ fontSize: 50 }} 
                    className="transition-transform duration-300 group-hover:rotate-6"
                  />
                </Avatar>
                <Typography variant="h5" className="font-bold mb-2 transition-colors duration-300 group-hover:text-cyan-700">
                  {t('about.team.members.ceo.name')}
                </Typography>
                <Typography variant="subtitle1" className="text-cyan-600 mb-3 transition-colors duration-300 group-hover:text-cyan-700">
                  {t('about.team.members.ceo.position')}
                </Typography>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Chip 
                    label={t('about.team.members.ceo.experience')}
                    size="small" 
                    className="bg-cyan-100 text-cyan-800 transition-all duration-300 group-hover:bg-cyan-200" 
                  />
                  <Chip 
                    label={t('about.team.members.ceo.specialty')}
                    size="small" 
                    className="bg-gray-100 transition-all duration-300 group-hover:bg-gray-200" 
                  />
                </div>
                <Typography variant="body2" className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  {t('about.team.members.ceo.description')}
                </Typography>
              </Card>
            </div>
            <div className="flex-1 min-w-[300px] zoom-in-on-scroll">
              <Card className="text-center p-6 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 cursor-pointer group">
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    margin: '0 auto 16px',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  className="bg-amber-500 group-hover:scale-110 group-hover:shadow-lg"
                >
                  <Architecture 
                    sx={{ fontSize: 50 }} 
                    className="transition-transform duration-300 group-hover:rotate-6"
                  />
                </Avatar>
                <Typography variant="h5" className="font-bold mb-2 transition-colors duration-300 group-hover:text-amber-600">
                  {t('about.team.members.deputy.name')}
                </Typography>
                <Typography variant="subtitle1" className="text-amber-500 mb-3 transition-colors duration-300 group-hover:text-amber-600">
                  {t('about.team.members.deputy.position')}
                </Typography>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Chip 
                    label={t('about.team.members.deputy.experience')}
                    size="small" 
                    className="bg-amber-100 text-amber-800 transition-all duration-300 group-hover:bg-amber-200" 
                  />
                  <Chip 
                    label={t('about.team.members.deputy.specialty')}
                    size="small" 
                    className="bg-gray-100 transition-all duration-300 group-hover:bg-gray-200" 
                  />
                </div>
                <Typography variant="body2" className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  {t('about.team.members.deputy.description')}
                </Typography>
              </Card>
            </div>
            <div className="flex-1 min-w-[300px] zoom-in-on-scroll">
              <Card className="text-center p-6 transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 cursor-pointer group">
                <Avatar
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    margin: '0 auto 16px',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  className="bg-green-600 group-hover:scale-110 group-hover:shadow-lg"
                >
                  <Group 
                    sx={{ fontSize: 50 }} 
                    className="transition-transform duration-300 group-hover:rotate-6"
                  />
                </Avatar>
                <Typography variant="h5" className="font-bold mb-2 transition-colors duration-300 group-hover:text-green-700">
                  {t('about.team.members.technical.name')}
                </Typography>
                <Typography variant="subtitle1" className="text-green-600 mb-3 transition-colors duration-300 group-hover:text-green-700">
                  {t('about.team.members.technical.position')}
                </Typography>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Chip 
                    label={t('about.team.members.technical.experience')}
                    size="small" 
                    className="bg-green-100 text-green-800 transition-all duration-300 group-hover:bg-green-200" 
                  />
                  <Chip 
                    label={t('about.team.members.technical.specialty')}
                    size="small" 
                    className="bg-gray-100 transition-all duration-300 group-hover:bg-gray-200" 
                  />
                </div>
                <Typography variant="body2" className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  {t('about.team.members.technical.description')}
                </Typography>
              </Card>
            </div>
          </div>
        </section>

        {/* Partners & Clients */}
        <section className="fade-in-on-scroll">
          <Typography
            variant="h2"
            className="text-3xl font-bold text-center mb-12 text-gray-800"
            sx={{ marginBottom: '3rem' }}
          >
            {t('about.partners.title')}
          </Typography>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 fade-in-on-scroll">
              <Card className="p-6 h-full transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 group">
                <Typography
                  variant="h5"
                  className="font-bold mb-4 text-cyan-600 flex items-center transition-colors duration-300 group-hover:text-cyan-700"
                >
                  <Handshake className="mr-2 transition-transform duration-300 group-hover:scale-110" />
                  {t('about.partners.strategicPartners.title')}
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                    <div>
                      <Typography variant="h6" className="font-semibold">
                        {t('about.partners.strategicPartners.vingroup.name')}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {t('about.partners.strategicPartners.vingroup.description')}
                      </Typography>
                    </div>
                    <Rating value={5} readOnly size="small" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                    <div>
                      <Typography variant="h6" className="font-semibold">
                        {t('about.partners.strategicPartners.coteccons.name')}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {t('about.partners.strategicPartners.coteccons.description')}
                      </Typography>
                    </div>
                    <Rating value={5} readOnly size="small" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                    <div>
                      <Typography variant="h6" className="font-semibold">
                        {t('about.partners.strategicPartners.hoaphat.name')}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {t('about.partners.strategicPartners.hoaphat.description')}
                      </Typography>
                    </div>
                    <Rating value={4} readOnly size="small" />
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex-1 fade-in-on-scroll">
              <Card className="p-6 h-full transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 group">
                <Typography
                  variant="h5"
                  className="font-bold mb-4 text-amber-500 flex items-center transition-colors duration-300 group-hover:text-amber-600"
                >
                  <Business className="mr-2 transition-transform duration-300 group-hover:scale-110" />
                  {t('about.partners.clients.title')}
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                    <div>
                      <Typography variant="h6" className="font-semibold">
                        {t('about.partners.clients.hcmc.name')}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {t('about.partners.clients.hcmc.description')}
                      </Typography>
                    </div>
                    <Chip 
                      label={t('about.partners.clients.hcmc.type')}
                      size="small" 
                      className="bg-blue-100 text-blue-800 transition-all duration-300 hover:bg-blue-200" 
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                    <div>
                      <Typography variant="h6" className="font-semibold">
                        {t('about.partners.clients.samsung.name')}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {t('about.partners.clients.samsung.description')}
                      </Typography>
                    </div>
                    <Chip 
                      label={t('about.partners.clients.samsung.type')}
                      size="small" 
                      className="bg-green-100 text-green-800 transition-all duration-300 hover:bg-green-200" 
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100 hover:scale-[1.01]">
                    <div>
                      <Typography variant="h6" className="font-semibold">
                        {t('about.partners.clients.saigoncoop.name')}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {t('about.partners.clients.saigoncoop.description')}
                      </Typography>
                    </div>
                    <Chip 
                      label={t('about.partners.clients.saigoncoop.type')}
                      size="small" 
                      className="bg-purple-100 text-purple-800 transition-all duration-300 hover:bg-purple-200" 
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </Container>
    </Box>
  );
}