import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import colors from '@/constants/colors';
import { Home, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.light.primary,
        tabBarInactiveTintColor: colors.light.tabIconDefault,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: colors.light.border,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'ArticleSpark',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}