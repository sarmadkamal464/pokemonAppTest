import messaging from '@react-native-firebase/messaging';
import { NavigationContainerRef } from '@react-navigation/native';

let navigator: NavigationContainerRef<any> | null = null;

/**
 * Sets the global navigator reference for use in handling notifications that require navigation.
 *
 * @param navRef - A reference to the NavigationContainer, set during app initialization.
 */
export const setNavigator = (navRef: NavigationContainerRef<any>) => {
  navigator = navRef;
};

/**
 * Retrieves the global navigator reference, ensuring it has been set.
 *
 * @throws Will throw an error if the navigator is not set. This is typically called when navigation
 * is required from a notification and should be confirmed to have been set by calling `setNavigator`.
 *
 * @returns The global NavigationContainerRef instance.
 */
export const getNavigator = (): NavigationContainerRef<any> => {
  if (!navigator) {
    throw new Error(
      'Navigator is not set. Did you forget to call setNavigator?',
    );
  }
  return navigator;
};

/**
 * Handles navigation based on notification data. This function parses the notification data
 * to extract the target screen and any associated parameters. In this case, it is used
 * specifically to navigate to a "Details" screen with Pokémon data.
 *
 * @param notificationData - The data object received from a notification, containing
 * the target screen and any additional parameters (like Pokémon details).
 */
export const handleNotificationNavigation = (notificationData: any) => {
  try {
    const screen = notificationData.screen;
    const pokemonData = JSON.parse(notificationData.pokemon || '{}');

    if (screen === 'Details' && pokemonData) {
      getNavigator().navigate(screen, { pokemon: pokemonData });
    }
  } catch (error) {
    console.error('Error handling notification navigation:', error);
  }
};

/**
 * Sets up a listener to handle notifications when the app is opened from the background
 * due to a notification. It extracts notification data and invokes handleNotificationNavigation
 * for appropriate navigation handling.
 */
messaging().onNotificationOpenedApp(remoteMessage => {
  if (remoteMessage?.data) {
    handleNotificationNavigation(remoteMessage.data);
  }
});

/**
 * Initializes a handler for notifications that launch the app from a closed state.
 * If data is present in the notification, it will attempt to navigate to the screen specified
 * in the notification data.
 */
messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage?.data) {
      handleNotificationNavigation(remoteMessage.data);
    }
  });
