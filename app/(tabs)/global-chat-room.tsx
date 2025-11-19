import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ChevronDown } from 'lucide-react-native';

interface GlobalMessage {
  id: string;
  userId: string;
  handle: string;
  profilePicUrl: string;
  text: string;
  timestamp: Date;
}

export default function GlobalChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<GlobalMessage[]>([
    {
      id: '1',
      userId: '1',
      handle: '@ethan_carter',
      profilePicUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      text: 'Hey everyone! Hope you\'re having a great day! 👋',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: '2',
      userId: '2',
      handle: '@sophia_b',
      profilePicUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      text: 'Just finished a new painting! The sunset was incredible today 🎨',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    },
    {
      id: '3',
      userId: '3',
      handle: '@liam_h',
      profilePicUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      text: 'Anyone else excited for the weekend hiking trip? The weather looks perfect! ⛰️',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
    },
    {
      id: '4',
      userId: '4',
      handle: '@olivia_r',
      profilePicUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      text: 'Just tried this amazing new recipe! Who wants the details? 🍝',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: '5',
      userId: '5',
      handle: '@marcus_j',
      profilePicUrl: 'https://images.pexels.com/photos/1024966/pexels-photo-1024966.jpeg',
      text: 'Morning workout complete! Remember, consistency is key 💪',
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    },
  ]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: GlobalMessage = {
        id: Date.now().toString(),
        userId: 'current_user',
        handle: '@you',
        profilePicUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
        text: message.trim(),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Auto scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
    setShowScrollButton(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    setShowScrollButton(!isAtBottom);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Global Chat</Text>
        <Text style={styles.headerSubtitle}>{messages.length} messages</Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={styles.messageRow}>
              <Image source={{ uri: msg.profilePicUrl }} style={styles.avatar} />
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.handle}>{msg.handle}</Text>
                  <Text style={styles.timestamp}>{formatTime(msg.timestamp)}</Text>
                </View>
                <Text style={styles.messageText}>{msg.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {showScrollButton && (
          <TouchableOpacity style={styles.scrollButton} onPress={scrollToBottom}>
            <ChevronDown color="#2D63FF" size={20} />
            <Text style={styles.scrollButtonText}>Scroll to Bottom</Text>
          </TouchableOpacity>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Type your message..."
            placeholderTextColor="#999999"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Send color={message.trim() ? "#FFFFFF" : "#999999"} size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666666',
  },
  keyboardAvoid: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 100,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  handle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#2D63FF',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1A1A1A',
    lineHeight: 22,
  },
  scrollButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    gap: 4,
  },
  scrollButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#2D63FF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
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
  },
  sendButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
});