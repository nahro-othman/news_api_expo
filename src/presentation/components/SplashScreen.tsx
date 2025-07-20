import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Fade in and scale animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss after 2.5 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* App Icon */}
        <View style={styles.iconContainer}>
          <Image 
            source={require('../../../assets/icon.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        {/* App Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>NEWS</Text>
          <Text style={styles.subtitle}>APP</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Stay Informed, Stay Connected</Text>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBar}>
            <Animated.View 
              style={[
                styles.loadingProgress,
                {
                  opacity: fadeAnim,
                },
              ]}
            />
          </View>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderWidth: 4,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  icon: {
    width: 80,
    height: 80,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#666666',
    letterSpacing: 3,
    marginTop: -4,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999999',
    letterSpacing: 1,
    marginBottom: 48,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    width: 200,
  },
  loadingBar: {
    width: '100%',
    height: 3,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 12,
  },
  loadingProgress: {
    width: '70%',
    height: '100%',
    backgroundColor: '#000000',
  },
  loadingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    letterSpacing: 1,
  },
}); 