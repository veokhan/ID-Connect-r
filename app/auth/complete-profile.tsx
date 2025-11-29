import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, Edit2, ChevronDown, MapPin } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const defaultAvatar = require("../../assets/default-avatar.png");

export default function CompleteProfileScreen() {
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [fullName, setFullName] = useState("");
  const [handle, setHandle] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [occupationType, setOccupationType] = useState<"education" | "work">(
    "education"
  );
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [degreeDropdownVisible, setDegreeDropdownVisible] = useState(false);
  const [intermediateDropdownVisible, setIntermediateDropdownVisible] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedIntermediateGroup, setSelectedIntermediateGroup] = useState("");
  const [savedInstitutions, setSavedInstitutions] = useState<string[]>([]);
  const [savedCompanies, setSavedCompanies] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedInstitutions = await AsyncStorage.getItem('saved_institutions');
      if (storedInstitutions) {
        setSavedInstitutions(JSON.parse(storedInstitutions));
      }
      const storedCompanies = await AsyncStorage.getItem('saved_companies');
      if (storedCompanies) {
        setSavedCompanies(JSON.parse(storedCompanies));
      }
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const handleInstitutionChange = (text: string) => {
    setInstitution(text);
    if (text.length > 0) {
      const source = occupationType === "education" ? savedInstitutions : savedCompanies;
      const filtered = source.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectInstitution = (name: string) => {
    setInstitution(name);
    setShowSuggestions(false);
  };

  const degreeOptions = ["Primary", "Middle", "Matric", "Intermediate"];
  const intermediateOptions = [
    "F.Sc (Pre-Medical)",
    "F.Sc (Pre-Engineering)",
    "F.A (Arts / Humanities)",
    "ICS (Computer Science)",
    "I.Com (Commerce)",
    "DAE (Diploma of Associate Engineering)",
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const fetchLocation = async () => {
    try {
      setFetchingLocation(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to auto-fill your location."
        );
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const [address] = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      if (address) {
        const parts = [];
        if (address.street) parts.push(address.street);
        if (address.district) parts.push(address.district);
        if (address.city) parts.push(address.city);
        if (address.region) parts.push(address.region);
        if (address.country) parts.push(address.country);

        if (parts.length > 0) setLocation(parts.join(", "));
      }
    } catch {
      Alert.alert("Error", "Failed to fetch location. Please try again.");
    } finally {
      setFetchingLocation(false);
    }
  };

  const handleContinue = async () => {
    const isEducation = occupationType === "education";
    const isWork = occupationType === "work";

    if (
      !fullName ||
      !handle ||
      !age ||
      !location ||
      !bio ||
      !institution ||
      (isWork && !role) ||
      (isEducation && !selectedDegree) ||
      (isEducation && selectedDegree === "Intermediate" && !selectedIntermediateGroup)
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (institution) {
      if (isEducation) {
        const newInstitutions = Array.from(new Set([...savedInstitutions, institution]));
        setSavedInstitutions(newInstitutions);
        AsyncStorage.setItem('saved_institutions', JSON.stringify(newInstitutions)).catch(e => console.error(e));
      } else if (isWork) {
        const newCompanies = Array.from(new Set([...savedCompanies, institution]));
        setSavedCompanies(newCompanies);
        AsyncStorage.setItem('saved_companies', JSON.stringify(newCompanies)).catch(e => console.error(e));
      }
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Error", "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBorderColor = (field: string) =>
    focusedField === field ? "#3F51B5" : "#CBD5E1";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Complete Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Profile Image */}
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <Image source={profileImage} style={styles.profileImage} />
            <TouchableOpacity style={styles.editButton} onPress={pickImage}>
              <Edit2 size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileTitle}>Add a profile photo</Text>
          <Text style={styles.profileSubtitle}>
            This helps people recognize you.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name & Handle */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input, { borderColor: getBorderColor("fullName") }]}
                placeholder="John Doe"
                placeholderTextColor="#a0a0c0"
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Handle</Text>
              <TextInput
                style={[styles.input, { borderColor: getBorderColor("handle") }]}
                placeholder="@johndoe"
                placeholderTextColor="#a0a0c0"
                value={handle}
                onChangeText={(t) => setHandle(t.startsWith("@") ? t : `@${t}`)}
                onFocus={() => setFocusedField("handle")}
                onBlur={() => setFocusedField(null)}
              />
            </View>
          </View>

          {/* Age & Gender */}
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={[styles.input, { borderColor: getBorderColor("age") }]}
                placeholder="25"
                placeholderTextColor="#a0a0c0"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                onFocus={() => setFocusedField("age")}
                onBlur={() => setFocusedField(null)}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Gender</Text>
              <TouchableOpacity
                style={[styles.dropdown, { borderColor: getBorderColor("gender") }]}
                onPress={() => setGenderDropdownVisible(true)}
              >
                <Text style={styles.dropdownText}>{gender}</Text>
                <ChevronDown size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Location */}
          <View style={styles.fullInput}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.locationWrapper}>
              <TextInput
                style={[
                  styles.input,
                  styles.locationInput,
                  { borderColor: getBorderColor("location") },
                ]}
                placeholder="New York, USA"
                placeholderTextColor="#a0a0c0"
                value={location}
                onChangeText={setLocation}
                onFocus={() => setFocusedField("location")}
                onBlur={() => setFocusedField(null)}
              />
              <TouchableOpacity
                style={styles.locationButton}
                onPress={fetchLocation}
                disabled={fetchingLocation}
              >
                <MapPin
                  size={20}
                  color={fetchingLocation ? "#9CA3AF" : "#3F51B5"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.fullInput}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[
                styles.input,
                styles.bioInput,
                { borderColor: getBorderColor("bio") },
              ]}
              placeholder="Short bio (100 characters max)"
              placeholderTextColor="#a0a0c0"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={3}
              onFocus={() => setFocusedField("bio")}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View style={styles.divider} />

          {/* Occupation */}
          <View style={styles.occupation}>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setOccupationType("education")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    occupationType === "education" && styles.radioOuterSelected,
                  ]}
                >
                  {occupationType === "education" && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>Education</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setOccupationType("work")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    occupationType === "work" && styles.radioOuterSelected,
                  ]}
                >
                  {occupationType === "work" && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>Work</Text>
              </TouchableOpacity>
            </View>

            {/* Institution / Role */}
            <View style={styles.fullInput}>
              <Text style={styles.label}>
                {occupationType === "education"
                  ? "Institution Name"
                  : "Company Name"}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: getBorderColor("institution") },
                ]}
                placeholder={
                  occupationType === "education"
                    ? "e.g. Stanford University"
                    : "e.g. Google"
                }
                placeholderTextColor="#a0a0c0"
                value={institution}
                onChangeText={handleInstitutionChange}
                onFocus={() => {
                  setFocusedField("institution");
                  if (institution) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setFocusedField(null);
                  // Delay hiding suggestions to allow click
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  <FlatList
                    data={filteredSuggestions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.suggestionItem}
                        onPress={() => selectInstitution(item)}
                      >
                        <Text style={styles.suggestionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                  />
                </View>
              )}
            </View>

            <View style={styles.fullInput}>
              <Text style={styles.label}>
                {occupationType === "education" ? "Degree Level" : "Role"}
              </Text>
              {occupationType === "education" ? (
                <>
                  <TouchableOpacity
                    style={[
                      styles.dropdown,
                      { borderColor: getBorderColor("degree") },
                    ]}
                    onPress={() => setDegreeDropdownVisible(true)}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        !selectedDegree && { color: "#a0a0c0" },
                      ]}
                    >
                      {selectedDegree || "Select Degree Level"}
                    </Text>
                    <ChevronDown size={20} color="#6B7280" />
                  </TouchableOpacity>

                  {selectedDegree === "Intermediate" && (
                    <View style={{ marginTop: 16 }}>
                      <Text style={styles.label}>Intermediate Group</Text>
                      <TouchableOpacity
                        style={[
                          styles.dropdown,
                          { borderColor: getBorderColor("intermediate") },
                        ]}
                        onPress={() => setIntermediateDropdownVisible(true)}
                      >
                        <Text
                          style={[
                            styles.dropdownText,
                            !selectedIntermediateGroup && { color: "#a0a0c0" },
                          ]}
                        >
                          {selectedIntermediateGroup || "Select Group"}
                        </Text>
                        <ChevronDown size={20} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              ) : (
                <TextInput
                  style={[
                    styles.input,
                    { borderColor: getBorderColor("role") },
                  ]}
                  placeholder="e.g. Software Engineer"
                  placeholderTextColor="#a0a0c0"
                  value={role}
                  onChangeText={setRole}
                  onFocus={() => setFocusedField("role")}
                  onBlur={() => setFocusedField(null)}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Gender Modal */}
      <Modal
        visible={genderDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setGenderDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setGenderDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {["Male", "Female", "Other"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  gender === option && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setGender(option);
                  setGenderDropdownVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    gender === option && styles.modalOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {gender === option && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Degree Modal */}
      <Modal
        visible={degreeDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDegreeDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDegreeDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Degree Level</Text>
            {degreeOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  selectedDegree === option && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setSelectedDegree(option);
                  if (option !== "Intermediate") {
                    setSelectedIntermediateGroup("");
                  }
                  setDegreeDropdownVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedDegree === option && styles.modalOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {selectedDegree === option && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Intermediate Group Modal */}
      <Modal
        visible={intermediateDropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIntermediateDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIntermediateDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Group</Text>
            {intermediateOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption,
                  selectedIntermediateGroup === option &&
                  styles.modalOptionSelected,
                ]}
                onPress={() => {
                  setSelectedIntermediateGroup(option);
                  setIntermediateDropdownVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedIntermediateGroup === option &&
                    styles.modalOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {selectedIntermediateGroup === option && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, loading && styles.disabledButton]}
          onPress={handleContinue}
          disabled={loading}
        >
          <Text style={styles.continueText}>
            {loading ? "Saving..." : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },

  content: { paddingHorizontal: 24 },

  profileSection: { alignItems: "center", paddingVertical: 24 },
  imageContainer: { position: "relative", width: 128, height: 128 },
  profileImage: { width: "100%", height: "100%", borderRadius: 64 },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F8FAFC",
  },
  profileTitle: { fontSize: 18, fontWeight: "700", marginTop: 8, color: "#111827" },
  profileSubtitle: { fontSize: 14, color: "#6B7280", marginTop: 2 },

  form: { marginTop: 16, gap: 20 },
  row: { flexDirection: "row", gap: 16 },
  halfInput: { flex: 1 },
  fullInput: { width: "100%" },
  label: { fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 6 },
  input: {
    height: 50,
    borderBottomWidth: 1,
    paddingHorizontal: 4,
    fontSize: 16,
    color: "#111827",
  },
  bioInput: { minHeight: 90, textAlignVertical: "top" },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderBottomWidth: 1,
  },
  dropdownText: { fontSize: 16, color: "#111827" },
  locationWrapper: { position: "relative" },
  locationInput: { paddingRight: 50 },
  locationButton: {
    position: "absolute",
    right: 0,
    top: 10,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 16 },

  occupation: { gap: 16 },
  radioGroup: { flexDirection: "row", gap: 24 },
  radioButton: { flexDirection: "row", alignItems: "center", gap: 8 },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: { borderColor: "#3F51B5" },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#3F51B5" },
  radioLabel: { fontSize: 16, fontWeight: "500", color: "#111827" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 24 },
  modalContent: { backgroundColor: "#FFF", borderRadius: 12, paddingVertical: 16 },
  modalTitle: { fontSize: 18, fontWeight: "700", paddingHorizontal: 16, marginBottom: 8 },
  modalOption: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 16, paddingHorizontal: 16 },
  modalOptionSelected: { backgroundColor: "#EFF6FF" },
  modalOptionText: { fontSize: 16, color: "#374151" },
  modalOptionTextSelected: { color: "#3F51B5", fontWeight: "600" },
  checkmark: { color: "#3F51B5", fontWeight: "700" },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(248,250,252,0.95)",
  },
  continueButton: {
    backgroundColor: "#3F51B5",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#3F51B5",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  disabledButton: { opacity: 0.6 },
  continueText: { color: "white", fontSize: 18, fontWeight: "700" },
  suggestionsContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 150,
    marginTop: -1,
    zIndex: 10,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  suggestionText: {
    fontSize: 14,
    color: "#334155",
  },
});
