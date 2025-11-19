import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MessageCircle, Globe } from 'lucide-react-native';

interface PrivateChat {
  id: string;
  userId: string;
  userName: string;
  handle: string;
  profilePicUrl: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  onlineStatus: boolean;
}

export default function ChatsScreen() {
  const [privateChats] = useState<PrivateChat[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Ethan Carter',
      handle: '@ethan_carter',
      profilePicUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      lastMessage: 'That sounds like a great idea! Let me know when you want to start.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      unreadCount: 2,
      onlineStatus: true,
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sophia Bennett',
      handle: '@sophia_b',
      profilePicUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      lastMessage: 'Thanks for the feedback on my artwork! Really appreciate it.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 0,
      onlineStatus: false,
    },
    {
      id: '3',
      userId: '3',
      userName: 'Liam Harper',
      handle: '@liam_h',
      profilePicUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      lastMessage: 'The hiking trail was amazing! You should definitely join next time.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 1,
      onlineStatus: true,
    },
  ]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return diffMins < 1 ? 'now' : `${diffMins}m`;
    } else if (diffDays < 1) {
      return `${diffHours}h`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Global Chat Card */}
        <TouchableOpacity 
          style={styles.globalChatCard}
          onPress={() => router.push('/(tabs)/global-chat-room')}
        >
          <View style={styles.globalChatIcon}>
            <Globe color="#FFFFFF" size={24} />
          </View>
          <View style={styles.globalChatContent}>
            <Text style={styles.globalChatTitle}>Global Chat</Text>
            <Text style={styles.globalChatSubtitle}>Join the community conversation</Text>
          </View>
          <View style={styles.globalChatBadge}>
            <Text style={styles.badgeText}>LIVE</Text>
          </View>
        </TouchableOpacity>

        {/* Private Chats Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Private Messages</Text>
        </View>

        {privateChats.length === 0 ? (
          <View style={styles.emptyState}>
            <MessageCircle color="#CCCCCC" size={48} />
            <Text style={styles.emptyStateTitle}>No conversations yet</Text>
            <Text style={styles.emptyStateText}>
              Start chatting with people you meet in the Explore section
            </Text>
          </View>
        ) : (
          privateChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => router.push(`/chat/private/${chat.userId}`)}
            >
              <View style={styles.chatAvatar}>
                <Image source={{ uri: chat.profilePicUrl }} style={styles.avatarImage} />
                <View style={[styles.onlineIndicator, chat.onlineStatus ? styles.online : styles.offline]} />
              </View>

              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.userName}</Text>
                  <Text style={styles.chatTime}>{formatTime(chat.lastMessageTime)}</Text>
                </View>
                <Text style={styles.chatHandle}>{chat.handle}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>

              {chat.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>
                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))
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
  content: {
    flex: 1,
  },
  globalChatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: '#2D63FF',
    borderRadius: 16,
  },
  globalChatIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  globalChatContent: {
    flex: 1,
  },
  globalChatTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  globalChatSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  globalChatBadge: {
    backgroundColor: '#FF4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#666666',
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
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  chatAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  chatTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  chatHandle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
    lineHeight: 18,
  },
  unreadBadge: {
    backgroundColor: '#2D63FF',
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});