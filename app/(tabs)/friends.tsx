import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MessageCircle, Check, X, Users } from 'lucide-react-native';

interface FriendRequest {
  id: string;
  userId: string;
  userName: string;
  handle: string;
  profilePicUrl: string;
  mutualFriends: number;
  requestedAt: Date;
}

interface Friend {
  id: string;
  userId: string;
  userName: string;
  handle: string;
  profilePicUrl: string;
  onlineStatus: boolean;
  lastSeen?: Date;
}

export default function FriendsScreen() {
  const [activeTab, setActiveTab] = useState<'requests' | 'friends'>('requests');
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: '1',
      userId: '5',
      userName: 'Marcus Johnson',
      handle: '@marcus_j',
      profilePicUrl: 'https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg',
      mutualFriends: 2,
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    },
    {
      id: '2',
      userId: '6',
      userName: 'Emma Thompson',
      handle: '@emma_t',
      profilePicUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      mutualFriends: 1,
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    },
  ]);

  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Ethan Carter',
      handle: '@ethan_carter',
      profilePicUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      onlineStatus: true,
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sophia Bennett',
      handle: '@sophia_b',
      profilePicUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      onlineStatus: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: '3',
      userId: '3',
      userName: 'Liam Harper',
      handle: '@liam_h',
      profilePicUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      onlineStatus: true,
    },
  ]);

  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find(req => req.id === requestId);
    if (request) {
      // Add to friends list
      const newFriend: Friend = {
        id: Date.now().toString(),
        userId: request.userId,
        userName: request.userName,
        handle: request.handle,
        profilePicUrl: request.profilePicUrl,
        onlineStatus: Math.random() > 0.5, // Random online status for demo
      };
      setFriends(prev => [newFriend, ...prev]);

      // Remove from requests
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    }
  };

  const handleDeclineRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return diffMins < 1 ? 'just now' : `${diffMins}m ago`;
    } else if (diffDays < 1) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Friends</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests {friendRequests.length > 0 && `(${friendRequests.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends {friends.length > 0 && `(${friends.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'requests' ? (
          friendRequests.length === 0 ? (
            <View style={styles.emptyState}>
              <Users color="#CCCCCC" size={48} />
              <Text style={styles.emptyStateTitle}>No friend requests</Text>
              <Text style={styles.emptyStateText}>
                When someone sends you a friend request, it will appear here.
              </Text>
            </View>
          ) : (
            friendRequests.map((request) => (
              <View key={request.id} style={styles.requestItem}>
                <Image source={{ uri: request.profilePicUrl }} style={styles.avatar} />

                <View style={styles.requestContent}>
                  <Text style={styles.userName}>{request.userName}</Text>
                  <Text style={styles.handle}>{request.handle}</Text>
                  {request.mutualFriends > 0 && (
                    <Text style={styles.mutualFriends}>
                      {request.mutualFriends} mutual friend{request.mutualFriends !== 1 ? 's' : ''}
                    </Text>
                  )}
                  <Text style={styles.requestTime}>{formatTime(request.requestedAt)}</Text>
                </View>

                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptRequest(request.id)}
                  >
                    <Check color="#FFFFFF" size={18} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => handleDeclineRequest(request.id)}
                  >
                    <X color="#FF4757" size={18} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )
        ) : (
          friends.length === 0 ? (
            <View style={styles.emptyState}>
              <Users color="#CCCCCC" size={48} />
              <Text style={styles.emptyStateTitle}>No friends yet</Text>
              <Text style={styles.emptyStateText}>
                Start connecting with people in the Explore section to build your friend network.
              </Text>
            </View>
          ) : (
            friends.map((friend) => (
              <View key={friend.id} style={styles.friendItem}>
                <View style={styles.friendAvatar}>
                  <Image source={{ uri: friend.profilePicUrl }} style={styles.avatar} />
                  <View style={[styles.onlineIndicator, friend.onlineStatus ? styles.online : styles.offline]} />
                </View>

                <View style={styles.friendContent}>
                  <Text style={styles.userName}>{friend.userName}</Text>
                  <Text style={styles.handle}>{friend.handle}</Text>
                  <Text style={styles.statusText}>
                    {friend.onlineStatus ? 'Online' : `Last seen ${formatTime(friend.lastSeen || new Date())}`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.chatIconButton}
                  onPress={() => router.push(`/chat/private/${friend.userId}`)}
                >
                  <MessageCircle color="#2D63FF" size={24} />
                </TouchableOpacity>
              </View>
            ))
          )
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1A1A1A',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F7FA',
    margin: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666666',
  },
  activeTabText: {
    color: '#2D63FF',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  requestContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  handle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 4,
  },
  mutualFriends: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#2D63FF',
    marginBottom: 2,
  },
  requestTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF4757',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  friendAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  online: {
    backgroundColor: '#4CAF50',
  },
  offline: {
    backgroundColor: '#999999',
  },
  friendContent: {
    flex: 1,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  chatIconButton: {
    padding: 8,
  },
});