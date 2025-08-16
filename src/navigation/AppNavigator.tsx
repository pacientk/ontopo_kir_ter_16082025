import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AboutScreen, NewsScreen } from '../screens';
import {
  Edges,
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { COLORS } from '../utils';
import { Platform, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const safeAreaEdges: Edges =
  Platform.OS === 'ios' ? ['top', 'right', 'left'] : ['top', 'right', 'left', 'bottom'];

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <SafeAreaView edges={['right', 'left']} style={styles.safeTop} />
        <SafeAreaView edges={safeAreaEdges} style={styles.safeBottom}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap;

                if (route.name === 'News') {
                  iconName = focused ? 'newspaper' : 'newspaper-outline';
                } else if (route.name === 'About') {
                  iconName = focused ? 'information-circle' : 'information-circle-outline';
                } else {
                  iconName = 'help-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: COLORS.LINK,
              tabBarInactiveTintColor: COLORS.SECONDARY,
              tabBarStyle: {
                backgroundColor: COLORS.BACKGROUND,
                height: Platform.select({ ios: 100, android: 80 }),
                paddingTop: 12,
                paddingBottom: 12,
                elevation: 0,
              },
            })}
          >
            <Tab.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
            <Tab.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
          </Tab.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeTop: {
    flex: 0,
    backgroundColor: COLORS.BACKGROUND,
  },
  safeBottom: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
});
