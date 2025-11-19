import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit2, MapPin, Briefcase, GraduationCap, Plus } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MyProfileScreen() {
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    handle: '@johndoe',
    age: 25,
    gender: 'Male',
    country: 'USA',
    city: 'New York',
    bio: 'Tech enthusiast and coffee lover. Always exploring new ideas and meeting interesting people.',
    profilePicUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
    interests: ['Technology', 'Coffee', 'Travel', 'Photography'],
    skills: ['JavaScript', 'React Native', 'UI/UX Design'],
    education: 'Computer Science, NYU',
    occupation: 'Software Developer',
    gallery: [
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      'https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg',
    ]
  });

  const addGalleryImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileData(prev => ({
        ...prev,
        gallery: [...prev.gallery, result.assets[0].uri]
      }));
    }
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality would be implemented here.');
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'UK': '🇬🇧',
      'Australia': '🇦🇺',
    };
    return flags[country] || '🌍';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Edit2 color="#2D63FF" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: profileData.profilePicUrl }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.fullName}</Text>
            <Text style={styles.profileHandle}>{profileData.handle}</Text>
            <View style={styles.profileMeta}>
              <Text style={styles.profileAge}>{profileData.age} years old</Text>
              <Text style={styles.profileLocation}>
                {getCountryFlag(profileData.country)} {profileData.city}, {profileData.country}
              </Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bioText}>{profileData.bio}</Text>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.tagsContainer}>
            {profileData.interests.map((interest, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.tagsContainer}>
            {profileData.skills.map((skill, index) => (
              <View key={index} style={[styles.tag, styles.skillTag]}>
                <Text style={[styles.tagText, styles.skillTagText]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education & Work Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background</Text>
          
          <View style={styles.backgroundItem}>
            <GraduationCap color="#666666" size={20} />
            <Text style={styles.backgroundText}>{profileData.education}</Text>
          </View>
          
          <View style={styles.backgroundItem}>
            <Briefcase color="#666666" size={20} />
            <Text style={styles.backgroundText}>{profileData.occupation}</Text>
          </View>
        </View>

        {/* Gallery Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <TouchableOpacity style={styles.addButton} onPress={addGalleryImage}>
              <Plus color="#2D63FF" size={20} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.galleryGrid}>
            {profileData.gallery.map((image, index) => (
              <TouchableOpacity key={index} style={styles.galleryItem}>
                <Image source={{ uri: image }} style={styles.galleryImage} />
              </TouchableOpacity>
            ))}
            
            {profileData.gallery.length === 0 && (
              <View style={styles.emptyGallery}>
                <Plus color="#CCCCCC" size={32} />
                <Text style={styles.emptyGalleryText}>Add your first photo</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
  },
  editButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 12,
  },
  profileMeta: {
    alignItems: 'center',
    gap: 4,
  },
  profileAge: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1A1A1A',
  },
  profileLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  section: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  bioText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E8F1FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#2D63FF',
  },
  skillTag: {
    backgroundColor: '#F0F0F0',
  },
  skillTagText: {
    color: '#666666',
  },
  backgroundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  backgroundText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D63FF',
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  galleryItem: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  emptyGallery: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyGalleryText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    marginTop: 8,
  },
});