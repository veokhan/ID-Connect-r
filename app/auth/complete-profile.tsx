/* import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Edit2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function CompleteProfileScreen() {
  const [profileImage, setProfileImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuBuYJPdAX6z_Wd3TRQq943yoSB7T9kAr6ehWBnOalTwtSFqIjaTg3HhAFoy8TggBbj-Q2JEeFlf1kvvLyrgSwApsputNgBekM0BTUsHEVnWtt8REUjNV_uCyme3OapgdytUhRISGWdIfjPOZPdOjZnrIPziGGbkwcMHSrBJY0_9_o8zO0LUKFNwZ682jrEoPVOlzNlTxfZjIucfxFFxiyZ0DaKIwqlqUL4o6NCdbNhjZuZTAKeQNu9k-VNsK4P5PzJaxdyk1XfVTqM');
  const [fullName, setFullName] = useState('');
  const [handle, setHandle] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    if (!fullName || !handle || !age || !city || !country || !bio) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageSection}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Edit2 color="#FFFFFF" size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageTextContainer}>
            <Text style={styles.imageTitle}>Add a profile photo</Text>
            <Text style={styles.imageSubtitle}>This helps people recognize you.</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Handle</Text>
              <TextInput
                style={styles.input}
                placeholder="@johndoe"
                placeholderTextColor="#94a3b8"
                value={handle}
                onChangeText={(text) => setHandle(text.startsWith('@') ? text : `@${text}`)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="25"
                placeholderTextColor="#94a3b8"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#0f172a"
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="New York"
                placeholderTextColor="#94a3b8"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="USA"
                placeholderTextColor="#94a3b8"
                value={country}
                onChangeText={setCountry}
              />
            </View>
          </View>

          <View style={styles.fullInput}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Short bio (100 characters max)"
              placeholderTextColor="#94a3b8"
              value={bio}
              onChangeText={setBio}
              maxLength={100}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.continueButton, loading && styles.disabledButton]}
          onPress={handleContinue}
          disabled={loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? 'Saving...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#0f172a',
    textAlign: 'center',
    flex: 1,
    paddingRight: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 16,
  },
  imageContainer: {
    position: 'relative',
    width: 128,
    height: 128,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 64,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1313ec',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageTextContainer: {
    alignItems: 'center',
  },
  imageTitle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  imageSubtitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#64748b',
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  fullInput: {
    // No special styles needed for full width
  },
  label: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0f172a',
    borderWidth: 0,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: 48,
    color: '#0f172a',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    backgroundColor: 'transparent',
  },
  pickerItem: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#0f172a',
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f6f6f8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  continueButton: {
    backgroundColor: '#1313ec',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
}); */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Edit2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default function CompleteProfileScreen() {
  const [profileImage, setProfileImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuBuYJPdAX6z_Wd3TRQq943yoSB7T9kAr6ehWBnOalTwtSFqIjaTg3HhAFoy8TggBbj-Q2JEeFlf1kvvLyrgSwApsputNgBekM0BTUsHEVnWtt8REUjNV_uCyme3OapgdytUhRISGWdIfjPOZPdOjZnrIPziGGbkwcMHSrBJY0_9_o8zO0LUKFNwZ682jrEoPVOlzNlTxfZjIucfxFFxiyZ0DaKIwqlqUL4o6NCdbNhjZuZTAKeQNu9k-VNsK4P5PzJaxdyk1XfVTqM');
  const [fullName, setFullName] = useState('');
  const [handle, setHandle] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleContinue = async () => {
    if (!fullName || !handle || !age || !city || !country || !bio) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#1e293b" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageSection}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
              <Edit2 color="#FFFFFF" size={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.imageTextContainer}>
            <Text style={styles.imageTitle}>Add a profile photo</Text>
            <Text style={styles.imageSubtitle}>This helps people recognize you.</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#94a3b8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Handle</Text>
              <TextInput
                style={styles.input}
                placeholder="@johndoe"
                placeholderTextColor="#94a3b8"
                value={handle}
                onChangeText={(text) => setHandle(text.startsWith('@') ? text : `@${text}`)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="25"
                placeholderTextColor="#94a3b8"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            {/* UPDATED GENDER DROPDOWN */}
            <View style={styles.halfInput}>
              <Text style={styles.label}>Gender</Text>

              <View style={styles.dropdownWrapper}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.dropdownPicker}
                  dropdownIconColor="#0f172a"
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="New York"
                placeholderTextColor="#94a3b8"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="USA"
                placeholderTextColor="#94a3b8"
                value={country}
                onChangeText={setCountry}
              />
            </View>
          </View>

          <View style={styles.fullInput}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Short bio (100 characters max)"
              placeholderTextColor="#94a3b8"
              value={bio}
              onChangeText={setBio}
              maxLength={100}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.continueButton, loading && styles.disabledButton]}
          onPress={handleContinue}
          disabled={loading}
        >
          <Text style={styles.continueButtonText}>
            {loading ? 'Saving...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#0f172a',
    textAlign: 'center',
    flex: 1,
    paddingRight: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 16,
  },
  imageContainer: {
    position: 'relative',
    width: 128,
    height: 128,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 64,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1313ec',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageTextContainer: {
    alignItems: 'center',
  },
  imageTitle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  imageSubtitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#64748b',
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#374151',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#0f172a',
    borderWidth: 0,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },

  /* NEW DROPDOWN STYLES */
  dropdownWrapper: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  dropdownPicker: {
    height: 50,
    color: '#0f172a',
    fontSize: 16,
  },

  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f6f6f8',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  continueButton: {
    backgroundColor: '#1313ec',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
