import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { getTypography } from '@/theme/typography';
import { 
  scale, 
  verticalScale, 
  moderateScale, 
  SCREEN, 
  GRID, 
  LAYOUT,   COMPONENT,
  TOUCH,
  TYPOGRAPHY,
  useSafeLayout,
  responsiveValue,
  isTablet
} from '@/utils/responsive';
import { NavigationService } from '@/utils/navigation';
import HealthAppNavigation, { enhancedQuickActions } from '@/utils/navigationEnhancement';

// Enhanced Icon Component with responsive sizing
const CleanIcon = ({ name, size = COMPONENT.icon.md, color, backgroundColor }: {
  name: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}) => {
  const { colors } = useTheme();
  
  const iconMap: { [key: string]: string } = {
    'fire': '🔥',
    'steps': '👟',
    'heart': '💖',
    'sleep': '😴',
    'standing': '🧍',
    'protein': '🥗',
    'bell': '🔔',
    'search': '🔍',
    'filter': '⚙️',
    'arrow': '→',
  };

  const containerSize = size + scale(16);

  return (
    <View style={{
      width: containerSize,
      height: containerSize,
      backgroundColor: backgroundColor || colors.primary + '15',
      borderRadius: containerSize / 2,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 0.5,
      borderColor: 'rgba(255,255,255,0.3)',
    }}>
      <Text style={{ 
        fontSize: size * 0.8,
        textShadowColor: 'rgba(0,0,0,0.15)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
      }}>
        {iconMap[name] || '📊'}
      </Text>
    </View>
  );
};

// Enhanced Circular Progress Ring Component with responsive sizing
const CircularProgress = ({ 
  progress, 
  size = responsiveValue({ xs: scale(100), sm: scale(120), md: scale(140), default: scale(120) }), 
  strokeWidth = scale(8), 
  value,
  unit,
  label 
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  value: string | number;
  unit: string;
  label: string;
}) => {
  const { colors } = useTheme();
  
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress / 100,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={{
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }}>
      {/* Background Circle */}
      <View style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: colors.border + '30',
      }} />
      
      {/* Progress Circle */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: strokeWidth,
          borderColor: 'transparent',
          borderTopColor: colors.primary,
          transform: [
            { rotate: '-90deg' },
            {
              rotate: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', `${360 * (progress / 100)}deg`],
              }),
            },
          ],
        }}
      />
      
      {/* Center Content */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{
          fontSize: responsiveValue({ xs: scale(20), sm: scale(24), md: scale(28), default: scale(24) }),
          fontWeight: '700',
          color: colors.text,
          fontFamily: 'Poppins_700Bold',
        }}>
          {value}
        </Text>
        <Text style={{
          fontSize: responsiveValue({ xs: scale(10), sm: scale(12), md: scale(14), default: scale(12) }),
          color: colors.textSecondary,
          fontFamily: 'Poppins_500Medium',
          textAlign: 'center',
        }}>
          {unit}
        </Text>
        <Text style={{
          fontSize: responsiveValue({ xs: scale(8), sm: scale(10), md: scale(12), default: scale(10) }),
          color: colors.textSecondary,
          fontFamily: 'Poppins_400Regular',
          textAlign: 'center',
          marginTop: 2,
        }}>
          {label}
        </Text>
      </View>
    </View>
  );
};

  
    const EnhancedCircularProgress = ({ 
    progress, 
    size, 
    strokeWidth, 
    value,
    unit,
    label 
  }: {
    progress: number;
    size: number;
    strokeWidth: number;
    value: string | number;
    unit: string;
    label: string;
  }) => {
    const { colors } = useTheme();
    const animatedValue = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }, [progress]);
  
    return (
      <View style={{ 
        width: size, 
        height: size, 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative',
      }}>      {/* Background Circle - Premium glass effect */}
        <View style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: '#F8FAFC',
        backgroundColor: 'rgba(248, 250, 252, 0.4)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
      }} />
      
      {/* Progress Circle - Enhanced gradient with glow effect */}
      <Animated.View style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: strokeWidth,
        borderColor: 'transparent',
        borderTopColor: '#6366F1',
        borderRightColor: '#8B5CF6',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
        transform: [{
          rotate: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['-90deg', `${(progress * 3.6) - 90}deg`],
          }),
        }],
      }} />
      
      {/* Inner glow effect */}      <View style={{
        position: 'absolute',
        width: size - strokeWidth * 2,
        height: size - strokeWidth * 2,
        borderRadius: (size - strokeWidth * 2) / 2,
        backgroundColor: colors.primary + '05',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 2,
      }} />
      
      {/* Center Content - Enhanced glass morphism */}
      <View style={{ 
        position: 'absolute', 
        alignItems: 'center',
        backgroundColor: colors.primary + 'F5',
        paddingHorizontal: LAYOUT.getPadding(20),
        paddingVertical: LAYOUT.getPadding(12),
        borderRadius: LAYOUT.getBorderRadius(28),
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: colors.surface + '30',
      }}>        <Text style={{
          fontSize: TYPOGRAPHY.getFontSize(18),
          fontWeight: '900',
          color: '#FFFFFF',
          letterSpacing: 0.8,
          textShadowColor: 'rgba(0,0,0,0.3)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}>
          {value}
        </Text>
        <Text style={{
          fontSize: 12,
          fontWeight: '700',
          color: '#FFFFFF',
          opacity: 0.95,
          letterSpacing: 0.5,
          textShadowColor: 'rgba(0,0,0,0.2)',
          textShadowOffset: { width: 0, height: 0.5 },
          textShadowRadius: 1,
        }}>
          {unit}
        </Text>
      </View>
    </View>
  );
};

// Enhanced Stat Tile Component with premium glass morphism
const StatTile = ({ 
  icon, 
  title, 
  value,
  backgroundColor
}: {
  icon: string;
  title: string;
  value: string;
  backgroundColor?: string;
}) => {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 200,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 6,
    }).start();
  };  return (
    <Animated.View style={{ 
      transform: [{ scale: scaleAnim }], 
      flex: 1,
    }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}        style={{
          backgroundColor: backgroundColor || colors.card,
          borderRadius: LAYOUT.getBorderRadius(24),
          padding: LAYOUT.getPadding(24) + 2,
          paddingVertical: LAYOUT.getPadding(24) + 6,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 8,
          height: responsiveValue({ xs: 100, sm: 110, md: 120, lg: 130, default: 120 }),
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.border + '90',
          overflow: 'hidden',
          minWidth: 0, // Ensure tiles can shrink evenly
        }}
      >
        {/* Subtle inner glow */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: 'rgba(255,255,255,0.6)',
        }} />          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CleanIcon 
            name={icon}
            size={32}
            backgroundColor="transparent"
          />          <Text style={{
            ...typography.caption,
            color: colors.text,
            marginTop: LAYOUT.getMargin(8) + 4,
            fontSize: 12,
            fontWeight: '600',
            letterSpacing: 0.3,
            opacity: 0.8,
            textAlign: 'center',
          }}>
            {title}
          </Text>          <Text style={{
            ...typography.body,
            color: colors.text,
            fontWeight: '800',
            fontSize: 15,
            marginTop: 4,
            letterSpacing: 0.2,
            textShadowColor: 'rgba(0,0,0,0.1)',
            textShadowOffset: { width: 0, height: 0.5 },
            textShadowRadius: 1,
            textAlign: 'center',
          }}>
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// Enhanced navigation functions for better UX
const navigateToScreen = (screenName: string) => {
  try {
    router.push(screenName as any);
  } catch (error) {
    console.warn(`Navigation to ${screenName} failed:`, error);
  }
};

const handleQuickAction = (action: string) => {
  switch (action) {
    case 'workout':
      HealthAppNavigation.tabNavigation.fromHome.toWorkouts();
      break;
    case 'challenge':
      HealthAppNavigation.tabNavigation.fromHome.toChallenge();
      break;
    case 'social':
      HealthAppNavigation.tabNavigation.fromHome.findGroups();
      break;
    case 'nutrition':
      HealthAppNavigation.tabNavigation.fromHome.logActivity();
      break;
    case 'timer':
      HealthAppNavigation.tabNavigation.fromHome.startTimer();
      break;
    case 'progress':
      HealthAppNavigation.tabNavigation.fromHome.viewProgress();
      break;
    default:
      break;
  }
};

// Main Dashboard Component
export default function HealthDashboard() {
  const { colors, theme } = useTheme();
  const typography = getTypography(theme === 'dark');
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const styles = StyleSheet.create({    container: {
      flex: 1,
      backgroundColor: colors.background,
    },    scrollContent: {      padding: LAYOUT.getPadding(24) + 4,
      paddingTop: LAYOUT.getPadding(24),
      paddingBottom: Math.max(insets.bottom, LAYOUT.getPadding(24)) + LAYOUT.getPadding(48) + LAYOUT.getPadding(32),    },header: {
      marginBottom: LAYOUT.getMargin(32),
    },
    greeting: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(24),
    },
    greetingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.primary,
      marginRight: LAYOUT.getMargin(16),
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 2,
      borderColor: 'rgba(255,255,255,0.9)',
    },    greetingText: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      marginBottom: 3,
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.2,
    },    userName: {
      ...typography.h3,
      color: colors.text,
      fontWeight: '700',
      fontSize: 22,
      letterSpacing: 0.3,
    },
    notificationButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
    },    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',      gap: LAYOUT.getMargin(16),
      marginBottom: LAYOUT.getMargin(32),
    },    
    searchInput: {
      flex: 1,      height: LAYOUT.getPadding(48) + 4,
      backgroundColor: colors.surface,
      borderRadius: 28,
      paddingHorizontal: LAYOUT.getPadding(24),
      paddingLeft: 48,
      ...typography.body,
      color: colors.text,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
      fontSize: 15,
      fontWeight: '500',
    },
    searchIcon: {
      position: 'absolute',
      left: LAYOUT.getPadding(24),
      zIndex: 1,
    },    filterButton: {      width: LAYOUT.getPadding(48) + 4,
      height: LAYOUT.getPadding(48) + 4,
      borderRadius: 26,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
    },    progressSection: {
      backgroundColor: colors.surface,
      borderRadius: 28,      padding: LAYOUT.getPadding(32) + 4,
      marginBottom: LAYOUT.getMargin(32) + 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 20,
      elevation: 8,
      marginHorizontal: 2,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.9)',
      overflow: 'hidden',
    },
    progressContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    progressLeft: {
      flex: 1,
      justifyContent: 'center',
    },
    progressRight: {
      alignItems: 'center',
      justifyContent: 'center',
    },    progressTitle: {
      ...typography.bodyMedium,
      color: colors.text,
      marginBottom: 10,
      fontWeight: '600',
      fontSize: 17,
      letterSpacing: 0.3,
    },
    progressPercentage: {
      ...typography.h1,
      color: colors.text,
      fontWeight: '800',
      fontSize: 42,
      marginBottom: 6,
      letterSpacing: 0.5,
      textShadowColor: 'rgba(0,0,0,0.1)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    progressDate: {
      ...typography.bodySmall,
      color: colors.textSecondary,
      fontSize: 15,
      fontWeight: '500',
      letterSpacing: 0.2,
    },    statsGrid: {
      flexDirection: 'row',      gap: LAYOUT.getMargin(24),
      marginBottom: LAYOUT.getMargin(32) + 4,
      justifyContent: 'space-between',
      paddingHorizontal: 4,
    },expandedSection: {      marginBottom: LAYOUT.getMargin(32) + 4,
    },
    sectionTitle: {
      ...typography.h4,
      color: colors.text,
      marginBottom: LAYOUT.getMargin(24),
      fontWeight: '700',
      fontSize: 18,
      letterSpacing: 0.3,
    },    expandedGrid: {
      flexDirection: 'column',
      gap: LAYOUT.getMargin(24),
    },
    expandedTile: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(24),
      padding: LAYOUT.getPadding(24),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 6,
      minHeight: 80,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.8)',
    },
    quickActionsSection: {
      marginBottom: LAYOUT.getMargin(32),
      paddingHorizontal: LAYOUT.getContentPadding(),
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(16),
    },
    seeAllText: {
      ...typography.body,
      color: colors.primary,
      fontWeight: '600',
    },
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: LAYOUT.getMargin(12),
      justifyContent: 'space-between',
    },
    quickActionCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(16),
      alignItems: 'center',
      width: '48%',
      minHeight: 100,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    quickActionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: LAYOUT.getMargin(8),
    },
    quickActionText: {
      ...typography.bodyMedium,
      color: colors.text,
      textAlign: 'center',
      fontWeight: '600',
    },
    recentActivitySection: {
      marginBottom: LAYOUT.getMargin(32),
      paddingHorizontal: LAYOUT.getContentPadding(),
    },
    activityCards: {
      gap: LAYOUT.getMargin(8),
    },
    activityCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(12),
      padding: LAYOUT.getPadding(16),
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    activityTitle: {
      ...typography.bodyMedium,
      color: colors.text,
      fontWeight: '600',
      marginBottom: 4,
    },
    activityTime: {
      ...typography.caption,
      color: colors.textSecondary,
    },
    socialPreviewSection: {
      marginBottom: LAYOUT.getMargin(32),
      paddingHorizontal: LAYOUT.getContentPadding(),
    },
    socialPreviewCard: {
      backgroundColor: colors.surface,
      borderRadius: LAYOUT.getBorderRadius(16),
      padding: LAYOUT.getPadding(20),
      borderWidth: 1,
      borderColor: colors.border,
    },
    socialPreviewText: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: LAYOUT.getMargin(12),
      lineHeight: 22,
    },
    socialPreviewAction: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    socialPreviewActionText: {
      ...typography.bodyMedium,
      color: colors.primary,
      fontWeight: '600',
    },
  });

  const getCurrentDate = () => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleDateString('en-US', { month: 'long' });
    const year = now.getFullYear();
    
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                  day === 2 || day === 22 ? 'nd' :
                  day === 3 || day === 23 ? 'rd' : 'th';
    
    return `${day}${suffix} ${month} ${year}`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.greeting}>
            <View style={styles.greetingLeft}>
              <View style={styles.avatar}>
                <Image 
                  source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=Raju' }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text style={styles.greetingText}>{getGreeting()}</Text>
                <Text style={styles.userName}>Raju!</Text>
              </View>
            </View>
              <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => HealthAppNavigation.tabNavigation.fromHome.toNotifications()}
            >
              <CleanIcon name="bell" size={20} />              <View style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: colors.error,
              }} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={{ flex: 1, position: 'relative' }}>
              <View style={styles.searchIcon}>
                <CleanIcon name="search" size={18} />
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Search any data here"
                placeholderTextColor={colors.textSecondary}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <CleanIcon name="filter" size={18} />
            </TouchableOpacity>
          </View>
        </View>        {/* Progress Overview - Enhanced with subtle background pattern */}
        <View style={styles.progressSection}>
          {/* Subtle top highlight */}
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
          }} />
          
          <View style={styles.progressContent}>
            <View style={styles.progressLeft}>
              <Text style={styles.progressTitle}>Today's Progress</Text>
              <Text style={styles.progressPercentage}>91%</Text>
              <Text style={styles.progressDate}>{getCurrentDate()}</Text>
            </View>
            <View style={styles.progressRight}>
              <CircularProgress
                progress={91}
                size={115}
                strokeWidth={9}
                value="500"
                unit="kcal"
                label="Calories"
              />
            </View>
          </View>
        </View>        {/* Stats Grid - 3 columns in a row with perfect spacing */}
        <View style={styles.statsGrid}>
          <StatTile
            icon="fire"
            title="Calories"
            value="+500kcal"
            backgroundColor="#FFE5CC"
          />
          <StatTile
            icon="steps"
            title="Steps"
            value="+9000 steps"
            backgroundColor="#E5E9FF"
          />
          <StatTile
            icon="heart"
            title="Moving"
            value="+74mins"
            backgroundColor="#FFE5F1"
          />
        </View>{/* Expanded Health Stats - Enhanced with premium styling */}
        <View style={styles.expandedSection}>
          <View style={styles.expandedGrid}>
            <View style={[styles.expandedTile, { backgroundColor: '#FAFAFA' }]}>
              {/* Subtle top highlight */}              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }} />
              
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>                  <CleanIcon name="sleep" size={24} color="#8b5cf6" backgroundColor="rgba(139, 92, 246, 0.1)" />
                  <View style={{ marginLeft: 18 }}>
                    <Text style={{
                      ...typography.body,
                      color: colors.text,
                      fontWeight: '700',
                      fontSize: 18,
                      letterSpacing: 0.2,
                    }}>
                      Sleep
                    </Text>
                    <Text style={{
                      ...typography.caption,
                      color: colors.textSecondary,
                      fontSize: 15,
                      fontWeight: '500',
                      marginTop: 4,
                    }}>
                      8 Hrs 12 Mins
                    </Text>
                  </View>
                </View>
                <Text style={{ fontSize: 22, color: colors.textSecondary, fontWeight: '600' }}>⋯</Text>
              </View>
            </View>

            <View style={[styles.expandedTile, { backgroundColor: '#FAFAFA' }]}>
              {/* Subtle top highlight */}              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }} />
              
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>                  <CleanIcon name="standing" size={24} color="#10b981" backgroundColor="rgba(16, 185, 129, 0.1)" />
                  <View style={{ marginLeft: 18 }}>
                    <Text style={{
                      ...typography.body,
                      color: colors.text,
                      fontWeight: '700',
                      fontSize: 18,
                      letterSpacing: 0.2,
                    }}>
                      Standing
                    </Text>
                    <Text style={{
                      ...typography.caption,
                      color: colors.textSecondary,
                      fontSize: 15,
                      fontWeight: '500',
                      marginTop: 4,
                    }}>
                      6 Hrs 10 Mins
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.expandedTile, { backgroundColor: '#FAFAFA' }]}>
              {/* Subtle top highlight */}              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.6)',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }} />
              
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>                  <CleanIcon name="heart" size={24} color="#ef4444" backgroundColor="rgba(239, 68, 68, 0.1)" />
                  <View style={{ marginLeft: 18 }}>
                    <Text style={{
                      ...typography.body,
                      color: colors.text,
                      fontWeight: '700',
                      fontSize: 18,
                      letterSpacing: 0.2,
                    }}>
                      Heart
                    </Text>
                    <Text style={{
                      ...typography.caption,
                      color: colors.textSecondary,
                      fontSize: 15,
                      fontWeight: '500',
                      marginTop: 4,
                    }}>
                      Add heart data
                    </Text>
                  </View>
                </View>
                <CleanIcon name="heart" size={20} color="#ef4444" backgroundColor="rgba(239, 68, 68, 0.1)" />
              </View>
            </View>
          </View>
        </View>
        
        {/* Quick Actions Section - Enhanced Navigation */}
        <View style={styles.quickActionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <TouchableOpacity onPress={() => HealthAppNavigation.tabNavigation.fromHome.toExplore()}>
              <Text style={styles.seeAllText}>Explore More</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('workout')}
              activeOpacity={0.8}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: colors.primary + '20' }]}>
                <CleanIcon name="dumbbell" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Start Workout</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('challenge')}
              activeOpacity={0.8}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: colors.accent + '20' }]}>
                <CleanIcon name="trophy" size={24} color={colors.accent} />
              </View>
              <Text style={styles.quickActionText}>Join Challenge</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('social')}
              activeOpacity={0.8}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: colors.success + '20' }]}>
                <CleanIcon name="users" size={24} color={colors.success} />
              </View>
              <Text style={styles.quickActionText}>Find Groups</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.quickActionCard}
              onPress={() => handleQuickAction('timer')}
              activeOpacity={0.8}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: colors.info + '20' }]}>
                <CleanIcon name="timer" size={24} color={colors.info} />
              </View>
              <Text style={styles.quickActionText}>Start Timer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Section with Navigation */}
        <View style={styles.recentActivitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => HealthAppNavigation.tabNavigation.fromHome.toActivity()}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityCards}>
            <TouchableOpacity 
              style={styles.activityCard}
              onPress={() => NavigationService.content.viewPost()}
              activeOpacity={0.8}
            >
              <Text style={styles.activityTitle}>Morning Run Completed</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.activityCard}
              onPress={() => NavigationService.content.trendingPosts()}
              activeOpacity={0.8}
            >
              <Text style={styles.activityTitle}>New Achievement Unlocked</Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Social Feed Preview with Navigation */}
        <View style={styles.socialPreviewSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Community</Text>
            <TouchableOpacity onPress={() => NavigationService.social.messaging()}>
              <Text style={styles.seeAllText}>Messages</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.socialPreviewCard}
            onPress={() => NavigationService.social.discoverGroups()}
            activeOpacity={0.8}
          >
            <Text style={styles.socialPreviewText}>
              Join fitness communities and connect with like-minded people
            </Text>
            <View style={styles.socialPreviewAction}>
              <Text style={styles.socialPreviewActionText}>Discover Groups</Text>
              <CleanIcon name="arrow-right" size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
