import React, { useEffect } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import {
  setNavigator,
  handleNotificationNavigation,
} from './src/firebase/notificationHandler';
import { enableScreens } from 'react-native-screens';
import {
  handleBackgroundNotification,
  handleForegroundNotification,
  requestUserPermission,
} from './src/services/firebase';
import messaging from '@react-native-firebase/messaging';

enableScreens(); // Optimize screen memory usage
const queryClient = new QueryClient();

/**
 * App component encapsulates navigation and notification handling logic.
 */
const App = () => {
  useEffect(() => {
    requestUserPermission();
    handleForegroundNotification();
    handleBackgroundNotification();

    // Check if app was opened from a killed state by a notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data) {
          handleNotificationNavigation(remoteMessage.data);
        }
      });

    // Optional: token refresh can be handled here if required in the future
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        ref={(ref: NavigationContainerRef<any> | null) =>
          ref && setNavigator(ref)
        }>
        <MainNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
