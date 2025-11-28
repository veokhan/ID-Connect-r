import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Pencil, ChevronDown } from 'lucide-react-native';

export default function CompleteProfileScreen() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    handle: '@johndoe',
    age: '25',
    gender: 'Male',
    city: 'New York',
    country: 'USA',
    bio: '',
    profilePicUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
  });

  const [selectedTab, setSelectedTab] = useState<'education' | 'work'>('education');
  const [institutionName, setInstitutionName] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const updateField = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    console.log('Profile data:', profileData);
    console.log('Selected tab:', selectedTab);
    console.log('Institution:', institutionName);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Photo Section */}
          <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
              <Image source={{ uri: profileData.profilePicUrl }} style={styles.profilePhoto} />
              <TouchableOpacity style={styles.editPhotoButton}>
                <Pencil color="#FFFFFF" size={16} />
              </TouchableOpacity>
            </View>
            <Text style={styles.photoTitle}>Add a profile photo</Text>
            <Text style={styles.photoSubtitle}>This helps people recognize you.</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            {/* Name and Handle Row */}
            <View style={styles.formRow}>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Name</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={profileData.name}
                  onChangeText={(value) => updateField('name', value)}
                  placeholder="Your name"
                  placeholderTextColor="#999999"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Handle</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={profileData.handle}
                  onChangeText={(value) => updateField('handle', value)}
                  placeholder="@username"
                  placeholderTextColor="#999999"
                />
              </View>
            </View>

            {/* Age and Gender Row */}
            <View style={styles.formRow}>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Age</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={profileData.age}
                  onChangeText={(value) => updateField('age', value)}
                  placeholder="25"
                  placeholderTextColor="#999999"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.formFieldDropdown}>
                <Text style={styles.fieldLabel}>Gender</Text>
                <TouchableOpacity 
                  style={styles.dropdownField}
                  onPress={() => setShowGenderDropdown(!showGenderDropdown)}
                >
                  <Text style={styles.dropdownText}>{profileData.gender}</Text>
                  <ChevronDown color="#666666" size={20} />
                </TouchableOpacity>
                {showGenderDropdown && (
                  <View style={styles.dropdownMenu}>
                    {genderOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={styles.dropdownOption}
                        onPress={() => {
                          updateField('gender', option);
                          setShowGenderDropdown(false);
                        }}
                      >
                        <Text style={[
                          styles.dropdownOptionText,
                          option === profileData.gender && styles.dropdownOptionSelected
                        ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>

            {/* City and Country Row */}
            <View style={styles.formRow}>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>City</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={profileData.city}
                  onChangeText={(value) => updateField('city', value)}
                  placeholder="Your city"
                  placeholderTextColor="#999999"
                />
              </View>
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Country</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={profileData.country}
                  onChangeText={(value) => updateField('country', value)}
                  placeholder="Your country"
                  placeholderTextColor="#999999"
                />
              </View>
            </View>

            {/* Bio Field */}
            <View style={styles.bioSection}>
              <Text style={styles.fieldLabel}>Bio</Text>
              <TextInput
                style={styles.bioInput}
                value={profileData.bio}
                onChangeText={(value) => {
                  if (value.length <= 100) {
                    updateField('bio', value);
                  }
                }}
                placeholder="Short bio (100 characters max)"
                placeholderTextColor="#999999"
                multiline
                maxLength={100}
              />
            </View>

            {/* Education/Work Toggle */}
            <View style={styles.toggleSection}>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={styles.toggleOption}
                  onPress={() => setSelectedTab('education')}
                >
                  <View style={[
                    styles.radioOuter,
                    selectedTab === 'education' && styles.radioOuterSelected
                  ]}>
                    {selectedTab === 'education' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.toggleText}>Education</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.toggleOption}
                  onPress={() => setSelectedTab('work')}
                >
                  <View style={[
                    styles.radioOuter,
                    selectedTab === 'work' && styles.radioOuterSelected
                  ]}>
                    {selectedTab === 'work' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.toggleText}>Work</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Institution Name Field */}
            <View style={styles.institutionSection}>
              <Text style={styles.fieldLabel}>Institution Name</Text>
              <TextInput
                style={styles.fieldInput}
                value={institutionName}
                onChangeText={setInstitutionName}
                placeholder={selectedTab === 'education' ? 'e.g. Stanford University' : 'e.g. Google Inc.'}
                placeholderTextColor="#999999"
              />
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  headerSpacer: {
    width: 40,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#F5F5F5',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2D63FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F5F5F5',
  },
  photoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  photoSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    flex: 1,
  },
  formRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  formField: {
    flex: 1,
  },
  formFieldDropdown: {
    flex: 1,
    zIndex: 100,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
    marginBottom: 8,
  },
  fieldInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  dropdownField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
  },
  dropdownOptionSelected: {
    color: '#2D63FF',
    fontFamily: 'Inter-Medium',
  },
  bioSection: {
    marginBottom: 24,
  },
  bioInput: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 0,
    minHeight: 40,
  },
  toggleSection: {
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 32,
  },
  toggleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#2D63FF',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2D63FF',
  },
  toggleText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
  },
  institutionSection: {
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  continueButton: {
    backgroundColor: '#2D63FF',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});
