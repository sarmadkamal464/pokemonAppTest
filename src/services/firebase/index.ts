import messaging from '@react-native-firebase/messaging';
import { handleNotificationNavigation } from '../../firebase/notificationHandler';
import { Alert } from 'react-native';
/**
 * Requests user permission for notifications and fetches FCM token if granted.
 */
export const requestUserPermission = async (): Promise<void> => {
  try {
    const authStatus = await messaging().requestPermission();
    const isAuthorized =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (isAuthorized) {
      console.log('Notification permission granted.');
      await fetchFCMToken();
    }
  } catch (error) {
    console.error('Failed to request permission:', error);
  }
};

/**
 * Fetches and logs the Firebase Cloud Messaging (FCM) token for push notifications.
 */
export const fetchFCMToken = async (): Promise<void> => {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log('FCM Token:', token);
    }
  } catch (error) {
    console.error('Error retrieving FCM token:', error);
  }
};

/**
 * Sets up the notification handler for foreground notifications, displaying
 * an alert and providing navigation to a specified screen if applicable.
 */
export const handleForegroundNotification = (): void => {
  messaging().onMessage(async remoteMessage => {
    const { data: notificationData, notification } = remoteMessage;
    if (!notificationData) return;

    Alert.alert(
      notification?.title || 'Notification',
      notification?.body || 'You have a new message',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Navigate',
          onPress: () => handleNotificationNavigation(notificationData),
        },
      ],
    );
  });
};

/**
 * Sets up the background message handler to handle notifications when the app
 * is in the background, using handleNotificationNavigation to manage navigation.
 */
export const handleBackgroundNotification = (): void => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    const notificationData = remoteMessage?.data;
    if (notificationData) {
      handleNotificationNavigation(notificationData);
    }
  });
};
