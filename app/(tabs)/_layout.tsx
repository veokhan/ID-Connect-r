/*import { Tabs } from 'expo-router';
import { Search, MessageCircle, Users, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          paddingTop: 8,
          paddingBottom: 20,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
          marginTop: 4,
        },
        tabBarActiveTintColor: '#2D63FF',
        tabBarInactiveTintColor: '#999999',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="global-chat"
        options={{
          title: 'Chats',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="global-chat-room"
        options={{
          title: 'Global Chat',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}*/

import { Tabs } from 'expo-router';
import { Search, MessageCircle, Globe, Users, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F7F7FA',
          borderTopWidth: 0,
          height: 75,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
          marginTop: 2,
        },
        tabBarActiveTintColor: '#2D63FF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <Search color={color} size={26} />
          ),
        }}
      />

      <Tabs.Screen
        name="global-chat"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => (
            <MessageCircle color={color} size={26} />
          ),
        }}
      />

      <Tabs.Screen
        name="global-chat-room"
        options={{
          title: 'Global Chat',
          tabBarIcon: ({ color }) => (
            <Globe color={color} size={26} />
          ),
        }}
      />

      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => (
            <Users color={color} size={26} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => (
            <User color={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}

