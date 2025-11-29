import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Check } from 'lucide-react-native';

export default function OnboardingScreen() {
  const { height, width } = useWindowDimensions();
  const isSmallScreen = width < 640;
  const imageHeight = isSmallScreen ? height * 0.33 : height * 0.4;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Section */}
        <View style={[styles.imageContainer, { height: imageHeight }]}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5G4U54CL6kvb9FHr6GSDFnLCbEauKqOanP0YMQuZzrU6OTbLp5Sy9bmhwPa7KwC_0iIpzV9bF1nSCaktAkTHNA8hhoOWZR68UzXlN4JbMSNf0i21qc5MToU8z6w2NWUGwSsTs7XAm7KPe874jOENf3Kc8GwlWuVy5ucmcLjKynYbB1p-INUaRoD10XdvHyOF3inMwyB6ukz4uALunI2qMzSBkE0XbU8w7Vrb_akdaxbQezyxfg1RXU9UuUwOIvk1aHqBJIO5QU4w',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Content Section */}
        <View
          style={[
            styles.content,
            isSmallScreen ? styles.contentSmall : styles.contentLarge,
          ]}
        >
          <View style={styles.textSection}>
            <Text
              style={[
                styles.title,
                isSmallScreen ? styles.titleSmall : styles.titleLarge,
              ]}
            >
              Welcome to ID Connect
            </Text>
            <Text
              style={[
                styles.subtitle,
                isSmallScreen ? styles.subtitleSmall : styles.subtitleLarge,
              ]}
            >
              Your platform for verified profiles, discovery, and genuine
              connections.
            </Text>

            {/* Features List */}
            <View style={styles.featuresContainer}>
              <View style={styles.feature}>
                <View style={styles.checkContainer}>
                  <Check color="#3F51B5" size={16} strokeWidth={3} />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureText}>
                    <Text style={styles.featureBold}>Verified Profiles:</Text>
                    <Text style={styles.featureRegular}>
                      {' '}
                      Build trust with authentic identities.
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={styles.feature}>
                <View style={styles.checkContainer}>
                  <Check color="#3F51B5" size={16} strokeWidth={3} />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureText}>
                    <Text style={styles.featureBold}>
                      Local & Global Discovery:
                    </Text>
                    <Text style={styles.featureRegular}>
                      {' '}
                      Find people near and far.
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={styles.feature}>
                <View style={styles.checkContainer}>
                  <Check color="#3F51B5" size={16} strokeWidth={3} />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureText}>
                    <Text style={styles.featureBold}>Real Connections:</Text>
                    <Text style={styles.featureRegular}>
                      {' '}
                      Move beyond the superficial.
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Note Box */}
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>
                For a genuine community, please use accurate details and a clear
                profile photo. This helps everyone connect with confidence.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <SafeAreaView edges={['bottom']} style={styles.buttonSafeArea}>
        <View
          style={[
            styles.buttonContainer,
            isSmallScreen
              ? styles.buttonContainerSmall
              : styles.buttonContainerLarge,
          ]}
        >
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push('/auth/register')}
            activeOpacity={0.9}
          >
            <Text style={styles.startButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#e5e5e5',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentSmall: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  contentLarge: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 24,
  },
  textSection: {
    maxWidth: 448,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontFamily: 'Inter-Bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 16,
  },
  titleSmall: {
    fontSize: 30,
    lineHeight: 36,
  },
  titleLarge: {
    fontSize: 36,
    lineHeight: 44,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
  },
  subtitleSmall: {
    fontSize: 16,
    lineHeight: 24,
  },
  subtitleLarge: {
    fontSize: 18,
    lineHeight: 28,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3F51B520',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureText: {
    fontSize: 15,
    lineHeight: 22,
  },
  featureBold: {
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  featureRegular: {
    fontFamily: 'Inter-Regular',
    color: '#475569',
  },
  noteContainer: {
    backgroundColor: '#3F51B51a',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#3F51B533',
  },
  noteText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-Medium',
    color: '#3F51B5',
  },
  buttonSafeArea: {
    backgroundColor: '#f6f6f8',
  },
  buttonContainer: {
    backgroundColor: '#f6f6f8',
  },
  buttonContainerSmall: {
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 24,
  },
  buttonContainerLarge: {
    paddingHorizontal: 32,
    paddingTop: 0,
    paddingBottom: 32,
  },
  startButton: {
    backgroundColor: '#3F51B5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#3F51B5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});
