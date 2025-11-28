import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Smile, Paperclip, Send } from 'lucide-react-native';

interface PrivateChat {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  onlineStatus: boolean;
  profilePicUrl: string;
}

interface GlobalMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
  profilePicUrl: string;
  isCurrentUser: boolean;
  isSystemMessage?: boolean;
}

export default function ChatsScreen() {
  const [activeTab, setActiveTab] = useState<'global' | 'private'>('private');
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const [privateChats] = useState<PrivateChat[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Alex Stanton',
      profilePicUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      lastMessage: 'Sounds good, see you then!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
      unreadCount: 2,
      onlineStatus: true,
    },
    {
      id: '2',
      userId: '2',
      userName: 'Beatrice Miller',
      profilePicUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      lastMessage: "That sounds lovely! I'm in.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 0,
      onlineStatus: false,
    },
    {
      id: '3',
      userId: '3',
      userName: 'Carlos Gomez',
      profilePicUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      lastMessage: "You: Great, I'll bring the chips.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      unreadCount: 0,
      onlineStatus: false,
    },
    {
      id: '4',
      userId: '4',
      userName: 'Daniela',
      profilePicUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      lastMessage: 'Park sounds great.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      unreadCount: 0,
      onlineStatus: true,
    },
  ]);

  const [globalMessages] = useState<GlobalMessage[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Alex Stanton',
      profilePicUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      text: "Hey everyone, what's the plan for the weekend?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isCurrentUser: false,
    },
    {
      id: '2',
      userId: 'current',
      userName: 'You',
      profilePicUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      text: "I was thinking of heading to the park if the weather's good!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.95),
      isCurrentUser: true,
    },
    {
      id: '3',
      userId: '2',
      userName: 'Beatrice Miller',
      profilePicUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      text: "That sounds lovely! I'm in.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9),
      isCurrentUser: false,
    },
    {
      id: '4',
      userId: '3',
      userName: 'Carlos Gomez',
      profilePicUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      text: 'Count me in too! Should we bring some snacks?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.85),
      isCurrentUser: false,
    },
    {
      id: '5',
      userId: 'system',
      userName: 'System',
      profilePicUrl: '',
      text: 'Daniela has joined the chat',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8),
      isCurrentUser: false,
      isSystemMessage: true,
    },
    {
      id: '6',
      userId: '4',
      userName: 'Daniela',
      profilePicUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      text: 'Hey everyone! Park sounds great.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.75),
      isCurrentUser: false,
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
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const sendMessage = () => {
    if (message.trim()) {
      setMessage('');
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <ArrowLeft color="#1A1A1A" size={24} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'global' && styles.tabActive]}
          onPress={() => setActiveTab('global')}
        >
          <Text style={[styles.tabText, activeTab === 'global' && styles.tabTextActive]}>
            Global
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'private' && styles.tabActive]}
          onPress={() => setActiveTab('private')}
        >
          <Text style={[styles.tabText, activeTab === 'private' && styles.tabTextActive]}>
            Private
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'private' ? (
        <ScrollView style={styles.content}>
          {privateChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => router.push(`/chat/private/${chat.userId}`)}
            >
              <View style={styles.chatAvatar}>
                <Image source={{ uri: chat.profilePicUrl }} style={styles.avatarImage} />
                {chat.onlineStatus && <View style={styles.onlineIndicator} />}
              </View>

              <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.userName}</Text>
                  <Text style={styles.chatTime}>{formatTime(chat.lastMessageTime)}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>

              {chat.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <KeyboardAvoidingView
          style={styles.globalChatContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {globalMessages.map((msg) => {
              if (msg.isSystemMessage) {
                return (
                  <View key={msg.id} style={styles.systemMessageContainer}>
                    <Text style={styles.systemMessageText}>{msg.text}</Text>
                  </View>
                );
              }

              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageRow,
                    msg.isCurrentUser && styles.messageRowReverse,
                  ]}
                >
                  {!msg.isCurrentUser && (
                    <Image source={{ uri: msg.profilePicUrl }} style={styles.messageAvatar} />
                  )}
                  <View
                    style={[
                      styles.messageBubbleContainer,
                      msg.isCurrentUser && styles.messageBubbleContainerRight,
                    ]}
                  >
                    {!msg.isCurrentUser && (
                      <Text style={styles.messageSender}>
                        {msg.userName} {formatMessageTime(msg.timestamp)}
                      </Text>
                    )}
                    {msg.isCurrentUser && (
                      <Text style={styles.messageSenderRight}>
                        You {formatMessageTime(msg.timestamp)}
                      </Text>
                    )}
                    <View
                      style={[
                        styles.messageBubble,
                        msg.isCurrentUser ? styles.messageBubbleUser : styles.messageBubbleOther,
                      ]}
                    >
                      <Text
                        style={[
                          styles.messageText,
                          msg.isCurrentUser && styles.messageTextUser,
                        ]}
                      >
                        {msg.text}
                      </Text>
                    </View>
                  </View>
                  {msg.isCurrentUser && (
                    <Image source={{ uri: msg.profilePicUrl }} style={styles.messageAvatar} />
                  )}
                </View>
              );
            })}
          </ScrollView>

          {/* Input Area */}
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.inputButton}>
              <Smile color="#8E8E93" size={24} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#999999"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.inputButton}>
              <Paperclip color="#8E8E93" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <Send color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
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
    backgroundColor: '#FFFFFF',
  },
  headerButton: {
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#F0F0F0',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  tabText: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#666666',
  },
  tabTextActive: {
    color: '#1A1A1A',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  chatAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1A1A1A',
  },
  chatTime: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  unreadBadge: {
    backgroundColor: '#2D63FF',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  globalChatContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  systemMessageText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  messageRowReverse: {
    flexDirection: 'row-reverse',
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 8,
  },
  messageBubbleContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  messageBubbleContainerRight: {
    alignItems: 'flex-end',
  },
  messageSender: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#1A1A1A',
    marginBottom: 4,
    marginLeft: 4,
  },
  messageSenderRight: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#1A1A1A',
    marginBottom: 4,
    marginRight: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageBubbleOther: {
    backgroundColor: '#EFEFEF',
    borderTopLeftRadius: 4,
  },
  messageBubbleUser: {
    backgroundColor: '#2D63FF',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
    lineHeight: 20,
  },
  messageTextUser: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  inputButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2D63FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
