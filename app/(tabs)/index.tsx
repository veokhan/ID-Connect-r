import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ListFilter as Filter } from 'lucide-react-native';
import { UserCard } from '@/components/UserCard';
import { mockUsers } from '@/data/mockUsers';

export default function ExploreScreen() {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => router.push('/search-filter')}
        >
          <Filter color="#0000FF" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.userGrid}>
          {filteredUsers.map((user) => (
            <View key={user.id} style={styles.cardWrapper}>
              <UserCard
                user={user}
                onChatPress={() => router.push(`/chat/private/${user.id}`)}
                onProfilePress={() => router.push(`/profile/${user.id}`)}
                onFriendPress={() => {
                  // TODO: Implement friend request logic
                  console.log('Friend request sent to', user.fullName);
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  filterButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  userGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});